import { cookies } from "next/headers";
import errorHandler from "./app/helpers/errorHandler";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import ProductModel from "./db/models/productModel";

export async function proxy(request: Request) {
  try {
    console.log("Proxy function called");

    const pathname = new URL(request.url).pathname;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);

    const cookieStore = await cookies();
    const authToken = cookieStore.get("Authorization");

    let decoded:
      | {
          id: string;
          email: string;
          role: string;
        }
      | undefined;

    // Decode token only if it exists
    if (authToken) {
      const [type, token] = authToken.value.split(" ");

      if (type === "Bearer" && token) {
        decoded = verify(token, process.env.JWT_SECRET as string) as {
          id: string;
          email: string;
          role: string;
        };

        requestHeaders.set("x-user-email", decoded.email);
        requestHeaders.set("x-user-id", decoded.id);
        requestHeaders.set("x-user-role", decoded.role);
      }
    }

    // Protected routes
    const isProtectedRoute =
      pathname === "/profile" ||
      pathname.startsWith("/vendor") ||
      pathname.startsWith("/api/vendor") ||
      pathname === "/api/user/profile" ||
      pathname.startsWith("/api/user/wishlist") ||
      pathname.startsWith("/api/user/checkout") ||
      pathname.startsWith("/api/chat") ||
      pathname === "/api/userDesign" ||
      pathname === "/api/user/try-on" ||
      pathname === "/api/user/history";

    // Public routes (no login required)
    const isPublicRoute =
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/vendor/login" ||
      pathname === "/vendor/register" ||
      pathname === "/api/user/register" ||
      pathname === "/api/user/login" ||
      pathname === "/api/vendor/register" ||
      pathname === "/api/vendor/login" ||
      pathname === "/api/forum" ||
      pathname === "/api/forum/:slug";

    if (isPublicRoute) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Login required
    if (isProtectedRoute && !decoded) {
      throw {
        message: "please login first",
        status: 401,
      };
    }

    // Vendor-only routes
    if (
      decoded &&
      (pathname.startsWith("/vendor") || pathname.startsWith("/api/vendor")) &&
      decoded.role !== "Vendor"
    ) {
      throw {
        message: "Forbidden",
        status: 403,
      };
    }

    // Product ownership check
    if (decoded && pathname.startsWith("/api/vendor/product/")) {
      const segments = pathname.split("/");
      const id = segments[4];

      const product = await ProductModel.getById(id);

      if (!product) {
        throw {
          message: "Product not found",
          status: 404,
        };
      }

      if (product.vendorId.toString() !== decoded.id) {
        throw {
          message: "Forbidden",
          status: 403,
        };
      }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    return errorHandler(err);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
