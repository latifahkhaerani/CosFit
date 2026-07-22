"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventType, GetEvent } from "@/app/types";
import { Save, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AdminEventFormData {
  title: string;
  description: string;
  category: string;
  coverImage: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  locationName: string;
  address: string;
  externalLink: string;
  status: "upcoming" | "active" | "ended";
}

interface EventFormProps {
  initialData?: GetEvent | null;
}

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [isLoading, setIsLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(
    initialData?.startDate ? new Date(initialData.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialData?.endDate ? new Date(initialData.endDate) : null,
  );
  const [formData, setFormData] = useState<AdminEventFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    coverImage: initialData?.coverImage || "",
    eventType: initialData?.eventType || "internal_contest",
    startDate: initialData?.startDate
      ? new Date(initialData.startDate).toISOString().slice(0, 16)
      : "",
    endDate: initialData?.endDate
      ? new Date(initialData.endDate).toISOString().slice(0, 16)
      : "",
    // Khusus External Convention
    locationName: initialData?.locationName || "",
    address: initialData?.address || "",
    externalLink: initialData?.externalLink || "",
    // Khusus Internal Contest
    status: initialData?.status || "upcoming",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as AdminEventFormData,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditMode
        ? `/api/admin/events/${initialData._id}`
        : `/api/admin/events`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal menyimpan event");
      }

      alert(`Event berhasil di${isEditMode ? "perbarui" : "buat"}!`);
      router.push("/admin/events");
      router.refresh();
    } catch (error: unknown) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Gagal menyimpan event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/events"
            className="rounded-full bg-slate-800 p-2 text-slate-400 transition hover:text-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl font-semibold text-slate-50">
            {isEditMode ? "Edit Event" : "Create New Event"}
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Kolom Kiri: Info Utama */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Tipe Event
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="internal_contest">
                Internal Contest (Vote Karya)
              </option>
              <option value="external_convention">
                External Convention (Event Luar)
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Judul Event
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-primary focus:outline-none"
              placeholder="Contoh: Cosplay Summer Fest 2024"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Kategori Event
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-primary focus:outline-none"
              placeholder="Ex: Contest, Convention, Workshop"
            />
          </div>

          {/* forumId is created automatically when creating an event; no admin input needed */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-primary focus:outline-none"
              placeholder="Ceritakan detail event ini..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-primary focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Kolom Kanan: Jadwal & Conditional Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Kalender Start Date */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Tanggal Mulai
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    setFormData((prev) => ({
                      ...prev,
                      startDate: date ? date.toISOString().slice(0, 16) : "",
                    }));
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="d MMMM yyyy, HH:mm"
                  placeholderText="Pilih tanggal & jam"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 pl-10 text-sm text-slate-300 focus:border-primary focus:outline-none"
                />
                <CalendarIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                  pointerEvents="none"
                />
              </div>
            </div>

            {/* Kalender End Date */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Tanggal Selesai
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => {
                    setEndDate(date);
                    setFormData((prev) => ({
                      ...prev,
                      endDate: date ? date.toISOString().slice(0, 16) : "",
                    }));
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="d MMMM yyyy, HH:mm"
                  placeholderText="Pilih tanggal (Opsional)"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 pl-10 text-sm text-slate-300 focus:border-primary focus:outline-none"
                />
                <CalendarIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                  pointerEvents="none"
                />
              </div>
            </div>
          </div>

          {/* === FIELD KHUSUS INTERNAL CONTEST === */}
          {formData.eventType === "internal_contest" && (
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <h3 className="mb-4 text-sm font-semibold text-purple-400">
                Pengaturan Kontes Internal
              </h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Status Kontes
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-purple-500 focus:outline-none"
                >
                  <option value="upcoming">Upcoming (Akan Datang)</option>
                  <option value="active">Active (Sedang Berjalan)</option>
                  <option value="ended">Ended (Berakhir)</option>
                </select>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                * Entries/Karya akan diisi secara otomatis ketika user melakukan
                submit dari halaman depan aplikasi.
              </p>
            </div>
          )}

          {/* === FIELD KHUSUS EXTERNAL CONVENTION === */}
          {formData.eventType === "external_convention" && (
            <div className="space-y-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
              <h3 className="text-sm font-semibold text-blue-400">
                Informasi Lokasi Event Luar
              </h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Nama Lokasi / Venue
                </label>
                <input
                  type="text"
                  name="locationName"
                  value={formData.locationName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Ex: Jakarta Convention Center"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Link Tiket / Info (External URL)
                </label>
                <input
                  type="url"
                  name="externalLink"
                  value={formData.externalLink}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300 focus:border-blue-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-800 pt-6">
        <Link
          href="/admin/events"
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:text-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-secondary disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isLoading ? "Menyimpan..." : "Simpan Event"}
        </button>
      </div>
    </form>
  );
}
