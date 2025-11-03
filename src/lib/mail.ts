import { Resend } from "resend";

export type ContactPayload = {
  fromName: string;
  replyTo: string;
  message: string;
};

export const sendContactEmail = async (payload: ContactPayload): Promise<{ ok: boolean; reason?: string }> => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_CONTACT_TO;
  const from = process.env.RESEND_FROM || "portfolio@resend.dev";

  if (!apiKey || !to) {
    return { ok: false, reason: "email_disabled" };
  }

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from,
      to,
      reply_to: payload.replyTo,
      subject: `Portfolio contact from ${payload.fromName}`,
      text: `Name: ${payload.fromName}\nEmail: ${payload.replyTo}\n\n${payload.message}`,
    });
    return { ok: true };
  } catch (err: any) {
    return { ok: false, reason: err?.message ?? "send_failed" };
  }
};


