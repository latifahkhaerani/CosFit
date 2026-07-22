import { PostCheckout } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export default class CheckoutModel {
  static collection() {
    return database.collection("checkouts");
  }

  static async getAllCheckouts(userId: string) {
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
              vendorId: { $toObjectId: "$product.vendorId" },
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

  static async createCheckout(checkoutData: PostCheckout, userId: string) {
    const result = await this.collection().insertOne({
      ...checkoutData,
      productId: new ObjectId(checkoutData.productId), //I add this to make lookup become easier -ll
      userId: new ObjectId(userId),
    });
    return "Checkout created with ID: " + result.insertedId;
  }

  static async deleteCheckoutByProductAndUserId(userId: string, productId: string){
    console.log("MASUK DELETE CHECKOUT");
    const res = await this.collection().deleteOne({userId: new ObjectId(userId), productId: new ObjectId(productId)})
    return res
  }
}
