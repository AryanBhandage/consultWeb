const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres', // default common password
  port: process.env.PG_PORT || 5432,
});

// Initialize database table
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("PostgreSQL table 'survey_responses' initialized.");
  } catch (err) {
    console.error("Error initializing PostgreSQL database:", err);
  }
};
initDB();

app.use(cors());
app.use(express.json());

// Get all responses
app.get('/api/responses', async (req, res) => {
  try {
    const result = await pool.query('SELECT data, created_at FROM survey_responses ORDER BY created_at DESC');
    const responses = result.rows.map(row => ({
      ...row.data,
      timestamp: row.created_at
    }));
    res.json(responses);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Failed to read data from database" });
  }
});

// Add a new response
app.post('/api/responses', async (req, res) => {
  try {
    const newResponse = req.body;
    
    await pool.query(
      'INSERT INTO survey_responses (data) VALUES ($1)',
      [newResponse]
    );
    
    res.status(201).json({ message: "Response saved successfully", response: newResponse });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data to database" });
  }
});

app.listen(PORT, () => {
  console.log(`Logiveda Backend running on http://localhost:${PORT}`);
});
