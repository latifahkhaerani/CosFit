import eventModel from "@/db/models/ourEventModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET() {
  try {
    const result = await eventModel.getClosestEvents();
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
