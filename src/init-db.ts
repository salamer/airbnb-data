// This script initializes the database by creating the schema and synchronizing the tables

import { AppDataSource, schema, House } from './models';

export async function initializeDatabase() {
  console.log('Initializing database...');
  // connect to the database
  await AppDataSource.initialize();

  // create schema if it doesn't exist
  console.log(`Creating schema: ${schema}`);
  await AppDataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);

  // synchronize the database schema
  // This will create the tables if they don't exist
  console.log('Synchronizing database schema...');
  await AppDataSource.synchronize();

  // create gin index for houses table
  // use for full-text search on the caption column
  await AppDataSource.query(`
        CREATE INDEX IF NOT EXISTS airbnb_houses_search_vector_idx
        ON ${schema}.houses USING gin (to_tsvector('english', address));
    `);
}
// This function will be called when the script is run
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });
