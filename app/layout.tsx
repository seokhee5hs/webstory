import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "서사공방 | 웹소설 기획실",
  description: "작가가 직접 설정하는 10가지 창작 요소와 인물 관계. AI와 함께 웹소설을 기획하는 작업실.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
