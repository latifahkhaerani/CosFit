import type { GetUserDesign } from "@/app/types";

/** Mongo returns `_id` and nested BSON objects, which can't be passed to Client Components as-is. */
export default function serializeUserDesign(
  doc: Record<string, unknown>,
): GetUserDesign {
  return {
    _id: String(doc._id ?? ""),
    imgUrl: (doc.imgUrl as string) ?? "",
    userId: doc.userId ? String(doc.userId) : "",
    vote: Number(doc.vote ?? 0),
    entryTitle:
      typeof doc.entryTitle === "string" ? doc.entryTitle : "Untitled entry",
    username: typeof doc.username === "string" ? doc.username : "Unknown user",
  };
}
