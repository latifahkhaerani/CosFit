import { cookies } from "next/headers";
import errorHandler from "./app/helpers/errorHandler";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
    try {
        console.log("Proxy function called");
        const pathname = new URL(request.url).pathname;
        console.log("pathname:", pathname);
        if (
            pathname === "/api/vendor/login" ||
            pathname === "/api/vendor/register" ||
            pathname === "/vendor/register" ||
            pathname === "/vendor/login"

        ) {
            return NextResponse.next();
        }

        const cookieStore = await cookies();
        const authToken = cookieStore.get("Authorization");
        
        if (!authToken) throw { message: "please login first", status: 401 };
        const [type, token] = authToken.value.split(" ");
        if (type !== "Bearer" || !token)
            throw { message: "please login first", status: 401 };
        
        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
            role: string;
        };

        if (pathname.startsWith("/api/vendor") || pathname.startsWith("/vendor")) {
            if (decoded.role !== "Vendor") {
                throw {
                    message: "Forbidden",
                    status: 403,
                };
            }
        }
        
        // Clone the request headers and set a new header `x-hello-from-proxy1`
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-email", decoded.email);
        requestHeaders.set("x-user-id", decoded.id);
        requestHeaders.set("x-user-role", decoded.role);

        
        // You can also set request headers in NextResponse.next
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });
        
        return response;

    } catch (err) {
        return errorHandler(err);
    }
}

export const config = {
    matcher: ["/profile", "/vendor/:path*", "/api/vendor/:path*", "/api/user/profile", "/vendor", "/api/forum", "/api/user/wishlist", "/api/user/checkout", "/api/chat/:path*", "/api/user/try-on"],
};
