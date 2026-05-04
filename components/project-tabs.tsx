"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { projects, type Certification, type Project } from "@/data/projects";

const certificationMeta: Record<
  Certification,
  { label: string; className: string }
> = {
  BF: { label: "BF", className: "bg-ink text-white" },
  녹색: { label: "녹색", className: "bg-moss text-white" },
  에너지: { label: "에너지", className: "bg-clay text-white" },
  제로: { label: "제로", className: "bg-sage text-ink" }
};

const tabs: Array<{ label: string; value: Project["phase"] }> = [
  { label: "예비인증", value: "예비인증" },
  { label: "예비+본인증", value: "예비+본인증" },
  { label: "본인증", value: "본인증" }
];

export function ProjectTabs() {
  const [activePhase, setActivePhase] =
    useState<Project["phase"]>("예비인증");

  const counts = useMemo(
    () =>
      projects.reduce<Record<Project["phase"], number>>(
        (acc, project) => {
          acc[project.phase] += 1;
          return acc;
        },
        {
          본인증: 0,
          예비인증: 0,
          "예비+본인증": 0
        }
      ),
    []
  );

  const filteredProjects = projects.filter(
    (project) => project.phase === activePhase
  );

  return (
    <div className="overflow-hidden rounded border border-line">
      <div className="border-b border-line bg-cloud p-2">
        <div
          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          role="tablist"
          aria-label="수행 단계별 프로젝트"
        >
          {tabs.map((tab) => {
            const selected = activePhase === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`flex h-12 items-center justify-between rounded px-4 text-left text-sm font-semibold transition ${
                  selected
                    ? "bg-ink text-white shadow-sm"
                    : "bg-white text-ink/70 hover:text-moss"
                }`}
                onClick={() => setActivePhase(tab.value)}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    selected ? "bg-white/14 text-white" : "bg-cloud text-ink/55"
                  }`}
                >
                  {counts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden grid-cols-[1.2fr_.45fr_.7fr] border-b border-line bg-cloud px-5 py-4 text-sm font-semibold text-ink/70 md:grid">
        <span>프로젝트</span>
        <span>수행 단계</span>
        <span>인증 범위</span>
      </div>

      <div className="divide-y divide-line bg-white">
        {filteredProjects.map((project) => (
          <article
            key={project.name}
            className="grid gap-4 px-5 py-5 md:grid-cols-[1.2fr_.45fr_.7fr] md:items-center"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 shrink-0 text-moss"
                size={19}
                aria-hidden="true"
              />
              <h3 className="font-semibold leading-6">{project.name}</h3>
            </div>
            <p className="text-sm font-medium text-ink/64">{project.phase}</p>
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
          </article>
        ))}
      </div>
    </div>
  );
}
