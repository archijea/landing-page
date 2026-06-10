import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "아키재 | 건축 인증 컨설팅",
  description:
    "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 수행 경험을 기반으로 한 건축 인증 컨설팅.",
  openGraph: {
    title: "아키재 | 건축 인증 컨설팅",
    description:
      "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 컨설팅.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "아키재 로고"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "아키재 | 건축 인증 컨설팅",
    description:
      "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 컨설팅.",
    images: ["/images/og-image.png"]
  }
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
