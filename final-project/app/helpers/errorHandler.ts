import { ZodError } from "zod";

export default function errorHandler(err: unknown) {
    const error = err as { message?: string; status?: number };
    let message = error.message;
    let status = error.status;

    if (err instanceof ZodError) {
        message = err.issues.map((e) => e.message).join(", ");
        status = 400;
    }

    return Response.json(
        {
            message: message || "Internal Server Error",
        },
        {
            status: status || 500,
        },
    );
}
