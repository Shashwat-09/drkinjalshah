const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'drkinjalshah.db');
const db = new sqlite3.Database(dbPath);

console.log('Adding payment columns to appointments table...\n');

db.serialize(() => {
    // Add payment_id column
    db.run("ALTER TABLE appointments ADD COLUMN payment_id TEXT;", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('✅ payment_id column already exists');
            } else {
                console.error('❌ Error adding payment_id:', err.message);
            }
        } else {
            console.log('✅ Added payment_id column');
        }
    });

    // Add payment_status column
    db.run("ALTER TABLE appointments ADD COLUMN payment_status TEXT;", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('✅ payment_status column already exists');
            } else {
                console.error('❌ Error adding payment_status:', err.message);
            }
        } else {
            console.log('✅ Added payment_status column');
        }
    });

    // Verify the changes
    setTimeout(() => {
        db.all("PRAGMA table_info(appointments);", [], (err, rows) => {
            if (err) {
                console.error('Error checking schema:', err);
                db.close();
                return;
            }

            console.log('\n✅ Updated schema:');
            console.log('================================');
            rows.forEach(row => {
                const marker = (row.name === 'payment_id' || row.name === 'payment_status') ? '  ← NEW' : '';
                console.log(`${row.name.padEnd(30)} ${row.type.padEnd(15)}${marker}`);
            });

            db.close();
            console.log('\n🎉 Database migration complete!');
        });
    }, 500);
});
