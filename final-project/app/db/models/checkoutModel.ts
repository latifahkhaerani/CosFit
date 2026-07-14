import { Checkout } from "@/app/types";
import { database } from "../config/mongoDb";

export default class CheckoutModel{
    static collection(){
        return database.collection("checkouts")
    }
    
    static async getAllCheckouts(userId: string){
        const checkouts = await this.collection().find({userId}).toArray()
        return checkouts
    }

    static async createCheckout(checkoutData: Checkout, userId: string){
        const result = await this.collection().insertOne({...checkoutData, userId})
        return "Checkout created with ID: " + result.insertedId
    }
}