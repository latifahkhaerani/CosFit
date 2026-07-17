import { put } from "@vercel/blob";
import errorHandler from "@/app/helpers/errorHandler";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      throw { message: "No image file provided", status: 400 };
    }

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return Response.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
