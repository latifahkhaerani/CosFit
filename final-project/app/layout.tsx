
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ConditionalFooter from "@/components/ConditionalFooter";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalNavbar />
        <main className="grow">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}


