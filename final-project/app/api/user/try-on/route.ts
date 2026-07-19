import TryOnModel from "@/db/models/tryonModel";

export async function POST(req: Request)
{
    const userId = req.headers.get("x-user-id") as string;
    const formData = await req.formData();
    const yourImg = formData.get("User") as File;
    const cosImg = formData.get("Product") as File;
    const response = await TryOnModel.UserTryOn(yourImg, cosImg, userId)
    return Response.json(response)

}