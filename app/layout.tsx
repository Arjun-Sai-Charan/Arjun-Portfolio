import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arjun Sai Charan | AI Systems Engineer",
  description:
    "Portfolio of Arjun Sai Charan, a software engineer focused on AI systems, product engineering, and full-stack product building.",
  metadataBase: new URL("https://arjun-portfolio.vercel.app"),
  openGraph: {
    title: "Arjun Sai Charan | AI Systems Engineer",
    description:
      "AI systems, product thinking, and full-stack engineering portfolio.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
