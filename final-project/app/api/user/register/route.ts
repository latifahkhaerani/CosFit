import ProfileModel from "@/app/db/models/profileModel";
import UserModel from "@/app/db/models/userModel";
import errorHandler from "@/app/helpers/errorHandler";
import { UserProfile } from "@/app/types";

export async function POST(req: Request)
{
    try {
        const body = await req.json()
        const result = await UserModel.register(body)

        const newProfile: UserProfile = {
            address: body.address || "",
            photo: body.photo || ""
        }

        const profile = await ProfileModel.createProfile(newProfile, result.insertedId.toString())

        return Response.json({result, profile}, {status: 201})
    } catch (error) {
        return errorHandler(error)
    }
}