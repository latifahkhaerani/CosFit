import errorHandler from "@/app/helpers/errorHandler";
import ForumModel from "@/db/models/forumModel";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const {slug} = await params;
        const response = await ForumModel.getForumId(slug)
        return Response.json(response)
    } catch (error) {
        errorHandler(error)
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const {slug} = await params;
        const userId = req.headers.get("x-user-id") as string;
        if(!userId){
            throw {message: `Please Login First`}
        }
        const response = await ForumModel.patchForum(userId ,slug)
        return Response.json(response)
    } catch (error) {
        errorHandler(error)
    }
}
