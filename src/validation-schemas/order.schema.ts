import * as Joi from 'joi';

export const createOrderSchema = Joi.object({
  source_name: Joi.string().required(),
  quantity: Joi.number().required(),
  business: Joi.string().required(),
  item_type: Joi.string().required(),
  total_money: Joi.object().keys({
    amount: Joi.number().required(),
    currency: Joi.string().required()
  }).required(),
  total_discount_money: Joi.object().keys({
    amount: Joi.number().required(),
    currency: Joi.string().required()
  }).required(),
}).options({
  abortEarly: false,
});

export const getOrderDetailsSchema = Joi.object({
  businessId: Joi.string().required(),
}).options({
  abortEarly: false,
});