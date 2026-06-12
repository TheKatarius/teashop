import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga4';

// Both tools are configured via env so dev/preview builds without real ids stay silent.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const HOTJAR_SITE_ID = Number(import.meta.env.VITE_HOTJAR_SITE_ID ?? 0);
const HOTJAR_VERSION = 6;

let initialized = false;

export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
  if (HOTJAR_SITE_ID > 0) {
    Hotjar.init(HOTJAR_SITE_ID, HOTJAR_VERSION);
  }
}

export function trackPageView(path: string): void {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.send({ hitType: 'pageview', page: path });
}
