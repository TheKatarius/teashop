import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

// SPA route changes don't reload the page, so GA pageviews are sent on each
// location change. Rendered inside the router tree (RootLayout) — useLocation
// requires router context, which App itself doesn't have with RouterProvider.
export function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
