"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GetEvent } from "@/app/types";
import { Edit, Trash2, Users, Calendar, MapPin } from "lucide-react";

export default function EventTable({
  events: initialEvents,
}: {
  events: GetEvent[];
}) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus event ini?")) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((ev) => ev._id !== id));
        router.refresh();
      } else {
        alert("Gagal menghapus event");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
    } finally {
      setIsDeleting(null);
    }
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <Calendar className="mb-4 h-12 w-12 opacity-20" />
        <p>Belum ada event yang ditambahkan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-400">
        <thead className="border-b border-slate-800 bg-slate-950/50 text-xs uppercase text-slate-300">
          <tr>
            <th className="px-4 py-4 font-medium">Event Detail</th>
            <th className="px-4 py-4 font-medium">Tipe / Status</th>
            <th className="px-4 py-4 font-medium">Tanggal</th>
            <th className="px-4 py-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {events.map((ev) => (
            <tr
              key={ev._id}
              className="transition-colors hover:bg-slate-800/30"
            >
              {/* Info Produk & Gambar */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-4">
                  {ev.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ev.coverImage}
                      alt={ev.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
                      <Calendar className="h-5 w-5 text-slate-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-50 line-clamp-1">
                      {ev.title}
                    </p>
                    {ev.locationName && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {ev.locationName}
                      </p>
                    )}
                  </div>
                </div>
              </td>

              {/* Tipe Event & Status */}
              <td className="px-4 py-4">
                <div className="flex flex-col gap-2 items-start">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      ev.eventType === "internal_contest"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {ev.eventType === "internal_contest"
                      ? "Kontes Internal"
                      : "Convention Eksternal"}
                  </span>

                  {ev.eventType === "internal_contest" && ev.status && (
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold uppercase text-slate-300">
                      {ev.status}
                    </span>
                  )}
                </div>
              </td>

              {/* Tanggal */}
              <td className="px-4 py-4 whitespace-nowrap">
                <p className="text-slate-300">
                  {new Date(ev.startDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                {ev.endDate && (
                  <p className="text-xs text-slate-500">
                    s/d{" "}
                    {new Date(ev.endDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                )}
              </td>

              {/* Aksi (Actions) */}
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* Tombol View Entries (HANYA MUNCUL JIKA KONTES) */}
                  {ev.eventType === "internal_contest" && (
                    <Link
                      href={`/admin/events/${ev._id}/entries`}
                      className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-400 transition hover:bg-indigo-500/20"
                      title="Lihat Peserta Kontes"
                    >
                      <Users className="h-4 w-4" />
                      Entries
                    </Link>
                  )}

                  {/* Tombol Edit */}
                  <Link
                    href={`/admin/events/${ev._id}/edit`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>

                  {/* Tombol Delete */}
                  <button
                    onClick={() => handleDelete(ev._id)}
                    disabled={isDeleting === ev._id}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
