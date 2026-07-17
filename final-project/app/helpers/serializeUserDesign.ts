import type { GetUserDesign } from "@/app/types";

/** Mongo returns `_id` as an ObjectId instance, which can't be passed to Client Components as-is. */
export default function serializeUserDesign(doc: Record<string, unknown>): GetUserDesign {
  return {
    _id: String(doc._id),
    imgUrl: (doc.imgUrl as string) ?? "",
    userId: doc.userId ? String(doc.userId) : "",
    vote: (doc.vote as number) ?? 0,
  };
}
