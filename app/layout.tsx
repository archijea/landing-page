import type { Metadata } from "next";
import "./globals.css";

const naverSiteVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://archijea.com"),
  title: {
    default: "아키재 | 건축 인증 컨설팅",
    template: "%s | 아키재"
  },
  description:
    "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 수행 경험을 기반으로 한 건축 인증 컨설팅.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "아키재 | 건축 인증 컨설팅",
    description:
      "BF 인증, 녹색건축 인증, 에너지효율등급, 제로에너지건축물 인증 컨설팅.",
    url: "/",
    siteName: "아키재",
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
  },
  ...(naverSiteVerification
    ? {
        verification: {
          other: {
            "naver-site-verification": naverSiteVerification
          }
        }
      }
    : {})
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
