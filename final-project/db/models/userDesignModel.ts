import { PostUserDesign } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export default class UserDesignModel{
    static collection(){
        return database.collection('userDesigns')
    }

    static async getAllUserDesigns(){
        const userDesigns = await this.collection().find().toArray()
        return userDesigns
    }

    static async createUserDesign(userDesignData: PostUserDesign, userId: string){
        const result = await this.collection().insertOne({...userDesignData, userId: new ObjectId(userId)})
        return "User Design created with ID: " + result.insertedId
    }

    static async voteUserDesign(id: string, vote: number){
        const result = await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $inc: { vote: vote } }
        );
        if (result.matchedCount === 0) {
            throw new Error("User Design not found");
        }
        return "User Design with ID: " + id + " has been voted. New vote count: " + vote;
    }
}