import { PostEvent } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export default class EventModel {
  static collection() {
    return database.collection("events");
  }

  static async getAllEvents() {
    return await this.collection().find().toArray();
  }

  static async createEvent(eventData: PostEvent) {
    const now = new Date().toISOString();
    const payload = { ...eventData, createdAt: now, updatedAt: now };
    const result = await this.collection().insertOne(payload);
    return result.insertedId;
  }

  static async getEventById(id: string) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async updateEvent(id: string, updateData: Partial<PostEvent>) {
    const now = new Date().toISOString();
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: now } },
    );
    return result.modifiedCount > 0;
  }

  static async deleteEvent(id: string) {
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}
