import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";
import { put } from "@vercel/blob";

export async function GET(req: Request) {
  try {
    const vendorId = req.headers.get("x-user-id") as string;

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 4;

    const result = await ProductModel.getProductByVendorId(vendorId, page, limit);
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
    const theme = formData.getAll("theme") as string[];
    const originalPrice = formData.get("originalPrice") as string;
    const stock = formData.get("stock") as string;
    const finalPrice = formData.get("finalPrice") as string;
    const galery = formData.getAll("imgGalery") as File[]

    const blob = await put(image.name, image, {
            access: 'public',
            addRandomSuffix: true
        });

      
    const imgGalery = await Promise.all(
    galery.map(async (img) => {
      const blob = await put(img.name, img, {
        access: "public",
        addRandomSuffix: true,
      });

      return blob.url;
    })
);
    const imgUrl = blob.url
    const result = await ProductModel.postProduct({imgUrl, title, desc, size, theme, originalPrice, stock, finalPrice, imgGalery}, vendorId);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
