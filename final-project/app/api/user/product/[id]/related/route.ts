import ProductModel from "@/db/models/productModel";
import { ObjectId } from "mongodb";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Cari detail produk utama untuk mendapatkan theme-nya
    const mainProduct = await ProductModel.getById(id);
    if (!mainProduct) {
      return Response.json([], { status: 404 });
    }

    // 2. Cari maksimal 4 produk dengan theme yang sama, kecualikan produk utama
    const relatedProducts = await ProductModel.collection()
      .find({
        theme: mainProduct.theme,
        _id: { $ne: new ObjectId(id) },
      })
      .limit(4)
      .toArray();

    return Response.json(relatedProducts);
  } catch (error) {
    return errorHandler(error) || Response.json([], { status: 500 });
  }
}
