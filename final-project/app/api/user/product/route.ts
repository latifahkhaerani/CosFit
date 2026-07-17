import { NextRequest } from "next/server";
import ProductModel from "@/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") ?? "";
    const result = await ProductModel.getAllnSearch(search);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

//post product
export async function POST(req: Request) {
  try {
    const vendorId = req.headers.get("x-vendor-id") as string;
    const body = await req.json();
    const result = await ProductModel.postProduct(body, vendorId);
    return Response.json({ message: result }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
