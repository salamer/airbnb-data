import dotenv from 'dotenv';

dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'default_super_secret',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,

  // Object Storage Configuration
  OBJECT_STORAGE_ACCESS_KEY_ID: process.env.OBJECT_STORAGE_ACCESS_KEY_ID || '',
  OBJECT_STORAGE_SECRET_ACCESS_KEY:
    process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY || '',
  OBJECT_STORAGE_REGION: process.env.OBJECT_STORAGE_REGION || '',
  OBJECT_STORAGE_BUCKET_NAME: process.env.OBJECT_STORAGE_BUCKET_NAME || '',
  OBJECT_STORAGE_CDN_URL_PREFIX:
    process.env.OBJECT_STORAGE_CDN_URL_PREFIX || '',
  OBJECT_STORAGE_ENDPOINT: process.env.OBJECT_STORAGE_ENDPOINT || '',
};

// Basic validation for essential configs
if (!config.DATABASE_URL) {
  console.error('FATAL ERROR: DATABASE_URL is not defined in .env');
  process.exit(1);
}
if (config.JWT_SECRET === 'default_super_secret') {
  console.warn(
    'WARNING: JWT_SECRET is using a default value. Set a strong secret in your .env file for production.',
  );
}
if (
  !config.OBJECT_STORAGE_ACCESS_KEY_ID ||
  !config.OBJECT_STORAGE_SECRET_ACCESS_KEY ||
  !config.OBJECT_STORAGE_REGION ||
  !config.OBJECT_STORAGE_BUCKET_NAME
) {
  console.warn(
    'WARNING: Object storage configuration is incomplete. Image upload functionality may not work.' +
      ' Please check OBJECT_STORAGE_ACCESS_KEY_ID, OBJECT_STORAGE_SECRET_ACCESS_KEY, OBJECT_STORAGE_REGION, and OBJECT_STORAGE_BUCKET_NAME in your .env file.',
  );
  process.exit(1);
}

export default config;
