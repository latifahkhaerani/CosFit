import { PostRoom } from "@/app/types";
import { database } from "../config/mongoDb";
import { ObjectId } from "mongodb";
import { put } from '@vercel/blob';
import UserModel from "./userModel";

export default class ForumModel{
    static collection(){
        return database.collection("forums")
    }

    static async getAllForums(){
    const agg = [
  {
    '$lookup': {
      'from': 'users', 
      'localField': 'creatorId', 
      'foreignField': '_id', 
      'as': 'userTemp'
    }
  }, 

  {
    '$lookup': {
      'from': 'profiles', 
      'localField': 'creatorId', 
      'foreignField': '_id', 
      'as': 'profileTemp'
    }
  }, 

  {
    '$addFields': {
      'creator': {
        '$cond': {
          'if': { '$gt': [{ '$size': '$userTemp' }, 0] },
          'then': { '$arrayElemAt': ['$userTemp', 0] },   
          'else': { '$arrayElemAt': ['$profileTemp', 0] }
        }
      }
    }
  }, 
  {
    '$project': {
      'userTemp': 0,
      'profileTemp': 0,
      'creator.password': 0,
      'creator.email': 0
    }
  }
];
        const forums = await this.collection().aggregate(agg).toArray()
        return forums
    }

    static async createForum(forumData: PostRoom, UserId: string, img: File){

        const blob = await put(img.name, img, {
            access: 'public',
            addRandomSuffix: true
            });

        const image= blob.url

        const result = await this.collection().insertOne({...forumData, creatorId: new ObjectId(UserId), image, createdAt: new Date()})
        return "Forum created with ID: " + result.insertedId
    }
}