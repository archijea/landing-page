import type { Certification } from "@/data/projects";

export type FeaturedProject = {
  name: string;
  phase: string;
  certifications: Certification[];
  image?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "무안군신청사",
    phase: "예비인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/1.무안군신청사.webp"
  },
  {
    name: "무안군보건소",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/2.무안군보건소.webp"
  },
  {
    name: "무안복합문화센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/3.무안복합문화센터.webp"
  },
  {
    name: "함평어울림센터",
    phase: "예비/본",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/4. 함평어울림센터.webp"
  },
  {
    name: "국립여수해양기상과학관",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/5.국립여수해양기상과학관.webp"
  },
  {
    name: "벌교문화복합센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/6.벌교문화복합센터.webp"
  },
  {
    name: "나주전력기술연구원",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/7.나주전력기술연구원.webp"
  },
  {
    name: "보성군복합커뮤니티센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/8.보성군복합커뮤니티센터.webp"
  },
  {
    name: "광양 골약중학교",
    phase: "본인증",
    certifications: ["BF"],
    image: "/images/featured/9.광양골약중.webp"
  },
  {
    name: "농성2동 공공복합청사",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/10.농성2동공공복합청사.webp"
  },
  {
    name: "동명동 행정복합센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/11.동명동 행정복합센터.webp"
  },
  {
    name: "목포대학교 미래라이프관",
    phase: "예비/본",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/12.목포대학교 미래라이프관.webp"
  },
  {
    name: "빛고을 안전체험관",
    phase: "예비인증",
    certifications: ["BF"],
    image: "/images/featured/13.빛고을 안전체험관.webp"
  },
  {
    name: "광주효동유치원",
    phase: "본인증",
    certifications: ["에효/제로", "녹색"],
    image: "/images/featured/14.광주효동유치원.webp"
  },
  {
    name: "대마산업단지 복합문화센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/15.대마산업단지 복합문화센터.webp"
  },
  {
    name: "황금초중 통합운영학교",
    phase: "본인증",
    certifications: ["에효/제로"],
    image: "/images/featured/16.황금초중 통합운영학교.webp"
  },
  {
    name: "전라남도 소방본부 청사(장흥소방서)",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/17.전라남도 소방본부 청사(장흥소방서).webp"
  },
  {
    name: "제약산업 미래인력 양성센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/18.제약산업 미래인력 양성센터.webp"
  },
  {
    name: "장흥군 여흥두드림센터",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/19.장흥군 여흥두드림센터.webp"
  },
  {
    name: "웅천국민체육센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/20.웅천국민체육센터.webp"
  },
  {
    name: "돌산 생활SOC 복합화사업",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/21.돌산 생활SOC 복합화 사업.webp"
  },
  {
    name: "전라남도 교육청 영암도서관",
    phase: "본인증",
    certifications: ["에효/제로", "녹색"],
    image: "/images/featured/22.전라남도 교육청 영암도서관.webp"
  },
  {
    name: "전남안전교육체험센터",
    phase: "예비인증",
    certifications: ["BF"],
    image: "/images/featured/23.전남안전교육체험센터.webp"
  },
  {
    name: "전주농생명기록관",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/24.전주농생명기록관.webp"
  },
  {
    name: "신안경찰서",
    phase: "본인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/25.신안경찰서.webp"
  },
  {
    name: "광주 동구다목적체육관",
    phase: "본인증",
    certifications: ["BF", "녹색"],
    image: "/images/featured/26.광주 동구다목적체육관.webp"
  },
  {
    name: "광주광역시 운전면허시험장",
    phase: "예비인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/27.광주광역시 운전면허시험장.webp"
  },
  {
    name: "구봉산권역 관광거점 조성사업",
    phase: "예비인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/28.구봉산권역 관광거점 조성사업.webp"
  },
  {
    name: "국민건강보험공단 고창출장소",
    phase: "예비/본",
    certifications: ["BF"],
    image: "/images/featured/29.국민건강보험공단 고창출장소.webp"
  },
  {
    name: "김치원료공급단지",
    phase: "예비/본",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/30.김치원료공급단지.webp"
  },
  {
    name: "희망중학교",
    phase: "본인증",
    certifications: ["에효/제로", "녹색"],
    image: "/images/featured/31.희망중학교.webp"
  },
  {
    name: "구례소방서",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/32.구례소방서.webp"
  },
  {
    name: "곡성소방서",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/33.곡성소방서.webp"
  },
  {
    name: "함평 종합실내체육관",
    phase: "예비인증",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/34.함평 종합실내체육관.webp"
  },
  {
    name: "첨단3지구 다목적체육관",
    phase: "예비인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/35.첨단3지구 다목적체육관.webp"
  },
  {
    name: "남면사무소",
    phase: "본인증",
    certifications: ["BF"],
    image: "/images/featured/36.남면사무소.webp"
  },
  {
    name: "여수시립박물관",
    phase: "본인증",
    certifications: ["BF"],
    image: "/images/featured/37.여수시립박물관.webp"
  },
  {
    name: "전남소방학교 강의동",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/38.전남소방학교 강의동.webp"
  },
  {
    name: "영암 트로트 아카데미",
    phase: "예비/본",
    certifications: ["BF", "에효/제로", "녹색"],
    image: "/images/featured/39.영암 트로트 아카데미.webp"
  },
  {
    name: "평동산단 개방형체육관",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/40.평동산단 개방형체육관.webp"
  },
  {
    name: "함평 엑스포공원 에듀테인먼트파크 조성사업",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/41.함평 엑스포공원 에듀테인먼트파크.webp"
  },
  {
    name: "함평 학교농공단지 복합문화센터",
    phase: "예비/본",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/42.함평학교농공단지복합문화센터.webp"
  },
  {
    name: "전라남도의회청사 증축",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/43.전남도의회청사증축.webp"
  },
  {
    name: "완도소방서",
    phase: "예비/본",
    certifications: ["BF"],
    image: "/images/featured/44.완도소방서.webp"
  },
  {
    name: "장성군 가족센터",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/45.장성군가족센터.webp"
  },
  {
    name: "해제면사무소",
    phase: "본인증",
    certifications: ["BF", "에효/제로"],
    image: "/images/featured/46.해제면사무소.webp"
  }
];
