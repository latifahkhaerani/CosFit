import { PostProduct } from "@/app/types";
import { database } from "../config/mongodb";
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
    const data = await this.collection().aggregate(agg).toArray();
    return data;
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

  static async getProductByVendorId(
    vendorId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const filter = {
      vendorId: new ObjectId(vendorId),
    };

    const agg = {
      $lookup: {
        from: "wishlists",
        localField: "_id",
        foreignField: "productId",
        as: "wishlists",
      },
    };

    const match = {
      $match: filter,
    };

    const products = await this.collection()
      .aggregate([agg, match])
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await this.collection().countDocuments(filter);

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async postProduct(productData: PostProduct, vendorId: string) {
    const result = await this.collection().insertOne({
      ...productData,
      vendorId: new ObjectId(vendorId),
    });
    console.log(result);
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

  static async addViews(id: string) {
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $inc: {
          views: 1,
        },
      },
    );
  }

  static async getPopularChar() {
    const agg = [
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 4,
      },
    ];
    const data = await this.collection().aggregate(agg).toArray();
    return data;
  }

  static async getFeaturedChar() {
    const agg = [
      {
        $sort: {
          discount: -1,
        },
      },
      {
        $limit: 4,
      },
    ];

    const data = await this.collection().aggregate(agg).toArray();
    return data;
  }
}
