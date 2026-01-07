const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'psychologist.db');
const db = new sqlite3.Database(dbPath);

const schema = [
    `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin'
  )`,
    `CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone_encrypted TEXT,
    email_encrypted TEXT,
    history_encrypted TEXT,
    care_plan TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_visit DATETIME
  )`,
    `CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    patient_name TEXT NOT NULL,
    patient_email_encrypted TEXT,
    patient_phone_encrypted TEXT,
    service_type TEXT NOT NULL,
    date DATETIME NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_id TEXT,
    payment_status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
    `CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    author TEXT,
    rating INTEGER,
    approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
];

function init() {
    console.log('Initializing database...');
    db.serialize(() => {
        schema.forEach((query) => {
            db.run(query, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                }
            });
        });
        console.log('Database initialized successfully at ' + dbPath);
    });
    db.close();
}

init();
