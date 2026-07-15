import TryOnModel from "@/app/db/models/tryonModel";
import { PostInputImage } from "@/app/types";

export default async function POST(req: Request)
{
    const userId = req.headers.get("x-user-id");
    const img: PostInputImage = await req.json()
    const response = await TryOnModel.UserTryOn(img, userId)
    return Response.json(response)

}