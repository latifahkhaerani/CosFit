import TryOnModel from "@/db/models/tryonModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function POST(req: Request)
{
    try {
        const userId = req.headers.get("x-user-id") as string;
        if(!userId){
            throw {message: `Please login first`}
        }
        const formData = await req.formData();
        const yourImg = formData.get("User") as File;
        const cosImg = formData.get("Product") as string;
        const name = formData.get("CharName") as string;
        const theme = formData.get("Theme") as string;

        const response = await TryOnModel.UserTryOn(yourImg, cosImg, userId, name, theme)
        return Response.json(response)
    } catch (error) {
        return errorHandler(error)
    }
}