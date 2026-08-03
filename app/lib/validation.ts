export function isValidWaitlistContact(value: string) {
  const trimmed = value.trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobile = /^(?:\+63|0)9\d{9}$/;
  const normalizedMobile = trimmed.replace(/[\s()-]/g, "");

  return email.test(trimmed) || mobile.test(normalizedMobile);
}
