const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(process.cwd(), '.env.local');

try {
    let content = '';
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    } else {
        console.log('.env.local not found, creating new one.');
    }

    // Generate valid 32-byte key (64 hex chars)
    const newKey = crypto.randomBytes(32).toString('hex');
    console.log('Generated new key:', newKey);

    const keyLine = `ENCRYPTION_KEY=${newKey}`;

    // Check if key exists
    if (content.includes('ENCRYPTION_KEY=')) {
        // Replace existing line
        content = content.replace(/ENCRYPTION_KEY=.*/g, keyLine);
        console.log('Replaced existing ENCRYPTION_KEY.');
    } else {
        // Append
        content += `\n${keyLine}\n`;
        console.log('Appended new ENCRYPTION_KEY.');
    }

    fs.writeFileSync(envPath, content, 'utf8');
    console.log('Successfully updated .env.local');

} catch (err) {
    console.error('Error updating .env.local:', err);
    process.exit(1);
}
