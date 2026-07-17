import { PostInputImage, PostProduct } from "@/app/types";
import { database } from "../config/mongoDb";
import { ObjectId } from "mongodb";
import { put } from "@vercel/blob";

export default class ProductModel {
  static collection() {
    return database.collection("products");
  }

  static async getAllnSearch(search: string = "") {
    const agg = [
      {
        $match: {
          $or: [
            {
              theme: {
                $regex: search,
                $options: "i",
              },
            },
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              desc: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
      },
    ];

    return await this.collection().aggregate(agg).toArray();
  }

  static async getById(id: string) {
    const product = await this.collection().findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      throw { message: `Invalid Products` };
    }

    return product;
  }

  static async getProductByVendorId(vendorId: string) {
    const products = await this.collection()
      .find({
        vendorId: new ObjectId(vendorId),
      })
      .toArray();
    return products;
  }

  static async postProduct(productData: PostProduct, vendorId: string) {
    const result = await this.collection().insertOne(productData);
    return "Product created with ID: " + result.insertedId;
  }

  static async putProduct(productData: PostProduct, id: string) {
    const product = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: productData },
    );
    return `Product ${product.upsertedId} updated successfully`;
  }

  static async patchProduct(photo: File, id: string) {
    const blob = await put(photo.name, photo, {
      addRandomSuffix: true,
      access: "public",
    });
    const product = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { imgUrl: blob.url } },
    );
    return `Product image of ${product.upsertedId} updated successfully`;
  }
}
