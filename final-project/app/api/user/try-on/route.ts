import TryOnModel from "@/app/db/models/tryonModel";
import { InputImage } from "@/app/types";

export default async function POST(req: Request)
{
    const img: InputImage = await req.json()
    const response = await TryOnModel.UserTryOn(img)
    return Response.json(response)

}