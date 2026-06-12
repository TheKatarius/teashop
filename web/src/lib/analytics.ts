declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackPageView(path: string) {
  if (!import.meta.env.PROD) return;
  window.gtag?.('event', 'page_view', {
    page_path: path,
    send_to: import.meta.env.VITE_GA_MEASUREMENT_ID,
  });
}
