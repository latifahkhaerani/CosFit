import { PostRoom } from "@/app/types";
import { database } from "../config/mongodb";
import { ObjectId, Document } from "mongodb"; 
import { put } from '@vercel/blob';

export default class ForumModel {
  static collection() {
    return database.collection("forums");
  }

  static async getAllForums(sortQuery: string | null, pageQuery: string | null) {
    const limit = 5;
    const page = parseInt(pageQuery || "1", 10) || 1;
    const skip = (page - 1) * limit;

    let sortStage: Record<string, 1 | -1> = { createdAt: -1 };
    let matchStage: Record<string, any> | null = null;

    switch (sortQuery) {
      case "trending":
        sortStage = { chatCount: -1, createdAt: -1 };
        break;
      case "most_like":
        sortStage = { likeCount: -1, createdAt: -1 };
        break;
      case "unanswered":
        matchStage = { chatCount: 0 };
        sortStage = { createdAt: -1 };
        break;
      case "newest":
      default:
        sortStage = { createdAt: -1 };
        break;
    }

    const agg: Document[] = [
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "userTemp",
        },
      },
      {
        $lookup: {
          from: "chats",
          localField: "_id",
          foreignField: "roomId",
          as: "chat",
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "creatorId",
          foreignField: "_id",
          as: "profileTemp",
        },
      },
      {
        $addFields: {
          creator: {
            $cond: {
              if: { $gt: [{ $size: "$userTemp" }, 0] },
              then: { $arrayElemAt: ["$userTemp", 0] },
              else: { $arrayElemAt: ["$profileTemp", 0] },
            },
          },
          likeCount: {
            $ifNull: ["$like", 0],
          },
          chatCount: {
            $size: {
              $ifNull: ["$chat", []],
            },
          },
        },
      },
      {
        $project: {
          userTemp: 0,
          profileTemp: 0,
          "creator.password": 0,
          "creator.email": 0,
        },
      }
    ];

    if (matchStage) {
      agg.push({ $match: matchStage });
    }
    agg.push({ $sort: sortStage });
    agg.push({ $skip: skip });
    agg.push({ $limit: limit });

    const forums = await this.collection().aggregate(agg).toArray();
    return forums;
  }

  static async createForum(forumData: PostRoom, UserId: string, img: File) {
    const blob = await put(img.name, img, {
      access: 'public',
      addRandomSuffix: true
    });

    const image = blob.url;

    const result = await this.collection().insertOne({
      ...forumData,
      creatorId: new ObjectId(UserId),
      image,
      createdAt: new Date(),
      likes: []
    });

    return "Forum created with ID: " + result.insertedId;
  }

  static async getForumById(id: string) {
    const forum = await this.collection().findOne({ _id: new ObjectId(id) });
    return forum;
  }

  static async getForumId(slug: string) {
    const agg: Document[] = [
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

  static async patchForum(userId: string, slug: string) {
  const forum = await this.collection().findOne({ slug });

  if (!forum) {
    throw {
      message: "Forum not found",
      status: 404,
    };
  }

  const userObjectId = new ObjectId(userId);

  const isLiked = forum.like?.some((id: string) => id.toString() === userId);

  if (isLiked) {
    await this.collection().updateOne(
      { slug },
      {
        $pull: {
          likes: userObjectId,
        },
      } as any
    );

    return {
      message: "Unlike success",
    };
  }

  await this.collection().updateOne(
    { slug },
    {
      $addToSet: {
        likes: userObjectId,
      },
    }
  );

  return {
    message: "Like success",
  };
}
}