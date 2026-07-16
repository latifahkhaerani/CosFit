import ChatModel from "@/app/db/models/chatModel";
import errorHandler from "@/app/helpers/errorHandler";

export async function GET(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
    try {
        const {roomId} = await params;
        const userId = req.headers.get("x-user-id");
        if(!userId){
            throw {message: `invalid`, status: 500}
        }
        const response = await ChatModel.getChatRoomId(roomId, userId)
        
        return response
    } catch (error) {
        errorHandler(error)
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ roomId: string }> }){
    try {
        const {roomId} = await params;
        const body = await req.json()
        const userId = req.headers.get("x-user-id");

        const response = await ChatModel.postChat(roomId, userId, body)

    } catch (error) {
        errorHandler(error)
    }
}