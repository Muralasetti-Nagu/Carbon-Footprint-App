import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Return a promise that resolves when DB is connected
export const connectDB = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error("DB Connection Error:", err);
        reject(err);
      } else {
        console.log("✓ Connected to MySQL DB!");
        resolve();
      }
    });
  });
};

export default db;
