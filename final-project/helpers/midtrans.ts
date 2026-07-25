import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  isProduction: false, // true for production
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});