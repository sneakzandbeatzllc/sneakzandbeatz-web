"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "snb_cookie_consent_v1";

type Consent = "accept" | "reject" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Consent;
      if (stored === "accept" || stored === "reject") {
        setConsent(stored);
      }
    } catch {
      // localStorage may be blocked; banner just stays visible.
    }
  }, []);

  const handleAccept = () => {
    setConsent("accept");
    try {
      window.localStorage.setItem(STORAGE_KEY, "accept");
    } catch {}
  };

  const handleReject = () => {
    setConsent("reject");
    try {
      window.localStorage.setItem(STORAGE_KEY, "reject");
    } catch {}
  };

  if (!mounted || consent !== null) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie and privacy notice">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          We use cookies and analytics (Vercel Analytics) to understand traffic
          and improve the site. We do <strong>not</strong> sell your personal
          information. California residents can read our{" "}
          <Link href="/privacy">Privacy Policy</Link> for full CCPA rights.
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-btn cookie-btn-reject" onClick={handleReject}>
            Reject non-essential
          </button>
          <button type="button" className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
