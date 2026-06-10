import {
  ArrowRight,
  ClipboardCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FeaturedProjects } from "@/components/featured-projects";
import { ProjectTabs } from "@/components/project-tabs";
import { projectStats } from "@/data/projects";

const services = [
  {
    title: "BF 인증",
    description: "장애물 없는 생활환경(BF) 최신 기준을 반영하여 설계 및 공사 초기 단계부터 인증 취득까지 전 과정을 지원합니다.",
    logoSrc: "/images/BF_logo.png"
  },
  {
    title: "녹색건축인증",
    description: "친환경 건축 성능과 평가 항목을 종합적으로 분석하여 프로젝트 조건에 맞춘 인증 전략으로 인증 취득까지 체계적으로 지원합니다.",
    logoSrc: "/images/green_logo.png"
  },
  {
    title: "건축물에너지효율등급",
    description: "정확한 도서 검토와 현장 조건에 대한 신속한 대응을 기반으로 에너지효율등급 인증 취득을 안정적으로 지원합니다.\n※ 2025년도부터 제로에너지건축물인증과 통합 운영",
    logoSrc: "/images/energy_logo.png"
  },
  {
    title: "제로에너지건축물",
    description: "에너지 절감 계획과 설계 기준을 종합적으로 검토하여 제로에너지건축물 인증 취득 전 과정을 지원합니다.",
    logoSrc: "/images/zero_logo.png"
  }
];

function ServiceDescription({ description }: { description: string }) {
  return (
    <>
      {description.split("\n").map((line) => {
        const isNote = line.startsWith("※");

        return (
          <span
            key={line}
            className={isNote ? "mt-1 block text-xs leading-5" : "block"}
          >
            {line}
          </span>
        );
      })}
    </>
  );
}

const process = [
  "사전검토",
  "인증 전략 수립",
  "도서. 자료 검토",
  "인증 신청도서 작성",
  "인증 신청 및 보완 대응",
  "인증완료"
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cloud font-sans text-ink">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-cloud/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="아키재 홈">
            <span className="grid h-12 w-12 place-items-center">
              <img
                src="/images/archijea_logo.webp"
                alt=""
                className="h-10 w-auto object-contain"
              />
            </span>
            <span className="text-lg font-semibold tracking-normal">아키재</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            <a href="#services">인증 분야</a>
            <a href="#featured">대표 프로젝트</a>
            <a href="#projects">수행 실적</a>
            <a href="#process">프로세스</a>
            <a href="#contact">문의</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex h-10 items-center gap-2 rounded bg-ink px-4 text-sm font-semibold text-white transition hover:bg-moss"
          >
            문의하기
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-line bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero-architecture-certification.png')"
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,247,244,.94)_0%,rgba(245,247,244,.84)_38%,rgba(245,247,244,.28)_68%,rgba(29,35,32,.18)_100%)]" />
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,rgba(88,107,82,.18)_1px,transparent_1px),linear-gradient(rgba(88,107,82,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-5 py-14 sm:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded border border-white/80 bg-white/80 px-3 py-2 text-sm font-semibold text-moss shadow-sm backdrop-blur">
              <ClipboardCheck size={16} aria-hidden="true" />
              BF · 녹색건축 · 에너지효율 · 제로에너지
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl">
              지속가능한 세상을 위한
              <br />
              친환경 건축 최고 파트너
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/76">
              ㈜아키재는 2013년부터 공공건축, 교육시설, 문화시설, 보건시설 및 청사 등 다양한 프로젝트에서 예비인증과 본인증 수행 경험을 쌓아온 건축물인증 컨설팅 전문기업입니다.
              <br />
              축적된 경험과 전문성을 바탕으로 고객 맞춤형 컨설팅을 제공하며, 빠르게 변화하는 제도와 기준을 정확히 반영하여 프로젝트 전 과정에 걸쳐 효율적이고 완성도 있는 인증 업무를 수행합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-moss px-5 text-sm font-semibold text-white transition hover:bg-ink"
              >
                수행 실적 보기
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded border border-ink/20 bg-white px-5 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
              >
                프로젝트 문의
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {projectStats.map((stat) => (
            <div key={stat.label} className="py-8 md:px-8">
              <p className="text-4xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-moss">Certification Scope</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              주요 인증 분야
            </h2>
          </div>
          {/* <p className="max-w-xl text-base leading-7 text-ink/68">
            개별 인증을 따로 처리하기보다 초기 조건, 도서 검토, 보완 대응을
            하나의 일정 안에서 관리하는 구조로 설계합니다.
          </p> */}
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="bg-white p-6">
              <div className="flex h-14 items-center">
                <img
                  src={service.logoSrc}
                  alt=""
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/66">
                <ServiceDescription description={service.description} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <FeaturedProjects />

      <section id="projects" className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-moss">Selected Projects</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                프로젝트 수행 목록
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-ink/68">
              
            </p>
          </div>

          <ProjectTabs />
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold text-moss">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              인증 일정에 맞춘 업무 흐름
            </h2>
            <p className="mt-5 text-base leading-7 text-ink/68">
              설계 단계의 검토 누락을 줄이고, 보완 요청에 빠르게 대응할 수
              있도록 프로젝트별 인증 체크포인트를 관리합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-6">
            {process.map((item, index) => (
              <div key={item} className="bg-white p-5">
                <p className="text-sm font-semibold text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-5 min-h-12 text-lg font-semibold leading-6">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold text-sage">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              견적문의
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
              프로젝트 정보와 문의사항을 남겨주시면 담당자가 회신드리겠습니다.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/78">
              <p className="text-base font-semibold text-white">
                주식회사 아키재
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
                광주광역시 남구 효천안길 51, 3층
              </p>
              <p className="flex items-center gap-3">
                <Phone size={17} aria-hidden="true" />
                TEL. 062-671-6701 / FAX. 062-671-2605
              </p>
              <p className="flex items-center gap-3">
                <Mail size={17} aria-hidden="true" />
                E-mail. archijea@naver.com
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
