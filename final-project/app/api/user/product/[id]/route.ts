import ProductModel from "@/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";
import { cookies } from "next/headers";
import { PostProduct } from "@/app/types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await ProductModel.getBySlug(id);

    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(
  req: Request,
  {params}: {params: Promise<{id: string}>}){
  try {
    const {id} = await params
    const body: PostProduct = await req.json()
    const result = await ProductModel.putProduct(body, id)
    return Response.json(result)
  } catch (error) {
    return errorHandler(error)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const viewedCookie = cookieStore.get("viewed_products");
    let viewedProducts: Record<string, number> = {};

    if (viewedCookie) {
      viewedProducts = JSON.parse(viewedCookie.value);
    }

    const currentCount = viewedProducts[id] || 0;
    const MAX_VIEWS = 3;

    if (currentCount >= MAX_VIEWS) {
      return Response.json({ message: "View limit reached for this product." });
    }
    await ProductModel.addViews(id);

    viewedProducts[id] = currentCount + 1;
    cookieStore.set("viewed_products", JSON.stringify(viewedProducts), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 12, // 12 jam
    });
  } catch (error) {
    return errorHandler(error);
  }
}
