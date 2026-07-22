import { PostOurEvent } from "@/app/types";
import OurEventModel from "@/db/models/ourEventModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const event = await OurEventModel.getEventById(id);

    if (!event) {
      return Response.json({ message: "Event not found" }, { status: 404 });
    }

    return Response.json(event, { status: 200 });
  } catch (error: unknown) {
    return (
      errorHandler(error) ||
      Response.json(
        { message: error instanceof Error ? error.message : String(error) },
        { status: 500 },
      )
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updatePayload: Partial<PostOurEvent> = {};

    // Support backward compatibility (eventName vs title, imgUrl vs coverImage)
    if (body.title !== undefined) {
      updatePayload.eventName = body.title;
      updatePayload.slug = OurEventModel.slugify(body.title);
    }
    if (body.eventName !== undefined) {
      updatePayload.eventName = body.eventName;
      updatePayload.slug = OurEventModel.slugify(body.eventName);
    }
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.coverImage !== undefined) updatePayload.imgUrl = body.coverImage;
    if (body.imgUrl !== undefined) updatePayload.imgUrl = body.imgUrl;
    if (body.forumId !== undefined) updatePayload.forumId = body.forumId;

    // Field spesifik External Convention
    if (body.locationName !== undefined)
      updatePayload.locationName = body.locationName;
    if (body.address !== undefined) updatePayload.address = body.address;
    if (body.externalLink !== undefined)
      updatePayload.externalLink = body.externalLink;

    // Sinkronisasi tipe Event (Internal Contest vs External Convention)
    if (body.eventType !== undefined) {
      updatePayload.eventType = body.eventType;
      // Otomatis sinkronkan field category (lama) agar aplikasi tidak error
      updatePayload.category =
        body.eventType === "internal_contest" ? "Contest" : "Convention";
    } else if (body.category !== undefined) {
      updatePayload.category = body.category;
    }

    // Tanggal
    if (body.startDate !== undefined) updatePayload.startDate = body.startDate;
    if (body.endDate !== undefined) updatePayload.endDate = body.endDate;

    // Field spesifik Internal Contest
    if (body.entries !== undefined) updatePayload.entries = body.entries;
    if (body.maxEntries !== undefined) {
      updatePayload.maxEntries =
        body.maxEntries === "" ? undefined : Number(body.maxEntries);
    }
    if (body.status !== undefined) updatePayload.status = body.status;

    // Catat waktu pembaruan
    updatePayload.updatedAt = new Date().toISOString();

    const ok = await OurEventModel.updateEvent(id, updatePayload);

    if (!ok) {
      return Response.json(
        { message: "Event not found or failed to update" },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Event updated successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    return (
      errorHandler(error) ||
      Response.json(
        { message: error instanceof Error ? error.message : String(error) },
        { status: 500 },
      )
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return PUT(req, { params });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ok = await OurEventModel.deleteEvent(id);

    if (!ok) {
      return Response.json(
        { message: "Event not found or already deleted" },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Event deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    return (
      errorHandler(error) ||
      Response.json(
        { message: error instanceof Error ? error.message : String(error) },
        { status: 500 },
      )
    );
  }
}
