"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, ImagePlus, Loader2, UploadCloud } from "lucide-react";

type SubmitStatus = "idle" | "uploading" | "saving" | "success" | "error";

export default function DesignChallengeForm({
  eventId,
  entryCount,
  maxEntries,
}: {
  eventId: string;
  entryCount: number;
  maxEntries?: number;
}) {
  const [entryTitle, setEntryTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  async function checkExistingEntry() {
    try {
      const response = await fetch(`/api/userDesign?eventId=${eventId}`);
      if (!response.ok) return;
      const data = await response.json();
      if (data.hasSubmitted) setAlreadySubmitted(true);
    } catch {
      // The API still enforces the one-entry rule on submit.
    }
  }

  useEffect(() => {
    void checkExistingEntry();
  }, [eventId]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !entryTitle.trim()) return;

    setErrorMessage("");

    try {
      setStatus("uploading");
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/userDesign/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => null);
        throw new Error(data?.message || "Failed to upload your image.");
      }

      const { url } = await uploadRes.json();

      setStatus("saving");
      const res = await fetch("/api/userDesign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imgUrl: url,
          vote: 0,
          eventId,
          entryTitle: entryTitle.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to submit your design.");
      }

      setStatus("success");
      setFile(null);
      setPreviewUrl(null);
      setEntryTitle("");
      setAlreadySubmitted(true);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  const isBusy = status === "uploading" || status === "saving";
  const isFull = Boolean(maxEntries && entryCount >= maxEntries);

  return (
    <section className="card p-8">
      <div className="flex items-center gap-2">
        <ImagePlus size={20} className="text-[var(--primary)]" />
        <h2 className="card-title">Submit Your Design</h2>
      </div>

      <p className="mt-2 text-sm text-[var(--muted)]">
        Upload one design entry for this internal contest. Each user can submit
        only once.
      </p>

      <p className="mt-2 text-sm text-[var(--muted)]">
        Entries: {entryCount}
        {maxEntries ? ` / ${maxEntries}` : ""}
      </p>

      {isFull ? (
        <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
          The maximum number of entries has been reached.
        </p>
      ) : alreadySubmitted ? (
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-green-600">
          <CheckCircle2 size={16} /> You have already submitted an entry.
        </p>
      ) : null}

      {!isFull && !alreadySubmitted ? (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <input
            value={entryTitle}
            onChange={(event) => setEntryTitle(event.target.value)}
            placeholder="Entry title"
            className="input-soft w-full rounded-xl border p-3"
            required
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)] transition hover:border-[var(--primary)]/50">
              <UploadCloud
                size={20}
                className="flex-shrink-0 text-[var(--primary)]"
              />
              <span className="truncate">
                {file ? file.name : "Choose an image to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={!file || !entryTitle.trim() || isBusy}
              className="primary-btn flex flex-shrink-0 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? <Loader2 size={16} className="animate-spin" /> : null}
              {status === "uploading"
                ? "Uploading..."
                : status === "saving"
                  ? "Submitting..."
                  : "Submit Design"}
            </button>
          </div>

          {previewUrl ? (
            <div className="h-40 w-32 overflow-hidden rounded-2xl border border-[var(--border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Design preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </form>
      ) : null}

      {status === "success" ? (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600">
          <CheckCircle2 size={16} />
          Your design has been submitted. Good luck!
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-3 text-sm font-medium text-red-500">{errorMessage}</p>
      ) : null}
    </section>
  );
}
