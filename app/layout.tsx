import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "同尘｜分享一点生活，被合适的人轻轻接住",
  description: "同尘是一个由 AI 理解你当下的状态与边界，让生活碎片被合适的人温柔看见的无压力分享空间。",
  openGraph: {
    title: "同尘",
    description: "分享一点生活，被合适的人轻轻接住。",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "同尘" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "同尘",
    description: "分享一点生活，被合适的人轻轻接住。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
