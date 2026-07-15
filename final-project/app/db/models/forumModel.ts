import { Room } from "@/app/types";
import { database } from "../config/mongoDb";

export default class ForumModel{
    static collection(){
        return database.collection("forums")
    }

    static async getAllForums(){
        const forums = await this.collection().find().toArray()
        return forums
    }

    static async createForum(forumData: Room){
        const result = await this.collection().insertOne(forumData)
        return "Forum created with ID: " + result.insertedId
    }
}