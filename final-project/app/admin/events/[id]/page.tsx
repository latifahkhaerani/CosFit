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
      ? `${event.eventName || event.title} | Admin Detail`
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

  // Normalisasi data (mengatasi kompatibilitas skema lama & baru)
  const title = event.eventName ?? event.title ?? "Untitled Event";
  const coverImage = event.imgUrl ?? event.coverImage;
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/events"
            className="rounded-full bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-50 line-clamp-1">
              {title}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                  eventType === "internal_contest"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}
              >
                {eventType === "internal_contest"
                  ? "Kontes Internal"
                  : "Convention Eksternal"}
              </span>

              {eventType === "internal_contest" && event.status && (
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold uppercase text-slate-300">
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
              Lihat Peserta
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
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt={title}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-slate-950 text-slate-500">
                <ImageIcon className="mb-2 h-10 w-10 opacity-50" />
                <p>Tidak ada gambar banner</p>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-50">
              Deskripsi Event
            </h2>
            {event.description ? (
              <p className="whitespace-pre-wrap text-slate-400 leading-relaxed">
                {event.description}
              </p>
            ) : (
              <p className="text-slate-500 italic">
                Belum ada deskripsi yang ditambahkan.
              </p>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Jadwal & Lokasi (Makan 1 Kolom) */}
        <div className="space-y-6">
          {/* Tanggal Pelaksanaan */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-50">
              <Calendar className="h-5 w-5 text-primary" />
              Jadwal Pelaksanaan
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Dimulai
                </p>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  {formatDate(event.startDate)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Berakhir
                </p>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  {formatDate(event.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Info Khusus Event External */}
          {eventType === "external_convention" && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-50">
                <MapPin className="h-5 w-5 text-blue-500" />
                Lokasi & Info
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Nama Lokasi/Venue
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {event.locationName || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Alamat
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {event.address || "-"}
                  </p>
                </div>

                {event.externalLink && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Link Eksternal
                    </p>
                    <a
                      href={event.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:underline"
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
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-50">
              Log Sistem
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">Dibuat pada:</p>
                <p className="text-sm text-slate-400">
                  {formatDate(event.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Terakhir diupdate:</p>
                <p className="text-sm text-slate-400">
                  {formatDate(event.updatedAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ID Event:</p>
                <p className="text-xs text-slate-600 font-mono">{id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
