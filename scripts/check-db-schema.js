const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'drkinjalshah.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking appointments table schema...\n');

db.all("PRAGMA table_info(appointments);", [], (err, rows) => {
    if (err) {
        console.error('Error:', err);
        db.close();
        return;
    }

    console.log('Columns in appointments table:');
    console.log('================================');
    rows.forEach(row => {
        console.log(`${row.name.padEnd(30)} ${row.type.padEnd(15)} ${row.notnull ? 'NOT NULL' : ''}`);
    });

    console.log('\n');

    // Check if payment columns exist
    const hasPaymentId = rows.some(r => r.name === 'payment_id');
    const hasPaymentStatus = rows.some(r => r.name === 'payment_status');

    if (hasPaymentId && hasPaymentStatus) {
        console.log('✅ Payment columns exist!');
    } else {
        console.log('❌ Payment columns MISSING!');
        if (!hasPaymentId) console.log('   - payment_id column not found');
        if (!hasPaymentStatus) console.log('   - payment_status column not found');
    }

    db.close();
});
