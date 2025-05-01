import { PGlite } from '@electric-sql/pglite';

let db = null;

export const initDb = async () => {
  try {
    db = new PGlite('idb://patient_db', { relaxedDurability: true });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        dob DATE NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);
    
    console.log('Database initialized and ready');
  } catch (error) {
    console.error('Database initialization error:', error);

    if (error.message?.includes('Invalid FS bundle size')) {
      indexedDB.deleteDatabase('patient_db');
      console.warn('Corrupted DB deleted. Please refresh the page.');
    }

    throw error;
  }
};

export const getDb = () => {
  if (!db) {
    console.error('Database is not initialized.');
    throw new Error('Database is not initialized. Call initDb() first.');
  }
  return db;
};


