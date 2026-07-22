import errorHandler from "@/app/helpers/errorHandler";
import UserModel from "@/db/models/userModel";
import { snap } from "@/helpers/midtrans";
import { NextResponse } from "next/server";

const PACKAGES = {
  20: 29000,
  60: 79000,
  150: 179000,
};

export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id")!;
  const body = await req.json();

  const credits = body.credits;

  const price = PACKAGES[credits as keyof typeof PACKAGES];

  if (!price) {
    return NextResponse.json(
      { message: "Invalid package" },
      { status: 400 }
    );
  }

  const orderId = `TOPUP-${Date.now()}`;

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: price,
    },

    item_details: [
      {
        id: "credit",
        price,
        quantity: 1,
        name: `${credits} Credits`,
      },
    ],

    custom_field1: userId,
    custom_field2: credits.toString(),
  };

  const transaction = await snap.createTransaction(parameter);

  return NextResponse.json({
    token: transaction.token,
  });
}

export async function PATCH(req: Request) {
    try {
        const userId = req.headers.get("x-user-id") as string;
        const body = await req.json();
        const res = await UserModel.topUpToken(userId, body.credit)
        return NextResponse.json(res)
    } catch (error) {
        return errorHandler(error)
    }
    
}