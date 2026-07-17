import { NextRequest } from "next/server";
import ProductModel from "@/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const search = searchParams.get("search") ?? "";
    const result = await ProductModel.getAllnSearch(search);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
