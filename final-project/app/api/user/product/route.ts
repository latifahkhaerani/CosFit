import ProductModel from "@/app/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const result = await ProductModel.getAllnSearch(search);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
