import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";
import { put } from "@vercel/blob";

export async function PATCH(
    req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
    try {
        const {id} = await params
        const formData = await req.formData()
        const image = formData.get("image") as File
        const blob = await put(image.name, image, {
            access: 'public',
            addRandomSuffix: true
        });
        const res = await ProductModel.addGaleryPhoto(blob.url, id)
        return Response.json(res);
    } catch (error) {
        return errorHandler(error);
    }
}