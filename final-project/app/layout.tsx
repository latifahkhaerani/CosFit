
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ConditionalFooter from "@/components/ConditionalFooter";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { headers } from "next/headers";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CosFit",
  description: "AI Virtual Fitting for Cosplay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();

  const role = headerList.get("x-user-role");

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <ConditionalNavbar role={role}>
          {children}
        </ConditionalNavbar>
      </body>
    </html>
  );
}


