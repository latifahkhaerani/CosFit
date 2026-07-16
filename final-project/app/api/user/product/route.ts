import ProductModel from "@/app/db/models/productModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ search: string }> },
) {
  try {
    const { search } = await params;
    const result = ProductModel.getAllnSearch(search);
    return result;
  } catch (error) {
    return errorHandler(error);
  }
}

//post product
export async function POST(req: Request) {
  try {
    const vendorId = req.headers.get("x-vendor-id") as string;
    const body = await req.json();
    const result = ProductModel.postProduct(body, vendorId);
    return result;
  } catch (error) {
    return errorHandler(error);
  }
}
