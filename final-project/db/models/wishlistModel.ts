import { PostWishlist } from "@/app/types";
import { database } from "@/db/config/mongodb";
import { ObjectId } from "mongodb";

export default class WishlistModel {
  static collection() {
    return database.collection("wishlists");
  }

  static async getWishlistByUserId(userId: string) {
    return await this.collection()
      .aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
      ])
      .toArray();
    // return this.collection().find({ userId }).toArray();
  }

  static getWishlistById(id: string) {
    return this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async addWishlist(wishlistData: PostWishlist, userId: string) {
    const result = await this.collection().insertOne({
      ...wishlistData,
      productId: new ObjectId(wishlistData.productId),
      userId,
    });
    return "Wishlist created with ID: " + result.insertedId;
  }

  static async deleteWishlist(id: string) {
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error("Wishlist not found");
    }
    return "Wishlist deleted with ID: " + id;
  }
}
