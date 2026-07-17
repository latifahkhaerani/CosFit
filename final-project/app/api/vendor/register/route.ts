import VendorModel from "@/db/models/vendorModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await VendorModel.register(body);

    return Response.json({ message: result }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
