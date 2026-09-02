import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * The ONLY place SMTP is touched.
 *
 * CONFIG FACTS -> mail: SMTP via env vars only. Credentials are never
 * hardcoded, never sent to the client, and never logged — note that the catch
 * block below logs a fixed string, not the error object, because transport
 * errors can echo the DSN back.
 */
export const runtime = 'nodejs';

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // honeypot — silently accept so bots do not learn anything
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const service = str(body.service);
  const message = str(body.message);

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    // Not configured yet. Fail closed and say nothing about which var is missing.
    return NextResponse.json({ ok: false, error: 'Mail is not configured' }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Service request - ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service || 'not specified'}`,
        '',
        message,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch {
    console.error('contact: send failed');
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
