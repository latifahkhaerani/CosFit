import ForumModel from "@/db/models/forumModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request){
    try {
        const result = await ForumModel.getAllForums()
        return Response.json(result)
    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(req: Request){
    try {
        const formData = await req.formData();
    const img = formData.get("Image") as File;
    const nameForum = formData.get("nameForum") as string;
    const desc = formData.get("desc") as string;
    const tagRaw = formData.get("tag") as string;
    const tag = tagRaw ? tagRaw.split(", ").map(t => t.trim()) : [];
    const slug = nameForum.replaceAll(" ", "-")
    const chatId = null
const body = {
    slug,
    nameForum,
    desc,
    tag,
    chatId
};
        const userId = req.headers.get("x-user-id") as string;
        if(!userId){
            throw {message: `Please Login First`}
        }
        const result = await ForumModel.createForum(body, userId, img);
        return Response.json({ message: result }, { status: 201 });
    } catch (error) {
       return errorHandler(error);
    }
}