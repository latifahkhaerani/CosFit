import Link from "next/link";
import { notFound } from "next/navigation";
import OurEventModel from "@/db/models/ourEventModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Edit,
  Users,
  Image as ImageIcon,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await OurEventModel.getEventById(id);
  return {
    title: event
      ? `${event.eventName || "Untitled Event"} | Admin Detail`
      : "Event Not Found",
  };
}

export default async function AdminEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rawData = await OurEventModel.getEventById(id);

  if (!rawData) {
    notFound();
  }

  const event = serializeEvent(rawData);

  const title = event.eventName ?? "Untitled Event";
  const coverImage = event.imgUrl ?? "";
  const eventType =
    event.eventType ??
    ((event.category || "").toLowerCase().includes("contest")
      ? "internal_contest"
      : "external_convention");

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      {/* Header & Navigasi */}
      <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/events"
            className="rounded-full bg-[#FCFBFA] p-2 text-muted transition hover:bg-background hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-(--text) line-clamp-1">
              {title}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                  eventType === "internal_contest"
                    ? "border border-[#EAD8F3] bg-[#FCF8FF] text-primary"
                    : "border border-[#D9E8FF] bg-[#F7FAFF] text-primary"
                }`}
              >
                {eventType === "internal_contest"
                  ? "Internal Contest"
                  : "External Convention"}
              </span>

              {eventType === "internal_contest" && event.status && (
                <span className="rounded-full bg-[#FCFBFA] px-2.5 py-1 text-xs font-semibold uppercase text-muted">
                  Status: {event.status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {eventType === "internal_contest" && (
            <Link
              href={`/admin/events/${id}/entries`}
              className="flex items-center gap-2 rounded-xl bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-400 transition hover:bg-indigo-500/20"
            >
              <Users className="h-4 w-4" />
              View Participants
            </Link>
          )}
          <Link
            href={`/admin/events/${id}/edit`}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
          >
            <Edit className="h-4 w-4" />
            Edit Event
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Kolom Kiri: Info Utama & Gambar (Makan 2 Kolom) */}
        <div className="space-y-6 md:col-span-2">
          {/* Cover Image */}
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt={title}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-[#FCFBFA] text-muted">
                <ImageIcon className="mb-2 h-10 w-10 opacity-50" />
                <p>No banner image available</p>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div className="card p-6">
            <h2 className="mb-4 text-lg font-semibold text-(--text)">
              Event Description
            </h2>
            {event.description ? (
              <p className="whitespace-pre-wrap text-muted leading-relaxed">
                {event.description}
              </p>
            ) : (
              <p className="text-muted italic">
                No description has been added yet.
              </p>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Jadwal & Lokasi (Makan 1 Kolom) */}
        <div className="space-y-6">
          {/* Tanggal Pelaksanaan */}
          <div className="card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-(--text)">
              <Calendar className="h-5 w-5 text-primary" />
              Event Schedule
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Starts
                </p>
                <p className="mt-1 text-sm font-medium text-(--text)">
                  {formatDate(event.startDate)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Ends
                </p>
                <p className="mt-1 text-sm font-medium text-(--text)">
                  {formatDate(event.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Info Khusus Event External */}
          {eventType === "external_convention" && (
            <div className="card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-(--text)">
                <MapPin className="h-5 w-5 text-primary" />
                Location & Info
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Venue Name
                  </p>
                  <p className="mt-1 text-sm font-medium text-(--text)">
                    {event.locationName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Address
                  </p>
                  <p className="mt-1 text-sm font-medium text-(--text)">
                    {event.address || "-"}
                  </p>
                </div>

                {event.externalLink && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      External Link
                    </p>
                    <a
                      href={event.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Kunjungi Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Tambahan */}
          <div className="card p-6">
            <h2 className="mb-4 text-lg font-semibold text-(--text)">
              System Log
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted">Created at:</p>
                <p className="text-sm text-(--text)">
                  {formatDate(event.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Last updated:</p>
                <p className="text-sm text-(--text)">
                  {formatDate(event.updatedAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Event ID:</p>
                <p className="text-xs text-muted font-mono">{id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
