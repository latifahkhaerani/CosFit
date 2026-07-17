import * as z from "zod";
import { hashSync } from "bcryptjs";
import { database } from "@/app/db/config/mongoDb";
import { ObjectId } from "mongodb";
import { GetVendor, PostVendor } from "@/app/types";

const VendorSchema = z.object({
  namaToko: z.string().min(1, { message: "Nama Toko is required" }),
  alamat: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default class VendorModel {
  static collection() {
    return database.collection("vendors");
  }

  static async findByEmail(email: string) {
    const vendor = await this.collection().findOne({ email: email });
    return vendor;
  }

  static async register(vendorData: z.infer<typeof VendorSchema>) {
    const parsedData = VendorSchema.parse(vendorData);
    const existingvendor = await this.collection().findOne({
      email: parsedData.email,
    });

    if (existingvendor) {
      throw { message: "Email already exists", status: 400 };
    }

    parsedData.password = hashSync(parsedData.password, 10);

    const result = await this.collection().insertOne(parsedData);
    return "Vendor created with ID: " + result.insertedId;
  }

  static async getProfile(vendorId: string) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(vendorId),
        },
      },
      {
        $project: {
          "password": false,
        },
      },
    ];
    const profile = await this.collection().aggregate(agg).toArray();
    return profile[0];
  }

  static async putProfile(profileData: GetVendor, vendorId: string) {
    const result = await this.collection().updateOne(
      { vendorId: new ObjectId(vendorId) },
      { $set: profileData },
    );
    return "Profile updated with ID: " + result.upsertedId;
  }
}
