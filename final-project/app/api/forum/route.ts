import ForumModel from "@/db/models/forumModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(){
    try {
        const result = await ForumModel.getAllForums()
        return Response.json(result)
    } catch (error) {
        errorHandler(error)
    }
}

export async function POST(req: Request){
    const body = await req.json();
    try {
        const result = await ForumModel.createForum(body);
        return Response.json({ message: result }, { status: 201 });
    } catch (error) {
        errorHandler(error);
    }
}