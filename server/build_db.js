import sqlite3 from "sqlite3";
import fs from "fs";

const sqlFilePath = "Chinook_Sqlite.sql";
const databaseName = "Chinook.db";

const db = new sqlite3.Database(databaseName);

const sqlScript = fs.readFileSync(sqlFilePath, "utf-8");

db.exec(sqlScript, function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database created");
  }
  db.close();
});
