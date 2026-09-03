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

// Injeta Meta Pixel, GA4 e Clarity — só deve ser chamada depois de consentimento
// (ver src/lib/consent.ts). Idempotente: chamadas repetidas não duplicam os scripts.
let trackingScriptsLoaded = false;

export function loadTrackingScripts() {
  if (typeof window === "undefined" || trackingScriptsLoaded) return;
  trackingScriptsLoaded = true;

  const fbScript = document.createElement("script");
  fbScript.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(fbScript);

  const gtagLoader = document.createElement("script");
  gtagLoader.async = true;
  gtagLoader.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(gtagLoader);

  const gtagConfig = document.createElement("script");
  gtagConfig.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_MEASUREMENT_ID}');
  `;
  document.head.appendChild(gtagConfig);

  const clarityScript = document.createElement("script");
  clarityScript.type = "text/javascript";
  clarityScript.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
  `;
  document.head.appendChild(clarityScript);
}
