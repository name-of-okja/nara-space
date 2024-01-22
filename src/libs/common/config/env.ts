import * as dotenv from 'dotenv';

dotenv.config();

function required(key: string, defaultValue: string | undefined = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`[${key}] Not Found Config Data`);
  }

  return value;
}

export const env = {
  port: required('PORT'),
  db: {
    host: required('DB_HOST'),
    port: required('DB_PORT'),
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_DATABASE'),
  },
};
