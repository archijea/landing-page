import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maxFileSize = 10 * 1024 * 1024;
const allowedExtensions = new Set([
  "pdf",
  "hwp",
  "hwpx",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "jpg",
  "jpeg",
  "png",
  "zip"
]);

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/haansofthwp",
  "application/x-hwp",
  "application/vnd.hancom.hwp",
  "application/vnd.hancom.hwpx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed"
]);

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 5;
const minimumSubmitTimeMs = 3000;
const maxFieldLengths = {
  name: 80,
  phone: 30,
  email: 120,
  project: 120,
  message: 3000
};

const solicitationPatterns = [
  "디지털 마케팅",
  "온라인 마케팅",
  "검색엔진",
  "검색 엔진",
  "seo",
  "backlink",
  "guest post",
  "lead generation",
  "website traffic",
  "rank higher",
  "google ranking",
  "more customers",
  "grow your business",
  "business proposal"
];

const salesPitchPatterns = [
  "더 많은 고객에게 도달",
  "귀사의 전문성을 온라인에서",
  "온라인에서 더욱 널리 알릴",
  "마케팅을 강화",
  "마케팅을 도와드릴"
];

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
  const cloudflareIp = request.headers.get("cf-connecting-ip");
  if (cloudflareIp) return cloudflareIp.trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + rateLimitWindowMs
    });
    return false;
  }

  entry.count += 1;
  return entry.count > rateLimitMaxRequests;
}

function getFileExtension(fileName: string) {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.at(-1) || "" : "";
}

function validateAttachment(file: File) {
  if (!file.name || file.size === 0) return null;

  if (file.size > maxFileSize) {
    return "첨부파일은 10MB 이하로 업로드해 주세요.";
  }

  const extension = getFileExtension(file.name);
  const hasAllowedExtension = allowedExtensions.has(extension);
  const hasAllowedMime =
    !file.type ||
    allowedMimeTypes.has(file.type) ||
    file.type === "application/octet-stream";

  if (!hasAllowedExtension || !hasAllowedMime) {
    return "허용되지 않는 첨부파일 형식입니다.";
  }

  return null;
}

function validateFieldLengths(payload: ContactPayload) {
  if (payload.name.length > maxFieldLengths.name) {
    return "담당자는 80자 이하로 입력해 주세요.";
  }

  if (payload.phone.length > maxFieldLengths.phone) {
    return "연락처는 30자 이하로 입력해 주세요.";
  }

  if (payload.email.length > maxFieldLengths.email) {
    return "이메일은 120자 이하로 입력해 주세요.";
  }

  if (payload.project.length > maxFieldLengths.project) {
    return "프로젝트명은 120자 이하로 입력해 주세요.";
  }

  if (payload.message.length > maxFieldLengths.message) {
    return "문의사항은 3000자 이하로 입력해 주세요.";
  }

  return null;
}

