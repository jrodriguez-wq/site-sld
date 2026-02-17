import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_INFO } from "@/config/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// Must match your verified domain in Resend (e.g. contact.standardlanddevelopment.com → *@contact.standardlanddevelopment.com)
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/** Validated payload: name, email, message are required; phone is string (may be empty). */
interface ValidatedContact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function validateBody(body: unknown): { ok: true; data: ValidatedContact } | { ok: false; status: number; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, status: 400, message: "Invalid request body." };
  }

  const { name, email, phone, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, status: 400, message: "Name is required (at least 2 characters)." };
  }
  if (!email || typeof email !== "string") {
    return { ok: false, status: 400, message: "Email is required." };
  }
  if (!emailRegex.test(email)) {
    return { ok: false, status: 400, message: "Please enter a valid email address." };
  }
  if (typeof phone === "string" && phone.trim().length > 0) {
    if (!/^[\d\s\-\(\)\+]+$/.test(phone.trim())) {
      return { ok: false, status: 400, message: "Please enter a valid phone number." };
    }
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return { ok: false, status: 400, message: "Message is required (at least 10 characters)." };
  }

  return {
    ok: true,
    data: {
      name: (name as string).trim(),
      email: (email as string).trim(),
      phone: typeof phone === "string" ? phone.trim() : "",
      message: (message as string).trim(),
    },
  };
}

function buildHtmlEmail(data: ValidatedContact): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contact form submission</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1e293b; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #0f172a; margin-bottom: 24px;">New contact form submission</h2>
  <p><strong>From:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
  ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ""}
  <p><strong>Message:</strong></p>
  <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
  <p style="margin-top: 24px; font-size: 12px; color: #64748b;">Sent via Standard Land Development contact form.</p>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Contact form is not configured. Please try again later." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const validated = validateBody(body);
  if (!validated.ok) {
    return NextResponse.json(
      { error: validated.message },
      { status: validated.status }
    );
  }

  const { data } = validated;
  const html = buildHtmlEmail(data);

  const toEmail = CONTACT_INFO.contactFormTo;

  const { data: sendData, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [toEmail],
    replyTo: data.email,
    subject: `Contact form: ${data.name}`,
    html,
  });

  if (error) {
    const errMessage = typeof error === "object" && error !== null && "message" in error
      ? String((error as { message?: unknown }).message)
      : String(error);
    console.error("[Contact API] Resend error:", errMessage, "from:", FROM_EMAIL, "to:", toEmail, "raw:", JSON.stringify(error));
    return NextResponse.json(
      { error: "Failed to send message. Please try again or contact us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: sendData?.id });
}
