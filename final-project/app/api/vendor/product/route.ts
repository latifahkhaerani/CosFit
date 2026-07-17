import ProductModel from "@/app/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";
import { put } from "@vercel/blob";

export async function GET(req: Request) {
  try {
    const vendorId = req.headers.get("x-user-id") as string;
    const result = ProductModel.getProductByVendorId(vendorId);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

//post product
export async function POST(req: Request) {
  try {
    const vendorId = req.headers.get("x-user-id") as string;
    const formData = await req.formData();

    const image = formData.get("image") as File;

    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const size = formData.get("size") as string;
    const theme = formData.get("theme") as string;
    const originalPrice = formData.get("originalPrice") as string;
    const stock = formData.get("stock") as string;

    const blob = await put(image.name, image, {
            access: 'public',
            addRandomSuffix: true
        });

    const imgUrl = blob.url
    const result = await ProductModel.postProduct({imgUrl, title, desc, size, theme, originalPrice, stock}, vendorId);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
