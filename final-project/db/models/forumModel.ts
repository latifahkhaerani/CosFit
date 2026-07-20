import { PostRoom } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { put } from '@vercel/blob';

export default class ForumModel{
    static collection(){
        return database.collection("forums")
    }

    static async getAllForums(){
  const agg = [
  {
    $lookup: {
      from: "users",
      localField: "creatorId",
      foreignField: "_id",
      as: "userTemp"
    }
  },
  {
    $lookup: {
      from: "profiles",
      localField: "creatorId",
      foreignField: "_id",
      as: "profileTemp"
    }
  },
  {
    $addFields: {
      creator: {
        $cond: {
          if: { $gt: [{ $size: "$userTemp" }, 0] },
          then: { $arrayElemAt: ["$userTemp", 0] },
          else: { $arrayElemAt: ["$profileTemp", 0] }
        }
      }
    }
  },
  {
    $project: {
      userTemp: 0,
      profileTemp: 0,
      "creator.password": 0,
      "creator.email": 0
    }
  },
  {
    $sort: {
      createdAt: -1
    }
  }
];
        const forums = await this.collection().aggregate(agg).toArray()
        return forums
    }

    static async createForum(forumData: PostRoom, UserId: string, img: File){

        const blob = await put(img.name, img, {
            access: 'public',
            addRandomSuffix: true
            });

        const image= blob.url

        console.log(image);

        const result = await this.collection().insertOne({...forumData, creatorId: new ObjectId(UserId), image, createdAt: new Date()})
        return "Forum created with ID: " + result.insertedId
    }

    static async getForumById(id: string){
        const forum = await this.collection().findOne({_id: new ObjectId(id)})
        return forum
    }

  static async getForumId(slug: string) {
  const agg = [
    {
      $match: {
        slug: slug
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "creatorId",
        foreignField: "_id",
        as: "creator"
      }
    },
    {
      $project: {
        _id: 1,
        slug: 1,
        nameForum: 1,
        desc: 1,
        tag: 1,
        image: 1,
        createdAt: 1,
        creatorId: 1,
        creator: { 
          $arrayElemAt: ["$creator", 0] 
        }
      }
    },
    {
      $project: {
        "creator.password": 0,
        "creator.email": 0
      }
    }
  ];

  const cursor = this.collection().aggregate(agg);
  const forums = await cursor.toArray();

  return forums[0];
}
}