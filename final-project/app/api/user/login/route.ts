import UserModel from "@/db/models/userModel";
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

    const user = await UserModel.findByEmail(body.email);

    if (!user) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const isPasswordMatch = compareSync(body.password, user.password);

    if (!isPasswordMatch) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const normalizedRole =
      typeof user.role === "string" && user.role.toLowerCase() === "admin"
        ? "Admin"
        : "User";

    const token = sign(
      { id: user._id, email: user.email, role: normalizedRole },
      process.env.JWT_SECRET as string,
    );

    const cookieStore = await cookies();
    cookieStore.set({
      name: "Authorization",
      value: `Bearer ${token}`,
    });
    cookieStore.set({
      name: "x-user-role",
      value: normalizedRole,
      httpOnly: false,
      path: "/",
    });

    return Response.json(
      { message: "Login successful", token, role: normalizedRole },
      { status: 200 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
