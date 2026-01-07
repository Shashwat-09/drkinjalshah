import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'psychologist.db');

// Enable verbose mode for debugging
const sqlite = sqlite3.verbose();

// Helper wrapper to use async/await with sqlite3
export class DB {
    db: sqlite3.Database;

    constructor() {
        this.db = new sqlite.Database(dbPath);
    }

    get(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    all(sql: string, params: any[] = []): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    run(sql: string, params: any[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

// Singleton-ish instance
export const db = new DB();
