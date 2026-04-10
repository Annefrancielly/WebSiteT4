import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().integer().min(1).max(65535).default(3333),

  // allowlist: use vírgula para múltiplos domínios
  CORS_ORIGIN: Joi.string().allow('').default(''),

  SWAGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(true),
  SWAGGER_PATH: Joi.string().default('docs'),

  THROTTLE_TTL_SECONDS: Joi.number().integer().min(10).default(60),
  THROTTLE_LIMIT: Joi.number().integer().min(10).default(120),

  // --- Surf Trips driver ---
  SURF_TRIPS_DRIVER: Joi.when('NODE_ENV', {
    is: 'production',
    then: Joi.string().valid('mysql').required(),
    otherwise: Joi.string().valid('mysql', 'seed').default('seed'),
  }),

  // --- MySQL ---
  DB_HOST: Joi.when('SURF_TRIPS_DRIVER', {
    is: 'mysql',
    then: Joi.string().min(1).required(),
    otherwise: Joi.string().default('127.0.0.1'),
  }),

  DB_PORT: Joi.number().integer().min(1).max(65535).default(3306),

  DB_NAME: Joi.when('SURF_TRIPS_DRIVER', {
    is: 'mysql',
    then: Joi.string().min(1).required(),
    otherwise: Joi.string().allow('').default(''),
  }),

  DB_USER: Joi.when('SURF_TRIPS_DRIVER', {
    is: 'mysql',
    then: Joi.string().min(1).required(),
    otherwise: Joi.string().allow('').default(''),
  }),

  DB_PASSWORD: Joi.string().allow('').default(''),

  DB_CONN_LIMIT: Joi.number().integer().min(1).max(50).default(10),

  DB_CONNECT_TIMEOUT_MS: Joi.number()
    .integer()
    .min(1000)
    .max(60000)
    .default(5000),
});
