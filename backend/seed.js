require('dotenv').config({ path: __dirname + '/.env' });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'Consultancy',
  password: process.env.PG_PASSWORD || 'postgre123',
  port: process.env.PG_PORT || 5432,
});

const dataToInsert = [
  { name: "Rudra", email: "rudra@gmail.com", role: "Student", biggest_challenge: "damn", willing_to_pay: "Yes" },
  { name: "Kevin Tandon", email: "kevin@gmail.com", role: "Logistics Manager", biggest_challenge: "Customer engagement", willing_to_pay: "Yes" },
  { name: "Kevin Tandon", email: "kevin@gmail.com", role: "Logistics Manager", biggest_challenge: "Customer engagement", willing_to_pay: "Yes" },
  { name: "Pallavi sharma", email: "pallavi@gmail.com", role: "Startup Founder", biggest_challenge: "Bad system managment", willing_to_pay: "No" },
  { name: "Atharva Rale", email: "Raleindust@gmail.com", role: "Supplier / Manufacturer", biggest_challenge: "very heavy apps", willing_to_pay: "No" },
  { name: "Sujata Srivasatava", email: "rrkenterprises@yahoo.com", role: "Business Owner", biggest_challenge: "das", willing_to_pay: "No" },
  { name: "Vivek hotchandani", email: "hotchandani@gmail.com", role: "Student", biggest_challenge: "Very costly enterprise solution. No detail dist...", willing_to_pay: "No" },
];

async function seed() {
  try {
    for (const item of dataToInsert) {
      await pool.query(
        'INSERT INTO survey_responses (data, created_at) VALUES ($1, $2)',
        [item, new Date('2026-04-25T10:00:00Z')] // Setting date to 4/25/2026 as per screenshot
      );
    }
    console.log("Successfully inserted data into PostgreSQL!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    pool.end();
  }
}

seed();
