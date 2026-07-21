import ProfileModel from "@/db/models/profileModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  try {
    const profile = await ProfileModel.getProfile(userId);
    return Response.json(profile);
  } catch (error) {
    errorHandler(error);
  }
}

export async function PUT(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const body = await req.json();
  try {
    const result = await ProfileModel.putProfile(body, userId);
    return Response.json(result);
  } catch (error) {
    errorHandler(error);
  }
}

export async function PATCH(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const body = await req.json();
  try {
    const result = await ProfileModel.patchProfile(body, userId);
    return Response.json(result);
  } catch (error) {
    errorHandler(error);
  }
}
