import eventModel from "@/db/models/ourEventModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        const {id} = await params
        const result = await eventModel.getEventById(id)
        return Response.json(result)
    } catch (error) {
        return errorHandler(error)
    }
}