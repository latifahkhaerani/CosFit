import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import UserModel from "./userModel";

export default class ChatModel {
    static collection() {
        return database.collection("chats")
    }

    static async getChatRoomId(roomId: string, userId: string | null) {
        const agg = [
  // 1. Filter berdasarkan roomId
  { 
    $match: { roomId: new ObjectId(roomId) } 
  },

  // 2. Lookup ke collection 'users'
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'userData'
    }
  },

  // 3. Lookup ke collection 'vendor'
  {
    $lookup: {
      from: 'vendor',
      localField: 'userId',
      foreignField: '_id',
      as: 'vendorData'
    }
  },

  // 4. Gabungkan hasil 'users' dan 'vendor' ke dalam field 'user'
  // $concatArrays akan menggabungkan array, yang kosong [] akan terabaikan
  {
    $addFields: {
      user: { $concatArrays: ["$userData", "$vendorData"] }
    }
  },

  // 5. Lookup ke collection 'profile' untuk mendapatkan userImg
  {
    $lookup: {
      from: 'profile',
      localField: 'userId',
      foreignField: '_id',
      as: 'userImg'
    }
  },

  // 6. Proyeksi (hilangkan field yang tidak diinginkan)
  { 
    $project: { 
      'userData': 0, // Hapus array temporary
      'vendorData': 0, // Hapus array temporary
      'user.password': 0, 
      'userImg._id': 0, 
      'userImg.userId': 0, 
      'userImg.address': 0 
    } 
  }
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