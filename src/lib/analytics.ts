import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-1SQSKHTEXK';
const COOKIE_CONSENT_KEY = 'premsa-cookie-consent';
let initialized = false;

export const hasAnalyticsConsent = (): boolean => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.preferences?.analytics === true;
  } catch {
    return false;
  }
};

export const initGA = () => {
  if (initialized || !hasAnalyticsConsent()) return;
  
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      anonymizeIp: true // GDPR compliance
    }
  });
  initialized = true;
  console.log('[Analytics] GA4 initialized');
};

export const trackPageView = (path: string) => {
  if (!initialized || !hasAnalyticsConsent()) return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (
  action: string, 
  params?: Record<string, any>
) => {
  if (!initialized || !hasAnalyticsConsent()) return;
  ReactGA.event(action, params);
};

// Per reinicialitzar quan l'usuari canvia preferències
export const reinitializeGA = () => {
  if (hasAnalyticsConsent() && !initialized) {
    initGA();
  }
};
