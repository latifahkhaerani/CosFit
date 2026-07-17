import CheckoutModel from "@/db/models/checkoutModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request)
{
    const userId = req.headers.get("x-user-id") as string;
    try {
        const checkouts = await CheckoutModel.getAllCheckouts(userId);
        return Response.json(checkouts );
    } catch (error) {
        errorHandler(error)
    }
}

export async function POST(req: Request)
{
    const userId = req.headers.get("x-user-id") as string;
    const body = await req.json()
    try {
        const result = await CheckoutModel.createCheckout(body, userId);
        return Response.json({message: result}, {status: 201})
    } catch (error) {
        errorHandler(error)
    }
}