function normalizeForSpamCheck(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getSubmitElapsedMs(formData: FormData) {
  const loadedAt = Number(getText(formData, "formLoadedAt"));
  return Number.isFinite(loadedAt) ? Date.now() - loadedAt : null;
}

function getSpamReasons(payload: ContactPayload, formData: FormData) {
  const reasons: string[] = [];
  const text = normalizeForSpamCheck(
    `${payload.name} ${payload.email} ${payload.project} ${payload.message}`
  );
  const compactText = text.replace(/\s/g, "");
  const normalizedPhone = payload.phone.replace(/\D/g, "");
  const elapsedMs = getSubmitElapsedMs(formData);

  const solicitationHits = solicitationPatterns.filter((pattern) =>
    text.includes(pattern)
  );
  if (solicitationHits.length > 0) {
    reasons.push("solicitation-copy");
  }

  const salesPitchHits = salesPitchPatterns.filter((pattern) =>
    compactText.includes(pattern.replace(/\s/g, ""))
  );
  if (salesPitchHits.length >= 2) {
    reasons.push("sales-pitch-copy");
  }

  if (/^555\d{7}$/.test(normalizedPhone)) {
    reasons.push("fictional-us-phone");
  }

  if (/^(\d)\1{7,}$/.test(normalizedPhone)) {
    reasons.push("repeated-phone-digits");
  }

  if (
    payload.name.length >= 3 &&
    normalizeForSpamCheck(payload.name) === normalizeForSpamCheck(payload.project)
  ) {
    reasons.push("same-name-and-project");
  }

  if (elapsedMs !== null && elapsedMs >= 0 && elapsedMs < minimumSubmitTimeMs) {
    reasons.push("too-fast-submit");
  }

  return reasons;
}

function isLikelySpam(payload: ContactPayload, formData: FormData) {
  const reasons = getSpamReasons(payload, formData);
  const score = reasons.reduce((total, reason) => {
    if (reason === "solicitation-copy") return total + 3;
    if (reason === "sales-pitch-copy") return total + 2;
    if (reason === "fictional-us-phone") return total + 2;
    if (reason === "repeated-phone-digits") return total + 2;
    return total + 1;
  }, 0);

  return { isSpam: score >= 4, reasons, score };
}

function buildEmailHtml(payload: ContactPayload) {
  return `
    <h2>견적문의</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tbody>
        <tr>
          <th align="left">담당자</th>
          <td>${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <th align="left">연락처</th>
          <td>${escapeHtml(payload.phone)}</td>
        </tr>
        <tr>
          <th align="left">이메일</th>
          <td>${escapeHtml(payload.email)}</td>
        </tr>
        <tr>
          <th align="left">프로젝트명</th>
          <td>${escapeHtml(payload.project)}</td>
        </tr>
      </tbody>
    </table>
    <h3>문의사항</h3>
    <p style="white-space: pre-line;">${escapeHtml(payload.message)}</p>
  `;
}

async function sendWithResend(payload: ContactPayload, attachment: File | null) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "archijea@naver.com";

  if (!apiKey || !from || !to) {
    console.info("[contact:draft]", {
      ...payload,
      attachment: attachment?.name || null
    });
    return { dryRun: true };
  }

  const attachments =
    attachment && attachment.name && attachment.size > 0
      ? [
          {
            filename: attachment.name,
            content: Buffer.from(await attachment.arrayBuffer()).toString(
              "base64"
            )
          }
        ]
      : [];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `[견적문의] ${payload.project || payload.name}`,
      html: buildEmailHtml(payload),
      attachments
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[contact:resend-error]", errorText);
    throw new Error("메일 전송에 실패했습니다.");
  }

  return { dryRun: false };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "잠시 후 다시 문의해 주세요." },
      { status: 429 }
    );
  }

  const formData = await request.formData();

  if (getText(formData, "website")) {
    return NextResponse.json({ message: "문의가 접수되었습니다." });
  }

  const payload: ContactPayload = {
    name: getText(formData, "name"),
    phone: getText(formData, "phone"),
    email: getText(formData, "email"),
    project: getText(formData, "project"),
    message: getText(formData, "message")
  };

  if (
    !payload.name ||
    !payload.phone ||
    !payload.email ||
    !payload.project ||
    !payload.message
  ) {
    return NextResponse.json(
      { message: "필수 항목을 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!isEmail(payload.email)) {
    return NextResponse.json(
      { message: "올바른 이메일을 입력해 주세요." },
      { status: 400 }
    );
  }

  const lengthError = validateFieldLengths(payload);
  if (lengthError) {
    return NextResponse.json({ message: lengthError }, { status: 400 });
  }

  const spamCheck = isLikelySpam(payload, formData);
  if (spamCheck.isSpam) {
    console.info("[contact:spam-drop]", {
      ip,
      reasons: spamCheck.reasons,
      score: spamCheck.score,
      email: payload.email
    });
    return NextResponse.json({ message: "문의가 접수되었습니다." });
  }

  const attachmentValue = formData.get("attachment");
  const attachment = attachmentValue instanceof File ? attachmentValue : null;

  if (attachment) {
    const attachmentError = validateAttachment(attachment);
    if (attachmentError) {
      return NextResponse.json({ message: attachmentError }, { status: 400 });
    }
  }

  try {
    const result = await sendWithResend(payload, attachment);
    return NextResponse.json({
      message: result.dryRun
        ? "문의가 접수되었습니다. 메일 발송 설정 후 실제 전송됩니다."
        : "문의가 접수되었습니다."
    });
  } catch (error) {
    console.error("[contact:error]", error);
    return NextResponse.json(
      { message: "문의 전송 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
