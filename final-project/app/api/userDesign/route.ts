import UserDesignModel from "@/db/models/userDesignModel";
import OurEventModel from "@/db/models/ourEventModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request) {
  try {
    const eventId = new URL(req.url).searchParams.get("eventId");
    const result = eventId
      ? await UserDesignModel.getByEventId(eventId)
      : await UserDesignModel.getAllUserDesigns();
    if (eventId) {
      const userId = req.headers.get("x-user-id");
      const hasSubmitted = userId
        ? Boolean(await UserDesignModel.hasUserEntry(eventId, userId))
        : false;
      return Response.json({ designs: result, hasSubmitted });
    }
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) throw { message: "Please login first", status: 401 };
    if (!body.eventId || !body.entryTitle || !body.imgUrl) {
      throw {
        message: "Event, entry title, and image are required",
        status: 400,
      };
    }

    const event = await OurEventModel.getEventById(body.eventId);
    if (!event || event.eventType !== "internal_contest") {
      throw { message: "This event is not an internal contest", status: 400 };
    }

    const existing = await UserDesignModel.hasUserEntry(body.eventId, userId);
    if (existing) {
      throw { message: "You already submitted an entry", status: 409 };
    }

    if (
      typeof event.maxEntries === "number" &&
      event.maxEntries > 0 &&
      (await UserDesignModel.getByEventId(body.eventId)).length >=
        event.maxEntries
    ) {
      throw {
        message: "The contest entry limit has been reached",
        status: 409,
      };
    }

    const result = await UserDesignModel.createUserDesign(body, userId);
    return Response.json({ message: result }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
