import { clsx, type ClassValue } from "clsx";
import { setCookie } from "cookies-next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setAuthCookie(
  token: string | undefined,
  role: string | undefined
): void {
  setCookie("token", token, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });
  setCookie("role", role, {
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });
}
