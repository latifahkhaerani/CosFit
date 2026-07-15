import { InputImage } from "@/app/types";
import { database } from "@/db/config/mongodb";
import { put } from '@vercel/blob';


export default class TryOnModel {
  static collection() {
    return database.collection("cosplay");
  }

  static async UserTryOn(img: InputImage) {
    const { yourImg, cosImg } = img;

    const blob1 = await put(yourImg.name, yourImg, {
    access: 'public',
  });
  const blob2 = await put(cosImg.name, cosImg, {
    access: 'public',
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
      product_image: blob2,
      model_image: blob1
    }
  })
});
 
const result = await response.json();

const payload = {
    CosImg: result.output[0],
    // UserId: id
}

await this.collection().insertOne(payload)
return result.output[0]

  }
}