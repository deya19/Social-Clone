import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host:process.env.HOST_NAME,
  user:process.env.USER_NAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});