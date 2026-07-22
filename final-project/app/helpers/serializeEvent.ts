import type { GetOurEvent } from "@/app/types";

/** Mongo returns `_id` as an ObjectId instance, which can't be passed to Client Components as-is. */
export default function serializeEvent(
  doc: Record<string, unknown>,
): GetOurEvent {
  return {
    _id: String(doc._id),
    eventName: (doc.eventName as string) ?? "",
    category: (doc.category as string) ?? "",
    imgUrl: (doc.imgUrl as string) ?? "",
    forumId: doc.forumId ? String(doc.forumId) : undefined,
    description: (doc.description as string) ?? "",
    startDate: doc.startDate ? String(doc.startDate) : undefined,
    endDate: doc.endDate ? String(doc.endDate) : undefined,
    locationName: (doc.locationName as string) ?? undefined,
    address: (doc.address as string) ?? undefined,
    externalLink: (doc.externalLink as string) ?? undefined,
    eventType: doc.eventType as string as GetOurEvent["eventType"],
    entries: (doc.entries as any) ?? undefined,
    status: doc.status as string as GetOurEvent["status"],
    createdAt: doc.createdAt ? String(doc.createdAt) : undefined,
    updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
  } as GetOurEvent;
}
