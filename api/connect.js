import mysql from "mysql";

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Deyasaleh@12",
  database:"social"
})