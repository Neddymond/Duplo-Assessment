import * as Joi from 'joi';

export const createDepartmentHeadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  business: Joi.string().required(),
  role: Joi.string().required(),
}).options({
  abortEarly: false,
});