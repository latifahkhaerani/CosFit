import { NextResponse } from "next/server";

import ProductModel from "@/db/models/productModel";
import OrderModel from "@/db/models/orderModel";
import { snap } from "@/helpers/midtrans";
import errorHandler from "@/app/helpers/errorHandler";
import { ObjectId } from "mongodb";
import CheckoutModel from "@/db/models/checkoutModel";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const items = [];
    let grossAmount = 0;

    for (const cartItem of body.items) {
      const product = await ProductModel.getById(cartItem.product._id);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < cartItem.quantity) {
        throw new Error(`${product.title} is out of stock`);
      }

      grossAmount += product.finalPrice * cartItem.quantity;

      items.push({
        productId: new ObjectId(product._id),
        price: product.finalPrice,
        quantity: cartItem.quantity,
        name: product.title,
      });
    }


    const orderId = crypto.randomUUID();

    await OrderModel.create({
      orderId,
      items: items,
      total: grossAmount,
      paymentStatus: "Pending",
    });

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },

      item_details: items,

      customer_details: {
        first_name: "Nama Gue",
        email: "emailgue@gmail.com",
      },
    });

    return NextResponse.json({
      token: transaction.token,
      orderId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    
    try {
        const userId = req.headers.get("x-user-id") as string;
        const body = await req.json();
        const res = await OrderModel.updateStatus(body.orderId, body.status)
        if(body.status === "Success")
        {
            const order = await OrderModel.getByOrderId(body.orderId)
            if (order?.items) {
                await Promise.all(
                    order.items.map((item) =>
                        ProductModel.decreaseQuantity(
                            item.productId,
                            item.quantity
                        )
                    )
                );
                
                await Promise.all(
                    order.items.map((item) => {
                        CheckoutModel.deleteCheckoutByProductAndUserId(userId, item.productId)
                    })
                )
            }
        }
        
        

        return NextResponse.json(res)
    } catch (error) {
        return errorHandler(error)
    }

}

export async function DELETE(req: Request) {
    try {
        const body = await req.json()
        const res = await OrderModel.delete(body.order_id)
        return NextResponse.json(res)
    } catch (error) {
        return errorHandler(error)
    }
}