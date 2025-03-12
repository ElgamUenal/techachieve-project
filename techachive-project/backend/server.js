import express from 'express';
import cors from 'cors';
import pkg from 'pg';  // Importiere pg als Default
const { Pool } = pkg;  // Hole die Pool-Klasse

const app = express();
const port = 3000;

// PostgreSQL-Verbindung
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'htl_datenbank',
    password: 'dina',
    port: 5432,
});

app.use(cors());
app.use(express.json());

// Alle Fächer abrufen
app.get('/faecher', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM faecher');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Themen nach Fach-ID abrufen
app.get('/themen/:fachId', async (req, res) => {
    try {
        const { fachId } = req.params;
        const result = await pool.query('SELECT * FROM themen WHERE fach_id = $1', [fachId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Materialien nach Thema-ID abrufen
app.get('/materialien/:themaId', async (req, res) => {
    try {
        const { themaId } = req.params;
        const result = await pool.query('SELECT * FROM materialien WHERE thema_id = $1', [themaId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
