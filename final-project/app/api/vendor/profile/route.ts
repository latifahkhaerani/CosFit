import VendorModel from "@/app/db/models/vendorModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  try {
    const profile = await VendorModel.getProfile(userId);
    return Response.json(profile);
  } catch (error) {
    errorHandler(error);
  }
}

export async function PUT(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const body = await req.json();
  try {
    const result = await VendorModel.putProfile(body, userId);
    return Response.json(result);
  } catch (error) {
    errorHandler(error);
  }
}
