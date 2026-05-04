"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Building2, MapPin } from "lucide-react";
import {
  featuredProjects,
  type FeaturedProject
} from "@/data/featured-projects";
import type { Certification } from "@/data/projects";

const certificationMeta: Record<
  Certification,
  { label: string; className: string }
> = {
  BF: { label: "BF", className: "bg-ink text-white" },
  녹색: { label: "녹색", className: "bg-moss text-white" },
  에너지: { label: "에너지", className: "bg-clay text-white" },
  제로: { label: "제로", className: "bg-sage text-ink" }
};

const visibleRailItems = 4;

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex];

  const visibleProjects = useMemo(
    () =>
      Array.from({ length: visibleRailItems }, (_, offset) => {
        const index = (activeIndex + offset) % featuredProjects.length;
        return { index, project: featuredProjects[index] };
      }),
    [activeIndex]
  );

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return featuredProjects.length - 1;
      if (next >= featuredProjects.length) return 0;
      return next;
    });
  };

  return (
    <section id="featured" className="border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-moss">Featured Projects</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              대표 프로젝트
            </h2>
          </div>
          {/* <p className="max-w-xl text-base leading-7 text-ink/68">
            핵심 프로젝트 하나를 크게 보여주고, 나머지 대표 실적은 오른쪽
            캐러셀에서 빠르게 넘겨보는 구조입니다.
          </p> */}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_188px]">
          <article className="overflow-hidden rounded border border-line bg-cloud">
            <ProjectImage project={activeProject} className="aspect-[16/11]" />
            <div className="p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-semibold text-moss">
                    {activeProject.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-8 sm:text-3xl">
                    {activeProject.name}
                  </h3>
                </div>
                <span className="shrink-0 rounded bg-ink px-3 py-1.5 text-sm font-semibold text-white">
                  {String(activeIndex + 1).padStart(2, "0")} / 12
                </span>
              </div>
              <ProjectMeta project={activeProject} className="mt-6" />
            </div>
          </article>

          <div className="w-full max-w-[188px] rounded border border-line bg-cloud p-4">
            <div className="mb-4 flex justify-end gap-2">
              <button
                type="button"
                aria-label="이전 대표 프로젝트"
                className="grid h-10 w-10 place-items-center rounded border border-line bg-white text-ink transition hover:border-moss hover:text-moss"
                onClick={() => move(-1)}
              >
                <ArrowUp size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="다음 대표 프로젝트"
                className="grid h-10 w-10 place-items-center rounded border border-line bg-white text-ink transition hover:border-moss hover:text-moss"
                onClick={() => move(1)}
              >
                <ArrowDown size={17} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {visibleProjects.map(({ project, index }) => {
                const selected = index === activeIndex;

                return (
                  <button
                    key={project.name}
                    type="button"
                    className={`relative aspect-square shrink-0 overflow-hidden rounded border text-left transition hover:border-moss hover:shadow-soft ${
                      selected
                        ? "border-ink bg-white shadow-soft"
                        : "border-line bg-white/78"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <ProjectImage
                      project={project}
                      className="h-full"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/72 to-transparent px-3 pb-3 pt-8 text-white">
                      <div className="flex items-end justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-5">
                          {project.name}
                        </h3>
                        <span className="shrink-0 rounded bg-white/16 px-2 py-0.5 text-xs font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectImage({
  project,
  className
}: {
  project: FeaturedProject;
  className: string;
}) {
  return (
    <div
      className={`${className} relative overflow-hidden border-b border-line bg-sage`}
      style={
        project.image
          ? {
              backgroundImage: `url(${project.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            }
          : undefined
      }
    >
      {!project.image && (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(90deg,rgba(88,107,82,.14)_1px,transparent_1px),linear-gradient(rgba(88,107,82,.14)_1px,transparent_1px)] bg-[size:32px_32px]">
          <Building2 className="text-moss" size={36} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function ProjectMeta({
  project,
  className
}: {
  project: FeaturedProject;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink/60">
        <MapPin size={15} aria-hidden="true" />
        {project.location}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.certifications.map((certification) => (
          <span
            key={certification}
            className={`rounded px-2.5 py-1 text-xs font-semibold ${certificationMeta[certification].className}`}
          >
            {certificationMeta[certification].label}
          </span>
        ))}
      </div>
    </div>
  );
}
