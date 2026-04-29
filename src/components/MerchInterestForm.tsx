"use client";

/**
 * MerchInterestForm
 *
 * Interactive pre-order interest form on /shop.
 * Visitor:
 *   1. Picks one or more products
 *   2. For each picked product, selects a colorway (radio) and a size
 *   3. Drops contact info + optional creator-program flag
 *   4. Submits via Web3Forms — every entry lands in
 *      sneakzandbeatzllc@gmail.com and gets logged in the
 *      Tax_Records / Merch_Sales pre-launch waitlist CSV.
 *
 * Submissions stored centrally so when pre-orders open Aug 1 we can:
 *   - Email this list 24 hrs before the public link
 *   - Pull from this list when assigning creator merch (color-match per
 *     creator's Jordan inventory)
 */

import { useState, FormEvent } from "react";
import { MERCH_PRODUCTS, MERCH_COLORWAYS } from "@/data/merch";

// Partnerships-routed Web3Forms key — submissions land in
// partnerships@sneakzandbeatz.com (Google Workspace).
// See CreatorsApplyForm.tsx for setup instructions.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY_PARTNERSHIPS ||
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "9c1680e8-7853-4d17-866c-b897371a6587";

type Status = "idle" | "sending" | "error" | "success";

export default function MerchInterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // Track which products are selected (controlled UI for conditional fields)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  function toggleProduct(slug: string, checked: boolean) {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (checked) next.add(slug);
      else next.delete(slug);
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "🛍️ S&B Merch — New Pre-order Interest");
    formData.append("from_name", "Merch Interest List");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
        setSelectedProducts(new Set());
      } else {
        setStatus("error");
        setErrorMsg(
          data?.message ||
            "Submission failed. Try again or email partnerships@sneakzandbeatz.com."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="creators-success">
        <span className="creators-success-tag">✓ You&rsquo;re on the list</span>
        <h3 className="creators-success-h">First pull when pre-orders drop.</h3>
        <p className="creators-success-body">
          We email the interest list 24 hours before the public Stripe link goes
          live on August 1. Your colorway pick is reserved while supply lasts.
        </p>
      </div>
    );
  }

  return (
    <form className="merch-form" onSubmit={handleSubmit}>
      {/* Honeypot */}
      <input
        type="checkbox" name="botcheck"
        style={{ display: "none" }} tabIndex={-1} autoComplete="off"
      />

      {/* SECTION 1 — pick products */}
      <fieldset className="submit-fieldset">
        <legend>1. What do you want?</legend>
        <p className="submit-helper" style={{ marginBottom: 14 }}>
          Tick everything you want to reserve. Bundle picks save spots faster.
        </p>

        <div className="merch-form-product-list">
          {MERCH_PRODUCTS.map((p) => (
            <label key={p.slug} className="merch-form-product">
              <input
                type="checkbox"
                name={`want_${p.slug}`}
                value={p.slug}
                onChange={(e) => toggleProduct(p.slug, e.currentTarget.checked)}
              />
              <span className="merch-form-product-name">
                {p.name} <strong>${p.priceUSD}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* SECTION 2 — per-product configuration (only shows when product is checked) */}
      {selectedProducts.size > 0 && (
        <fieldset className="submit-fieldset">
          <legend>2. Pick the colorway + size</legend>
          <p className="submit-helper" style={{ marginBottom: 14 }}>
            One pick per product. Match your Jordan colorway when you can — that&rsquo;s
            the brand signature. Hover any swatch to see which Js it pairs with.
          </p>

          {MERCH_PRODUCTS.filter((p) => selectedProducts.has(p.slug)).map((p) => (
            <div key={p.slug} className="merch-form-config">
              <h4 className="merch-form-config-h">{p.name}</h4>

              <div className="merch-form-config-row">
                <span className="merch-form-config-label">Colorway</span>
                <div className="merch-form-config-swatches">
                  {p.colorways.map((c) => (
                    <label
                      key={c.slug}
                      className="merch-form-color-pick"
                      title={`${c.name} · pairs with ${c.pairsWith}`}
                    >
                      <input
                        type="radio"
                        name={`color_${p.slug}`}
                        value={c.slug}
                        required
                      />
                      <span
                        className="merch-form-color-swatch"
                        style={{
                          background: `linear-gradient(90deg, ${c.swatch.from}, ${c.swatch.to})`,
                        }}
                        aria-label={c.name}
                      />
                      <span className="merch-form-color-name">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="merch-form-config-row">
                <span className="merch-form-config-label">Size</span>
                <div className="merch-form-config-sizes">
                  {p.sizes.map((s) => (
                    <label key={s} className="merch-form-size-pick">
                      <input type="radio" name={`size_${p.slug}`} value={s} required />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </fieldset>
      )}

      {/* SECTION 3 — contact + flags */}
      <fieldset className="submit-fieldset">
        <legend>3. Where to reach you</legend>

        <label className="submit-field">
          <span className="submit-label">
            Name <span className="submit-req">*</span>
          </span>
          <input type="text" name="name" required maxLength={120} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Email <span className="submit-req">*</span>
            <span className="submit-helper">
              Where the pre-order link lands 24 hours before public launch.
            </span>
          </span>
          <input type="email" name="email" required />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Instagram (optional)
            <span className="submit-helper">
              Helps us match merch to your aesthetic if you&rsquo;re on the
              creator program.
            </span>
          </span>
          <input type="text" name="instagram" placeholder="@yourhandle" maxLength={64} />
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="is_creator" value="yes" />
          <span>
            I&rsquo;ve applied (or plan to apply) to the{" "}
            <a href="/creators" target="_blank" rel="noopener">
              S&B Creator Program
            </a>
            . Use my colorway pick when matching booking briefs.
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="newsletter_optin" value="yes" />
          <span>
            Add me to the S&B newsletter (early drops, beat-pack discounts).
            Unsubscribe anytime.
          </span>
        </label>
      </fieldset>

      {status === "error" && (
        <div className="submit-error" role="alert">
          ✗ {errorMsg}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-arrow submit-cta"
        disabled={status === "sending" || selectedProducts.size === 0}
      >
        {status === "sending" ? "Sending…" : "Reserve My Pick"}
      </button>

      <p className="submit-trust">
        First-come first-served when pre-orders open August 1. We never sell or
        share your email.
      </p>
    </form>
  );
}
