import { PostOurEvent } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export default class OurEventModel {
  static collection() {
    return database.collection("ourEvents");
  }

  static async getAllEvents() {
    const events = await this.collection().find().toArray();
    return events;
  }

  static async createEvent(eventData: PostOurEvent) {
    const now = new Date().toISOString();
    const payload = { ...eventData, createdAt: now, updatedAt: now };
    const result = await this.collection().insertOne(payload);
    return result.insertedId;
  }

  static async getEventById(id: string) {
    const event = await this.collection().findOne({ _id: new ObjectId(id) });
    return event;
  }

  static async getClosestEvents() {
    const agg = [
      {
        $match: {
          $expr: {
            $gt: ["$startDate", "$$NOW"],
          },
        },
      },
      {
        $sort: {
          startDate: 1,
        },
      },
      {
        $limit: 4,
      },
    ];
    const data = await this.collection().aggregate(agg).toArray();
    return data;
  }

  static async updateEvent(id: string, updateData: Partial<PostOurEvent>) {
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
