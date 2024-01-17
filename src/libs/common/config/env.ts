function required(key: string, defaultValue: string | undefined = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`[${key}] Not Found Config Data`);
  }

  return value;
}

export const env = {
  port: required('PORT', '3005'),
  db: {
    host: required('DB_HOST', 'localhost'),
    port: required('DB_PORT', '5432'),
    username: required('DB_USERNAME', 'nara'),
    password: required('DB_PASSWORD', '1234'),
    database: required('DB_DATABASE', 'nara-space'),
  },
};
