import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Don't Die",
  description:
    "Adopt a lemming. It walks toward a cliff every day. Save it before midnight UTC or it dies forever.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Don't Die",
  },
  openGraph: {
    title: "Don't Die",
    description:
      "Can you keep your lemming alive? Save it before midnight UTC every day!",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${pixelFont.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-pixel), monospace" }}>
        {children}
      </body>
    </html>
  );
}
