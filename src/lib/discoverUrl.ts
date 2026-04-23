/** gt-app `common` “Discover how…” CTA; override with `VITE_DISCOVER_DONATIONS_URL`. */
const DEFAULT_DISCOVER = 'https://www.giftabulator.com/';

export function getDiscoverDonationsUrl(): string {
  const fromEnv = import.meta.env.VITE_DISCOVER_DONATIONS_URL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_DISCOVER;
}
