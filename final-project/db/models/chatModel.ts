import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import UserModel from "./userModel";
import VendorModel from "./vendorModel";

export default class ChatModel {
    static collection() {
        return database.collection("chats")
    }

    static async getChatRoomId(roomId: string, userId: string | null) {
        const agg = [
  {
    '$match': {
      'roomId': new ObjectId(roomId)
    }
  }, {
    '$lookup': {
      'from': 'vendors', 
      'localField': 'userId', 
      'foreignField': '_id', 
      'as': 'vendor'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'userId', 
      'foreignField': '_id', 
      'as': 'user'
    }
  }, {
    '$project': {
      'user.password': false, 
      'user._id': false, 
      'user.email': false, 
      'user.token': false, 
      'user.createdAt': false, 
      'user.updatedAt': false, 
      'user.claimedAt': false, 
      'user.namaToko': false, 
      'user.alamat': false
    }
  }
];

        const chat = await this.collection().aggregate(agg).toArray()


            const userDetail = await UserModel.collection().findOne({ "_id": new ObjectId(userId as string) })
            const vendorDetail = await VendorModel.collection().findOne({ "_id": new ObjectId(userId as string) })
            if (!vendorDetail){
                return { message: chat, username: userDetail?.username, image:userDetail?.userImg , status: 200 }
            }
            else if (!userDetail){
                return { message: chat, username: vendorDetail?.namaToko, image:vendorDetail?.userImg , status: 200 }
            }
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