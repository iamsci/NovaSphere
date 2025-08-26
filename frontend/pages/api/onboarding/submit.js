// pages/api/onboarding/submit.js

import { onboardingSchema } from '@/lib/validators/onboarding.js';
import dbConnect from '@/lib/dbConnect.js'; // optional: if persisting to DB
import { createProfile } from '@/lib/services/profile.js'; // optional: modular service layer

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Validate incoming payload
    const { error, value } = onboardingSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details.map(detail => detail.message);
      return res.status(400).json({ error: 'Validation Failed', messages });
    }

    // Optional: connect to DB if needed
    // await dbConnect();

    // Optional: persist profile or trigger onboarding logic
    // const result = await createProfile(value);

    // Respond with success
    return res.status(200).json({
      message: 'Onboarding submission successful',
      data: value // or result if persisted
    });

  } catch (err) {
    console.error('[Onboarding Submit Error]', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
