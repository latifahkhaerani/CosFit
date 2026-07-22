import { GetOurEvent } from "@/app/types";
import OurEventModel from "@/db/models/ourEventModel";
import UserDesignModel from "@/db/models/userDesignModel";

type Props = { params: Promise<{ id: string }> };

function toStringValue(value: unknown) {
  if (!value) return "";
  if (typeof value === "object") {
    if (typeof (value as { $oid?: string }).$oid === "string") {
      return (value as { $oid: string }).$oid;
    }
    if (typeof (value as { toString?: () => string }).toString === "function") {
      return String(value);
    }
  }
  return String(value);
}

async function getEvent(id: string): Promise<GetOurEvent | null> {
  const event = await OurEventModel.getEventById(id);
  if (!event) return null;

  const normalizedEvent = event as unknown as Record<string, unknown>;

  return {
    _id: toStringValue(normalizedEvent._id),
    slug: typeof normalizedEvent.slug === "string" ? normalizedEvent.slug : "",
    eventName:
      typeof normalizedEvent.eventName === "string"
        ? normalizedEvent.eventName
        : "",
    category:
      typeof normalizedEvent.category === "string"
        ? normalizedEvent.category
        : "",
    imgUrl:
      typeof normalizedEvent.imgUrl === "string" ? normalizedEvent.imgUrl : "",
    description:
      typeof normalizedEvent.description === "string"
        ? normalizedEvent.description
        : "",
    creatorId: normalizedEvent.creatorId
      ? toStringValue(normalizedEvent.creatorId)
      : undefined,
    forumId: normalizedEvent.forumId
      ? toStringValue(normalizedEvent.forumId)
      : undefined,
    startDate:
      typeof normalizedEvent.startDate === "string"
        ? normalizedEvent.startDate
        : undefined,
    endDate:
      typeof normalizedEvent.endDate === "string"
        ? normalizedEvent.endDate
        : undefined,
    locationName:
      typeof normalizedEvent.locationName === "string"
        ? normalizedEvent.locationName
        : undefined,
    address:
      typeof normalizedEvent.address === "string"
        ? normalizedEvent.address
        : undefined,
    externalLink:
      typeof normalizedEvent.externalLink === "string"
        ? normalizedEvent.externalLink
        : undefined,
    eventType:
      normalizedEvent.eventType === "internal_contest"
        ? "internal_contest"
        : "external_convention",
    entries: Array.isArray(normalizedEvent.entries)
      ? normalizedEvent.entries.map((entry) => {
          const entryRecord = entry as Record<string, unknown>;
          return {
            _id: toStringValue(entryRecord._id),
            userId: toStringValue(entryRecord.userId),
            username:
              typeof entryRecord.username === "string"
                ? entryRecord.username
                : "Unknown user",
            entryTitle:
              typeof entryRecord.entryTitle === "string"
                ? entryRecord.entryTitle
                : "Untitled entry",
            entryImage:
              typeof entryRecord.entryImage === "string"
                ? entryRecord.entryImage
                : "",
            voteCount: Number(entryRecord.voteCount ?? 0),
          };
        })
      : [],
    maxEntries:
      typeof normalizedEvent.maxEntries === "number"
        ? normalizedEvent.maxEntries
        : undefined,
    status:
      typeof normalizedEvent.status === "string"
        ? (normalizedEvent.status as GetOurEvent["status"])
        : undefined,
    createdAt:
      typeof normalizedEvent.createdAt === "string"
        ? normalizedEvent.createdAt
        : undefined,
    updatedAt:
      typeof normalizedEvent.updatedAt === "string"
        ? normalizedEvent.updatedAt
        : undefined,
  };
}

async function getContestEntries(eventId: string) {
  const designs = await UserDesignModel.getByEventId(eventId);

  return designs.map((item: any) => ({
    _id: toStringValue(item._id),
    entryTitle: item.entryTitle ?? item.title ?? "Untitled entry",
    entryImage: item.imgUrl ?? item.entryImage,
    userId: item.username || toStringValue(item.userId) || "Unknown user",
    voteCount: item.vote ?? item.voteCount ?? 0,
  }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Event not found.
      </div>
    );
  const isContest =
    event.eventType === "internal_contest" ||
    (event.category || "").toLowerCase().includes("contest");
  if (!isContest)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        Not a contest event.
      </div>
    );

  const entries = await getContestEntries(id);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Contest entries</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {event.eventName}
            </h1>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {entries.length} submission{entries.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {entries.length === 0 ? (
          <div className="text-slate-600">No entries yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {entries.map((en: any) => (
              <div
                key={en._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                {en.entryImage && (
                  <img
                    src={en.entryImage}
                    alt={en.entryTitle}
                    className="mb-4 h-48 w-full rounded-3xl object-cover"
                  />
                )}
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {en.entryTitle}
                </h3>
                <p className="mb-1 text-sm text-slate-600">By: {en.userId}</p>
                <p className="text-sm font-medium text-slate-700">
                  Votes: {en.voteCount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
