import { cookies } from "next/headers";
import errorHandler from "./helpers/errorHandler";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
    try {
        console.log("Proxy function called");

        const cookieStore = await cookies();
        const authToken = cookieStore.get("Authorization");

        if (!authToken) throw { message: "please login first", status: 401 };
        const [type, token] = authToken.value.split(" ");
        if (type !== "Bearer" || !token)
            throw { message: "please login first", status: 401 };

        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
        };

        // Clone the request headers and set a new header `x-hello-from-proxy1`
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-email", decoded.email);
        requestHeaders.set("x-user-id", decoded.id);

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
    matcher: [""],
};
