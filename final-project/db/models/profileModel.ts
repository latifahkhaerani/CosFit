import { GetUserProfile, PostUserProfile } from "@/app/types";
import { ObjectId } from "mongodb";
import { put } from "@vercel/blob";
import { database } from "../config/mongodb";

export default class ProfileModel {
  static collection() {
    return database.collection("profiles");
  }

  static async getProfile(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $project: {
          "userId.password": false,
        },
      },
    ];
    const profile = await this.collection().aggregate(agg).toArray();
    return profile[0];
  }

  static async createProfile(profileData: PostUserProfile, userId: string) {
    const result = await this.collection().insertOne({
      ...profileData,
      userId: new ObjectId(userId),
    });
    return "Profile created with ID: " + result.insertedId;
  }

  static async putProfile(profileData: GetUserProfile, userId: string) {
    const result = await this.collection().updateOne(
      { userId: new ObjectId(userId) },
      { $set: profileData },
    );
    return "Profile updated with ID: " + result.upsertedId;
  }

  static async patchProfile(photo: File, userId: string) {
    const blob = await put(photo.name, photo, {
      access: "public",
      addRandomSuffix: true,
    });

    const result = await this.collection().updateOne(
      { userId: new ObjectId(userId) },
      { $set: { photo: blob.url } },
    );
    return "Profile image updated with ID: " + result.upsertedId;
  }
}
