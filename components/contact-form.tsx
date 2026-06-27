"use client";

import { FormEvent, useRef, useState } from "react";
import { FileSearch } from "lucide-react";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const maxFileSizeMb = 10;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const formLoadedAtRef = useRef(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("attachment");

    if (file instanceof File && file.size > maxFileSizeMb * 1024 * 1024) {
      setSubmitState({
        type: "error",
        message: `첨부파일은 ${maxFileSizeMb}MB 이하로 업로드해 주세요.`
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "문의 전송에 실패했습니다.");
      }

      formRef.current?.reset();
      setSubmitState({
        type: "success",
        message: data.message || "문의가 접수되었습니다."
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "문의 전송 중 오류가 발생했습니다."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="grid min-w-0 gap-4 rounded border border-white/14 bg-white/6 p-5"
      onSubmit={handleSubmit}
    >
      <p className="text-lg font-semibold text-white">견적문의</p>
      <label className="hidden" aria-hidden="true">
        홈페이지
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <input
        type="hidden"
        name="formLoadedAt"
        value={formLoadedAtRef.current}
        readOnly
      />
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        담당자
        <input
          name="name"
          required
          className="h-12 w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 text-ink outline-none transition focus:border-sage"
          placeholder="상호 / 담당자명"
        />
      </label>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        연락처
        <input
          name="phone"
          required
          className="h-12 w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 text-ink outline-none transition focus:border-sage"
          placeholder="연락처를 입력해 주세요."
        />
      </label>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        이메일
        <input
          name="email"
          type="email"
          required
          className="h-12 w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 text-ink outline-none transition focus:border-sage"
          placeholder="이메일을 입력해 주세요."
        />
      </label>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        프로젝트명
        <input
          name="project"
          required
          className="h-12 w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 text-ink outline-none transition focus:border-sage"
          placeholder="프로젝트명을 입력해 주세요."
        />
      </label>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        문의사항
        <textarea
          name="message"
          required
          className="min-h-32 w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 py-3 text-ink outline-none transition focus:border-sage"
          placeholder="문의사항을 입력해 주세요."
        />
      </label>
      <label className="grid min-w-0 gap-2 text-sm font-medium">
        첨부파일
        <input
          name="attachment"
          type="file"
          accept=".pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
          className="w-full min-w-0 max-w-full rounded border border-white/14 bg-white px-4 py-3 text-sm text-ink file:mr-4 file:rounded file:border-0 file:bg-sage file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ink"
        />
        <span className="text-xs font-normal text-white/58">
          최대 {maxFileSizeMb}MB, 허용 파일: pdf, hwp, hwpx, doc, docx,
          xls, xlsx, jpg, png, zip
        </span>
      </label>
      {submitState.type !== "idle" && (
        <p
          className={`rounded border px-3 py-2 text-sm ${
            submitState.type === "success"
              ? "border-sage/40 bg-sage/12 text-sage"
              : "border-red-200/40 bg-red-500/12 text-red-100"
          }`}
          role="status"
        >
          {submitState.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded bg-sage px-5 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FileSearch size={17} aria-hidden="true" />
        {isSubmitting ? "전송 중..." : "견적문의 보내기"}
      </button>
    </form>
  );
}
