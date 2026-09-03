import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";
import { loadTrackingScripts } from "@/lib/tracking";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setConsent("granted");
    setVisible(false);
    loadTrackingScripts();
  }

  function handleDecline() {
    setConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] panel-gold border-x-0 border-b-0 p-4 sm:p-5">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          Usamos cookies para entender como você navega e melhorar sua experiência.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
