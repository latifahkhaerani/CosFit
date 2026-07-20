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
            userId: new ObjectId(userId),
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
        {
          $lookup: {
            from: "vendors",
            let: {
              vendorId: {
                $toObjectId: "$product.vendorId",
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$vendorId"],
                  },
                },
              },
            ],
            as: "vendor",
          },
        },
        {
          $unwind: "$vendor",
        },
      ])
      .toArray();
  }

  static getWishlistById(id: string) {
    return this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async addWishlist(wishlistData: PostWishlist, userId: string) {
    const result = await this.collection().insertOne({
      ...wishlistData,
      productId: new ObjectId(wishlistData.productId),
      userId: new ObjectId(userId),
    });
    return "Wishlist created with ID: " + result.insertedId;
  }

  static async deleteWishlist(id: string, userId: string) {
    const cek = await this.collection().findOne({
      productId: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    const result = await this.collection().deleteOne({
      productId: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    if (result.deletedCount === 0) {
      throw new Error("Wishlist not found");
    }
    return "Wishlist deleted with ID: " + id;
  }
}
