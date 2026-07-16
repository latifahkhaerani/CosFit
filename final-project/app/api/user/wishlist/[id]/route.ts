import WishlistModel from "@/app/db/models/wishlistModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const wishlist = await WishlistModel.getWishlistById(id);
    return Response.json(wishlist);
  } catch (error) {
    errorHandler(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await WishlistModel.deleteWishlist(id);
    return Response.json({ message: result }, { status: 200 });
  } catch (error) {
    errorHandler(error);
  }
}
