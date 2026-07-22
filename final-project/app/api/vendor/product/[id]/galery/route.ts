import errorHandler from "@/app/helpers/errorHandler";
import ProductModel from "@/db/models/productModel";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

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
        console.log(id, image, blob);
        const res = await ProductModel.addGaleryPhoto(blob.url, id)
        return Response.json(res);
    } catch (error) {
        return errorHandler(error);
    }
}


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(id, "<<<< ID");

    const { url } = await req.json();

    const result = await ProductModel.deleteImage(id, url);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}