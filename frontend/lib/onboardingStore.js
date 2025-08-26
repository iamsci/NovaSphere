// lib/onboardingstore.js

const STORAGE_KEY = 'onboarding';

/**
 * Default onboarding structure
 */
export const defaultOnboarding = {
  name: '',
  email: '',
  bio: '',
  avatar: '',
  niche: []
};

/**
 * Safely get onboarding data from localStorage
 */
export function getOnboarding() {
  if (typeof window === 'undefined') return defaultOnboarding;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultOnboarding;
  } catch (err) {
    console.warn('Failed to parse onboarding data:', err);
    return defaultOnboarding;
  }
}

/**
 * Set full onboarding object
 * @param {Object} data
 */
export function setOnboarding(data) {
  if (typeof window === 'undefined') return;
  try {
    const merged = { ...defaultOnboarding, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (err) {
    console.error('Failed to save onboarding data:', err);
  }
}

/**
 * Update a single field
 * @param {string} key
 * @param {any} value
 */
export function updateOnboardingField(key, value) {
  if (typeof window === 'undefined') return;
  const current = getOnboarding();
  const updated = { ...current, [key]: value };
  setOnboarding(updated);
}

/**
 * Clear onboarding data
 */
export function clearOnboarding() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
