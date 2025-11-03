export type RecaptchaVerifyResult = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(token: string | null | undefined, remoteIp?: string): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret || !token) {
    return { success: false };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteIp) params.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // Never cache
      cache: "no-store",
    });
    const data = (await res.json()) as RecaptchaVerifyResult;
    return data;
  } catch {
    return { success: false };
  }
}


