import ProductModel from "@/app/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";

// Ubah data product
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;
  try {
    const result = await ProductModel.putProduct(body, id);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

// patch image product
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;
  try {
    const result = await ProductModel.patchProduct(body, id);
    return Response.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
