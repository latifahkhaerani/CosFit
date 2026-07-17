import VendorModel from "@/app/db/models/vendorModel";
import errorHandler from "@/app/helpers/errorHandler";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    if (!body.email || !body.password) {
      throw { message: "Email and password are required", status: 400 };
    }

    const vendor = await VendorModel.findByEmail(body.email);

    if (!vendor) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const isPasswordMatch = compareSync(body.password, vendor.password);

    if (!isPasswordMatch) {
      throw { message: "Invalid email or password", status: 401 };
    }
    const token = sign(
      { id: vendor._id, email: vendor.email },
      process.env.JWT_SECRET as string,
    );

    const cookieStore = await cookies();
    cookieStore.set({
      name: "Authorization",
      value: `Bearer ${token}`,
    });

    return Response.json(
      { message: "Login successful", token },
      { status: 200 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
