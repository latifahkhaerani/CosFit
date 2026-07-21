import UserModel from "@/db/models/userModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function PATCH(req: Request)
{
    try {
        const userId = req.headers.get("x-user-id") as string;
        if(!userId){
            throw {message: `Please login first`}
        }
        const result = await UserModel.addToken(userId)
        return Response.json({result}, {status: 201})
    } catch (error) {
        return errorHandler(error)
    }
}

export async function GET(req: Request)
{
    try {
        const userId = req.headers.get("x-user-id") as string;
        if(!userId){
            throw {message: `Please login first`}
        }
        const result = await UserModel.checkToken(userId)
        return Response.json({result}, {status: 200})
    } catch (error) {
        return errorHandler(error)
    }
}