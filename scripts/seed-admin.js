const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

// Copy of hashPassword since we can't import TS files easily in node script without setup
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

const dbPath = path.join(process.cwd(), 'psychologist.db');
const db = new sqlite3.Database(dbPath);

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
    console.error('Error: ADMIN_PASSWORD environment variable is required to seed admin user');
    process.exit(1);
}

db.serialize(() => {
    // Check if admin exists
    db.get('SELECT * FROM users WHERE username = ?', [ADMIN_USERNAME], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return;
        }

        if (row) {
            console.log(`Admin user '${ADMIN_USERNAME}' already exists. Skipping.`);
        } else {
            const hashedPassword = hashPassword(ADMIN_PASSWORD);
            db.run('INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)',
                ['1', ADMIN_USERNAME, hashedPassword],
                (err) => {
                    if (err) console.error('Error creating admin:', err);
                    else console.log(`Admin user '${ADMIN_USERNAME}' created successfully.`);
                }
            );
        }
    });
});
