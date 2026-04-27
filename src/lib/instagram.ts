/**
 * instagram.ts
 *
 * "From The Culture" grid feed via the Instagram Graph API.
 *
 * You already have IG Graph wired (h1 = @SneakzandBeatz). To populate the
 * grid for real, you need:
 *
 *   - A long-lived IG access token stored in IG_ACCESS_TOKEN env var
 *     (set in Vercel project settings → Environment Variables).
 *   - The IG user id (from /me?fields=id with a short-lived token).
 *
 * Then this function fetches recent media. Refresh every 30 min via ISR.
 *
 * Until that's wired, this returns an empty array and FromTheCulture.tsx
 * falls back to its 6-tile gradient placeholder grid.
 */

export type IGMedia = {
  id: string;
  caption?: string;
  mediaUrl: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

type FetchOpts = { limit?: number };

export async function fetchRecentInstagramMedia(opts: FetchOpts = {}): Promise<IGMedia[]> {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) return []; // signal to the component to render the placeholder grid
  const limit = opts.limit ?? 6;

  // TODO: real Graph API call.
  //
  // const url = `https://graph.facebook.com/v21.0/me/media?fields=id,caption,media_url,permalink,media_type&limit=${limit}&access_token=${token}`;
  // const res = await fetch(url, { next: { revalidate: 1800 } });
  // if (!res.ok) return [];
  // const data = await res.json();
  // return (data.data || []).map((m: any) => ({
  //   id: m.id,
  //   caption: m.caption,
  //   mediaUrl: m.media_url,
  //   permalink: m.permalink,
  //   mediaType: m.media_type,
  // }));

  return [];
}
