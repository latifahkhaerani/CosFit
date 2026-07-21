import ProductModel from "@/db/models/productModel";
import { ObjectId } from "mongodb";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: slug } = await params;

    const mainProduct = await ProductModel.getBySlug(slug);

    const relatedProducts = await ProductModel.collection()
      .find({
        theme: mainProduct.theme,
        _id: { $ne: mainProduct._id },
      })
      .limit(4)
      .toArray();

    return Response.json(relatedProducts);
  } catch (error) {
    return errorHandler(error) || Response.json([], { status: 500 });
  }
}
