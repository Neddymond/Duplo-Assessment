import * as Joi from 'joi';

export const createBusinessSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.string().required(),
}).options({
  abortEarly: false,
});