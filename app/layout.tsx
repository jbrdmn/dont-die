import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don't Die - Save Your Lemming",
  description:
    "A fun browser game where you must save your lemming before midnight UTC or it walks off a cliff!",
  openGraph: {
    title: "Don't Die - Save Your Lemming",
    description: "Can you keep your lemming alive? Save it before midnight UTC every day!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
