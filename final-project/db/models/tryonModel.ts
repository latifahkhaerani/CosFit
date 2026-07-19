
import { put } from '@vercel/blob';
import { database } from "../config/mongodb";
import { ObjectId } from 'mongodb';


export default class TryOnModel {
  static collection() {
    return database.collection("cosplay");
  }

static async UserTryOn(yourImg: File, cosImg: File, userId: string) {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const blob1 = await put(yourImg.name, yourImg, {
    access: 'public',
    addRandomSuffix: true
  });

  const blob2 = await put(cosImg.name, cosImg, {
    access: 'public',
    addRandomSuffix: true
  });

  const response = await fetch('https://api.fashn.ai/v1/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_FASHN as string}`
    },
    body: JSON.stringify({
      model_name: "tryon-max",
      inputs: {
        product_image: blob2.url,
        model_image: blob1.url
      }
    })
  });

  const result = await response.json();
  console.log(result, "<<<<<<< result run");

  if (!result.id) {
    throw new Error("Gagal mendapatkan Task ID dari Fashn.ai");
  }

  let result2;
  let isFinished = false;
  const maxRetries = 30; 
  let attempts = 0;

  while (!isFinished) {
    attempts++;
    if (attempts > maxRetries) {
      throw new Error("Proses try-on memakan waktu terlalu lama (Timeout)");
    }

    console.log(`Mengecek status... Percobaan ke-${attempts}`);

    const response2 = await fetch(`https://api.fashn.ai/v1/status/${result.id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_FASHN as string}`
      }
    });

    result2 = await response2.json();
    console.log(result2, "<<<<<<< result status");

    if (result2.status === 'completed') {
      isFinished = true;
    } else if (result2.status === 'failed') {
      throw new Error("Proses generasi gambar gagal di sisi server Fashn.ai");
    } else {
      await delay(2750); 
    }
  }

  const AIimg = result2.output[0];

  const payload = {
    UserId: userId,
    AiImgUrl: AIimg
  };

  await this.collection().insertOne(payload);
  
  return AIimg; 
}

static async getHistory (userId: string){
  return await this.collection().find({"_id": new ObjectId(userId)})
  }
}