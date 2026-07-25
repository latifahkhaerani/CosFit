import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";

export async function GET(req: Request) {
  try {
    const result = await ProductModel.getFeaturedChar();
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
