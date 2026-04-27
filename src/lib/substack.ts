/**
 * substack.ts
 *
 * Newsletter subscribe handler. Substack doesn't have a clean public API for
 * programmatic signups, but their public subscribe endpoint accepts a POST
 * and treats it as a form submission. Three viable patterns:
 *
 *   1) Direct POST to https://sneakzandbeatz.substack.com/api/v1/free
 *      with { email } — works but undocumented; can break.
 *
 *   2) Embed Substack's official <iframe> widget — most robust, lowest control.
 *      Stick this in Newsletter.tsx instead of the custom form when you want
 *      bulletproof.
 *
 *   3) (Recommended) — set up a Vercel Edge Function that proxies to Substack's
 *      subscribe-with-redirect URL. Keeps the custom form's look, no iframe,
 *      no CORS issues, no Substack rate-limit hits to user IPs.
 *
 * For now this is a stub that pretends success. When you stand up the
 * Substack publication, swap the body for option 3.
 */

export async function subscribeToSubstack(email: string): Promise<{ ok: boolean }> {
  // TODO: replace with real Substack subscribe call.
  //
  // const res = await fetch("/api/subscribe", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  // });
  // if (!res.ok) throw new Error("subscribe failed");
  // return res.json();
  if (!email || !email.includes("@")) throw new Error("invalid email");
  console.log(`[stub] would subscribe ${email} to Substack`);
  return { ok: true };
}
