export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
  },
});
