import TryOnModel from "@/app/db/models/tryonModel";
import { PostInputImage } from "@/app/types";

export default async function POST(req: Request)
{
    const img: PostInputImage = await req.json()
    const response = await TryOnModel.UserTryOn(img)
    return Response.json(response)

}