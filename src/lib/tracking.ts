// Domínio de produção — usado pra montar URLs absolutas (og:image etc.).
export const SITE_URL = "https://45min.ladegroup.com.br";

// Destino único de conversão.
export const CHECKOUT_URL = "https://pay.hotmart.com/B107451355O";

// Meta Pixel: insira o ID quando disponível (ex.: "123456789012345").
export const META_PIXEL_ID = "1075669388414807";

// Google Analytics 4 — Measurement ID (prefixo "G-").
export const GA4_MEASUREMENT_ID = "G-SJCZ6TFCQT";

// Microsoft Clarity — Project ID.
export const CLARITY_PROJECT_ID = "ycriwyqmt3";

type PixelEvent =
  | "PageView"
  | "ViewContent"
  | "ClickCTA"
  | "InitiateCheckout"
  | "Purchase";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const standard = event !== "ClickCTA";
  window.fbq?.(standard ? "track" : "trackCustom", event, params);
}

export function goToCheckout(origem: string) {
  track("ClickCTA", { origem });
  track("InitiateCheckout", { value: 37, currency: "BRL", origem });
  window.open(CHECKOUT_URL, "_blank", "noopener,noreferrer");
}
