import { Database } from "bun:sqlite"

const db = new Database("blogdb.sqlite")

export function setupDatabase() {
  // kode untuk set foreign_key agar hidup
  db.exec("PRAGMA foreign_keys = ON;");

  // query untuk membuat tabel categories
  db.exec(`CREATE TABLE IF NOT EXISTS catagories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

  // query untuk membuat tabel users 
  db.exec(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        profileImage VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        password VARCHAR(255) NOT NULL,
        isActive BOOLEAN DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  
  // query untuk membuat tabel blogs
  db.exec(`CREATE TABLE IF NOT EXISTS blogs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryId INTEGER NOT NULL REFERENCES catagories(id),
        userId INTEGER NOT NULL REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        imageUrl VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

export default db;