export const isEmailSyntaxValid = (email: string): boolean => {
  if (!email || email.length > 320) return false;
  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return pattern.test(email);
};

export const extractDomainFromEmail = (email: string): string | null => {
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  return parts[1].toLowerCase();
};

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "dropmail.me",
  "trashmail.com",
  "tempmailo.com",
  "getnada.com",
  "sharklasers.com",
]);

export const isDisposableDomain = (domain: string | null): boolean => {
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
};


