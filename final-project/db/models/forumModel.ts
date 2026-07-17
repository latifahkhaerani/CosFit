import { PostRoom } from "@/app/types";
import { database } from "../config/mongoDb";
import { ObjectId } from "mongodb";

export default class ForumModel{
    static collection(){
        return database.collection("forums")
    }

    static async getAllForums(){
        const forums = await this.collection().find().toArray()
        return forums
    }

    static async createForum(forumData: PostRoom){
        const result = await this.collection().insertOne(forumData)
        return "Forum created with ID: " + result.insertedId
    }

    static async getForumById(id: string){
        const forum = await this.collection().findOne({_id: new ObjectId(id)})
        return forum
    }
}