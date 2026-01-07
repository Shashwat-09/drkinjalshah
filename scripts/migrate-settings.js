const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'psychologist.db');
const db = new sqlite3.Database(dbPath);

const createTableQuery = `
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

const defaultSettings = [
    { key: 'practice_name', value: 'Dr. Kinjal Shah' },
    { key: 'email', value: 'contact@drkinjalshah.com' },
    { key: 'phone', value: '+91-9876543210' },
    { key: 'consultation_fee', value: '500' },
    { key: 'session_duration', value: '60' }
];

db.serialize(() => {
    // 1. Create Table
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Settings table created (or exists).');

        // 2. Seed Defaults (if not exists)
        const stmt = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');

        defaultSettings.forEach(setting => {
            stmt.run(setting.key, setting.value);
        });

        stmt.finalize(() => {
            console.log('Default settings seeded.');
            db.close(); // Close inside the callback
        });
    });
});
