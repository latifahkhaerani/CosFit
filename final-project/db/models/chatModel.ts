import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import UserModel from "./userModel";

export default class ChatModel {
    static collection() {
        return database.collection("chats")
    }

    static async getChatRoomId(roomId: string, userId: string | null) {
        console.log(roomId, "<<<< ROOOM IDDDDD");
        const agg = [
            { '$match': { 'roomId': new ObjectId(roomId) } },
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
        if(!userId)
        {
            const userDetail = await UserModel.collection().findOne({ "_id": new ObjectId(userId as string) })
            return { message: chat, username: userDetail?.username, image:userDetail?.userImg , status: 200 }
        }
        return { message: chat, status: 200 }
    }

    static async postChat(roomId: string, userId: string, body: string) {
    const newChat = { roomId: new ObjectId(roomId), userId: new ObjectId(userId), content: body, createdAt: new Date() };
    const insertResult = await this.collection().insertOne(newChat);

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
    return result[0]; 
}
}