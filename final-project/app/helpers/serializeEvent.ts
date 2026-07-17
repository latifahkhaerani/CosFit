import type { GetOurEvent } from "@/app/types";

/** Mongo returns `_id` as an ObjectId instance, which can't be passed to Client Components as-is. */
export default function serializeEvent(doc: Record<string, unknown>): GetOurEvent {
  return {
    _id: String(doc._id),
    eventName: (doc.eventName as string) ?? "",
    category: (doc.category as string) ?? "",
    imgUrl: (doc.imgUrl as string) ?? "",
    forumId: (doc.forumId as string) ?? "",
    description: (doc.description as string) ?? "",
  };
}
