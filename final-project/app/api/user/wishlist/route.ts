import WishlistModel from "@/app/db/models/wishlistModel";
import errorHandler from "@/app/helpers/errorHandler";

export const GET = async (req: Request) => {
  const userId = req.headers.get("x-user-id") as string;
  try {
    const wishlist = await WishlistModel.getWishlistByUserId(userId);
    return Response.json(wishlist);
  } catch (error) {
    errorHandler(error);
  }
};

export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id") as string;
  const body = await req.json();
  try {
    const data = await WishlistModel.addWishlist(body, userId);
    return Response.json({ message: data }, { status: 201 });
  } catch (error) {
    errorHandler(error);
  }
}
