import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";

export async function GET(req: Request) {
  try {
    const result = await ProductModel.getPopularChar();
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
