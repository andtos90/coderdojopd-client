/* @flow */

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_ENV_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_ENV_PRODUCTION: process.env.NODE_ENV === 'production',
  BASE_PATH: process.env.BASE_PATH || '/',
  IS_STAGING: process.env.IS_STAGING || 'true',
  PARSE_APP_ID: process.env.PARSE_APP_ID || 'DEV_APP_ID',
  PARSE_SERVER_URL: process.env.PARSE_SERVER_URL || 'http://localhost:1337/api',
};
