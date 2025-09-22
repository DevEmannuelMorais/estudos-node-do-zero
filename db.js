// db.js
import postgres from "postgres";
import dotenv from "dotenv";



dotenv.config();


const sql = postgres({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5452,
  database: process.env.DB_NAME || "postgres",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
});

export { sql };
