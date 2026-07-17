import * as z from "zod";
import { hashSync } from "bcryptjs";
import { database } from "@/app/db/config/mongoDb";

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
}
