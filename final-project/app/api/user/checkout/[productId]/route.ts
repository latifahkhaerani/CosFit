import errorHandler from "@/app/helpers/errorHandler";
import CheckoutModel from "@/db/models/checkoutModel";

export async function DELETE(req: Request, {params}: {params: Promise<{productId: string}>}){
  try {
    const {productId} = await params
    const userId = req.headers.get("x-user-id") as string;
    const res = await CheckoutModel.deleteCheckoutByProductAndUserId(userId, productId)
    return res
  } catch (error) {
    return errorHandler(error)
  }
}