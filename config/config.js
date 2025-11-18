module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "ivodocker_dev",
    host: process.env.DB_HOST || "mysql-dev",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "ivodocker_prod",
    host: process.env.DB_HOST || "mysql-prod",
    dialect: "mysql"
  }
};