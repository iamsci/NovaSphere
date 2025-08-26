// lib/diagnostics/onboarding.js

import { onboardingSchema } from '@/lib/validators/onboarding.js';

export function diagnoseOnboarding(payload) {
  const { error, value } = onboardingSchema.validate(payload, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return {
      valid: false,
      issues: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    };
  }

  return {
    valid: true,
    sanitized: value
  };
}
