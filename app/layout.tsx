import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "아키재 | 건축 인증 컨설팅",
  description:
    "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 수행 경험을 기반으로 한 건축 인증 컨설팅."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
