// lib/validators/onboarding.js

import Joi from 'joi';

export const onboardingSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be under 50 characters'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be valid'
    }),

  bio: Joi.string()
    .max(300)
    .allow('')
    .messages({
      'string.max': 'Bio must be under 300 characters'
    }),

  avatar: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'Avatar must be a valid URL'
    }),

  niche: Joi.array()
    .items(Joi.string().valid('Tech', 'Art', 'Gaming', 'Education', 'Lifestyle'))
    .min(1)
    .max(5)
    .required()
    .messages({
      'array.base': 'Niche must be an array',
      'array.min': 'Select at least one niche',
      'array.max': 'You can select up to 5 niches'
    })
});
