import { ObjectId } from "mongodb";
import { database } from "../config/mongoDb";
import UserModel from "./userModel";

export default class ChatModel{
    static collection(){
        return database.collection("chats")
    }

    static async getChatRoomId(roomId: string, userId: string){
        const chat = await this.collection().find({roomId})
        const userDetail = await UserModel.collection().findOne({"_id": new ObjectId(userId)})
        return {message: chat, username: userDetail?.username, status: 200}
    }

    static async postChat(roomId: string, userId: string|null, body: string){
        return await this.collection().insertOne({roomId, UserId: userId, Content: body})
    }
}