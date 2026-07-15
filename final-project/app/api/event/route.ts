import eventModel from "@/app/db/models/ourEventModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(){
    try {
        const result = await eventModel.getAllEvents()
        return Response.json(result)
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: Request){
    const body = await req.json();
    try {
        const result = await eventModel.createEvent(body);
        return Response.json({ message: result }, { status: 201 });
    } catch (error) {
        errorHandler(error)
    }
}
