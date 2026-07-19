import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import UserModel from "./userModel";

export default class ChatModel {
    static collection() {
        return database.collection("chats")
    }

    static async getChatRoomId(roomId: string, userId: string) {
        const agg = [
            { '$match': { 'roomId': roomId } },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'user'
                }
            },
            { '$project': { 'user.password': false } }
        ];
        const chat = await this.collection().aggregate(agg).toArray()
        const userDetail = await UserModel.collection().findOne({ "_id": new ObjectId(userId) })
        return { message: chat, username: userDetail?.username, status: 200 }
    }

    static async postChat(roomId: string, userId: string, body: string) {
    const newChat = { roomId, userId: new ObjectId(userId), content: body, createdAt: new Date() };
    const insertResult = await this.collection().insertOne(newChat);

    // Pastikan hasil kembalian memiliki struktur: { _id, content, user: [...] }
    const agg = [
        { '$match': { '_id': insertResult.insertedId } },
        {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'user'
            }
        },
        { '$project': { 'user.password': false } }
    ];

    const result = await this.collection().aggregate(agg).toArray();
    return result[0]; // Ini akan berisi objek lengkap dengan user
}
}