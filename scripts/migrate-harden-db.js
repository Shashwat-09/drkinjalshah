const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

// Helper to decrypt (using same logic as crypto.ts but simplified for node script)
// Note: This requires ENCRYPTION_KEY in env
const ENCRYPTION_KEY_HEX = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY_HEX) {
    console.error('ENCRYPTION_KEY environment variable missing');
    process.exit(1);
}
const ENCRYPTION_KEY = Buffer.from(ENCRYPTION_KEY_HEX, 'hex');

function decrypt(text) {
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (e) {
        return null;
    }
}

function hashEmail(email) {
    return crypto.createHash('sha256').update(email).digest('hex');
}

const dbPath = path.join(process.cwd(), 'psychologist.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. Add patient_email_hash column if not exists
    console.log('Adding patient_email_hash column...');
    db.run('ALTER TABLE appointments ADD COLUMN patient_email_hash TEXT', (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding column:', err);
        } else {
            console.log('Column added (or already exists).');
        }

        // 2. Populate hashes for existing rows
        console.log('Populating existing hashes...');
        db.all('SELECT id, patient_email_encrypted FROM appointments WHERE patient_email_hash IS NULL', [], (err, rows) => {
            if (err) {
                console.error('Error fetching rows:', err);
                return;
            }

            let updatedCount = 0;
            const stmt = db.prepare('UPDATE appointments SET patient_email_hash = ? WHERE id = ?');

            rows.forEach(row => {
                const email = decrypt(row.patient_email_encrypted);
                if (email) {
                    const hash = hashEmail(email);
                    stmt.run(hash, row.id);
                    updatedCount++;
                }
            });
            stmt.finalize();
            console.log(`Updated ${updatedCount} rows with hashes.`);

            // 3. Create Unique Index on (date) to prevent double booking
            // Note: We might want a composite index on (date, time) usually, 
            // but in this app 'date' column stores the full ISO string including time.
            console.log('Creating unique index for race condition prevention...');
            db.run('CREATE UNIQUE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date)', (err) => {
                if (err) console.error('Error creating index:', err);
                else console.log('Unique index created on date.');
            });

            // 4. Create Index on email hash for performance
            console.log('Creating index on email hash...');
            db.run('CREATE INDEX IF NOT EXISTS idx_appointments_email_hash ON appointments(patient_email_hash)', (err) => {
                if (err) console.error('Error creating index:', err);
                else console.log('Index created on patient_email_hash.');
            });
        });
    });
});
