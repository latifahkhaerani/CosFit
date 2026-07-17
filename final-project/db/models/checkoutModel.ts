import { PostCheckout } from "@/app/types";
import { database } from "../config/mongoDb";
import { ObjectId } from "mongodb";

export default class CheckoutModel{
    static collection(){
        return database.collection("checkouts")
    }
    
    static async getAllCheckouts(userId: string){
        const checkouts = await this.collection().find({userId: new ObjectId(userId)}).toArray()
        return checkouts
    }
    
    static async createCheckout(checkoutData: PostCheckout, userId: string){
        const result = await this.collection().insertOne({...checkoutData, userId: new ObjectId(userId)})
        return "Checkout created with ID: " + result.insertedId
    }
}