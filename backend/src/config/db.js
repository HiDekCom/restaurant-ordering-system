import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
    return;
  }

  console.log("MySQL Connected");
});

export default connection;