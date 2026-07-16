import { UserProfile } from "@/app/types"
import { database } from "../config/mongoDb"
import { ObjectId } from "mongodb"

export default class ProfileModel{
    static collection(){
        return database.collection("profiles")
    }

    static async getProfile(userId: string){
        const profile = await this.collection().findOne({userId: new ObjectId(userId)})
        return profile
    }

    static async createProfile(profileData: UserProfile, userId: string){
        const result = await this.collection().insertOne({...profileData, userId: new ObjectId(userId)})
        return "Profile created with ID: " + result.insertedId
    }

    static async putProfile(profileData: UserProfile, userId: string){
        const result = await this.collection().updateOne({userId: new ObjectId(userId)}, {$set: profileData})
        return "Profile updated with ID: " + result.upsertedId
    }

    static async patchProfile(photo: File, userId: string){

        const blob = await put(photo.name, photo, {
        addRandomSuffix: true,
        access: 'product'
        });


        const result = await this.collection().updateOne({userId: new ObjectId(userId)}, {$set: {photo: blob.url}})
        return "Profile image updated with ID: " + result.upsertedId
    }
}