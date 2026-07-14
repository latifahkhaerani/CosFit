import { database } from "@/db/config/mongodb";

export default class CheckoutModel{
    static collection(){
        return database.collection("users")
    }

    static async readCheckout(userId: string){
        const checkout = await this.collection().find({userId: userId}).toArray()
        return checkout
    }
}