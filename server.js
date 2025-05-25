import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customer_app',
  password: '1234', // Achte darauf, das später in eine .env-Datei auszulagern!
  port: 5432,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/kunden', async (req, res) => {
  const { nachname, vorname, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO kunden (nachname, vorname, email) VALUES ($1, $2, $3)',
      [nachname, vorname, email]
    );
    res.status(201).send('Kunde gespeichert');
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Speichern');
  }
});

app.get('/api/kunden', async (req, res) => {
  const search = req.query.search || '';
  try {
    const result = await pool.query(
      `SELECT * FROM kunden WHERE 
        nachname ILIKE $1 OR 
        vorname ILIKE $1 OR 
        email ILIKE $1`,
      [`%${search}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Abrufen');
  }
});

app.get('/', (req, res) => {
  res.send('Willkommen zur Kundenverwaltung!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
