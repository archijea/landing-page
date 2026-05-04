import type { Certification } from "@/data/projects";

export type FeaturedProject = {
  name: string;
  category: string;
  location: string;
  certifications: Certification[];
  image?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "보성군 복합커뮤니티센터 건립",
    category: "복합커뮤니티센터",
    location: "전남 보성",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "국립여수해양기상과학관 신축공사",
    category: "과학·문화시설",
    location: "전남 여수",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "무안군보건소",
    category: "보건시설",
    location: "전남 무안",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "신안경찰서",
    category: "공공청사",
    location: "전남 신안",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "장흥소방서",
    category: "소방청사",
    location: "전남 장흥",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "동구 구립 복합공공도서관",
    category: "공공도서관",
    location: "광주 동구",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "전남소방학교 강의동",
    category: "교육·훈련시설",
    location: "전남 장흥",
    certifications: ["BF", "에너지", "제로"]
  },
  {
    name: "글로벌 청소년 리더센터 신축공사",
    category: "청소년시설",
    location: "전남",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "상무시민공원 국민체육관",
    category: "체육시설",
    location: "광주",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "영암 트로트아카데미",
    category: "교육·문화시설",
    location: "전남 영암",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "광주 운전면허시험장 조성사업",
    category: "공공서비스시설",
    location: "광주",
    certifications: ["BF", "녹색", "에너지", "제로"]
  },
  {
    name: "구례소방서",
    category: "소방청사",
    location: "전남 구례",
    certifications: ["BF", "에너지", "제로"]
  }
];
