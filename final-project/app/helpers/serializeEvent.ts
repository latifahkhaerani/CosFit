import type { GetOurEvent } from "@/app/types";

/** Mongo returns `_id` as an ObjectId instance, which can't be passed to Client Components as-is. */
export default function serializeEvent(doc: unknown): GetOurEvent {
  const eventDoc = doc as Partial<GetOurEvent> & Record<string, unknown>;
  const eventName = (eventDoc.eventName as string) ?? "";
  const slug =
    (eventDoc.slug as string) ||
    eventName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  return {
    _id: String(eventDoc._id),
    slug,
    eventName,
    category: (eventDoc.category as string) ?? "",
    imgUrl: (eventDoc.imgUrl as string) ?? "",
    creatorId: eventDoc.creatorId ? String(eventDoc.creatorId) : undefined,
    forumId: eventDoc.forumId ? String(eventDoc.forumId) : undefined,
    description: (eventDoc.description as string) ?? "",
    startDate: eventDoc.startDate ? String(eventDoc.startDate) : undefined,
    endDate: eventDoc.endDate ? String(eventDoc.endDate) : undefined,
    locationName: (eventDoc.locationName as string) ?? undefined,
    address: (eventDoc.address as string) ?? undefined,
    externalLink: (eventDoc.externalLink as string) ?? undefined,
    eventType: eventDoc.eventType as string as GetOurEvent["eventType"],
    entries: (eventDoc.entries as GetOurEvent["entries"]) ?? undefined,
    maxEntries:
      typeof eventDoc.maxEntries === "number" ? eventDoc.maxEntries : undefined,
    status: eventDoc.status as string as GetOurEvent["status"],
    createdAt: eventDoc.createdAt ? String(eventDoc.createdAt) : undefined,
    updatedAt: eventDoc.updatedAt ? String(eventDoc.updatedAt) : undefined,
  } as GetOurEvent;
}
