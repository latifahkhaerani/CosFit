import OurEventModel from "@/db/models/ourEventModel";
import ForumModel from "@/db/models/forumModel";
import { ObjectId } from "mongodb";
import errorHandler from "@/app/helpers/errorHandler";
import type { PostOurEvent } from "@/app/types";

export async function GET() {
  try {
    const events = await OurEventModel.getAllEvents();
    return Response.json(events);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventName = body.title ?? body.eventName ?? "";
    const creatorId = req.headers.get("x-user-id") ?? undefined;
    const payload: PostOurEvent = {
      eventName,
      slug: OurEventModel.slugify(eventName),
      category: body.category ?? body.eventType ?? "General",
      imgUrl: body.coverImage ?? body.imgUrl ?? "",
      creatorId,
      forumId: body.forumId ?? null,
      description: body.description ?? "",
      startDate: body.startDate,
      endDate: body.endDate,
      locationName: body.locationName,
      address: body.address,
      externalLink: body.externalLink,
      eventType: body.eventType,
      entries: body.entries,
      maxEntries:
        body.maxEntries === undefined || body.maxEntries === ""
          ? undefined
          : Number(body.maxEntries),
      status: body.status,
    };
    // Auto-create a forum and link if no forumId provided
    if (!payload.forumId) {
      try {
        const userId = creatorId ?? null;
        const slug = (payload.eventName || "")
          .replaceAll(" ", "-")
          .toLowerCase();
        const forumDoc: Record<string, unknown> = {
          slug,
          nameForum: payload.eventName || "Event Forum",
          desc: payload.description || "",
          tag: payload.category ? [payload.category] : [],
          chatId: null,
          image: payload.imgUrl || undefined,
          createdAt: new Date(),
        };
        if (userId) {
          forumDoc.creatorId = ObjectId.isValid(userId)
            ? new ObjectId(userId)
            : userId;
        }
        const inserted = await ForumModel.collection().insertOne(forumDoc);
        payload.forumId = String(inserted.insertedId);
      } catch (forumErr) {
        // log and continue without forumId
        console.error("failed to create forum for event", forumErr);
      }
    }
    const insertedId = await OurEventModel.createEvent(payload);
    return Response.json(
      { eventId: String(insertedId), forumId: payload.forumId || null },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
