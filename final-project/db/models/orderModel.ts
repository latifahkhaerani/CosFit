import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

export default class OrderModel {
  static collection() {
    return database.collection("orders");
  }

  static async create(order: {orderId: string,
      items: {productId: ObjectId,
              price: string | number,
              quantity: string | number,
              name: string,}[],
      total: string | number,
      paymentStatus: string,}){
    const res = await this.collection().insertOne(order)
    return res
  }

  static async updatePaymentLink(orderId : string, payment: string){
    const res = await this.collection().updateOne({ orderId: orderId }, {$set: {payment: payment}})
    return res
  }

  static async updateStatus(orderId: string, paymentStatus: string){
    const res = await this.collection().updateOne({ orderId: orderId }, {$set: {paymentStatus: paymentStatus}})
    return res
  }

  static async delete(orderId:string){
    const res = await this.collection().deleteOne({orderId: orderId})
    return res
  }

  static async getByOrderId(orderId:string){
    const res = await this.collection().findOne({orderId: orderId})
    return res
  }

  static async getByUserId(userId: string){
    const agg = [
        {
            $match: {
                userId: new ObjectId(userId)
            }
        },
        {
            '$lookup': {
            'from': 'products', 
            'localField': 'items.productId', 
            'foreignField': '_id', 
            'as': 'product'
            }
        }, {
            '$lookup': {
            'from': 'vendors', 
            'localField': 'product.vendorId', 
            'foreignField': '_id', 
            'as': 'vendor'
            }
        }, {
            '$project': {
            'vendor.password': false, 
            'vendor.role': false
            }
        } 
    ];


    const res = await this.collection().aggregate(agg).toArray()
    return res
  }
  
}