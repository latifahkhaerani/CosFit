import type { GetRoom } from "@/app/types";

/** Mongo returns `_id` as an ObjectId instance, which can't be passed to Client Components as-is. */
export default function serializeRoom(doc: Record<string, unknown>): GetRoom {
  return {
    _id: String(doc._id),
    nameForum: (doc.nameForum as string) ?? "",
    desc: (doc.desc as string) ?? "",
    img: (doc.img as string) ?? "",
    tag: (doc.tag as [string]) ?? [""],
  };
}
