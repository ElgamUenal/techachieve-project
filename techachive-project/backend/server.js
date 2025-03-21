// Statt require()
import express from 'express';
import cors from 'cors';
import pkg from 'pg';  // Standardimport für CommonJS-Module
const { Pool } = pkg;  // Extrahiere den Pool aus dem Standardimport
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const app = express();
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
const port = 3000;


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

app.get('/angebote', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM angebote');
        const angebote = result.rows.map((angebot) => ({
          ...angebot,
          stunden: parseInt(angebot.stunden, 10), // Stelle sicher, dass Stunden als Ganzzahl angezeigt werden
        }));
        res.json(angebote);
    } catch (err) {
        console.error('Fehler beim Abrufen der Angebote:', err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
  });
  
  
  
  app.post('/angebote', async (req, res) => {
    console.log('📩 Eingehende Angebotsdaten:', req.body);
  
    let { name, fach, beschreibung, preis, stunden } = req.body;
  
    // ❌ Überprüfen, ob alle Felder vorhanden sind
    if (!name || !fach || !beschreibung || !preis || !stunden) {
        return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
    }
  
    // 🔄 `preis` und `stunden` in Zahlen umwandeln
    preis = parseFloat(preis);
    stunden = parseInt(stunden);
  
    if (isNaN(preis)) {
        return res.status(400).json({ error: 'Preis muss eine gültige Zahl sein' });
    }
    if (isNaN(stunden) || stunden <= 0) {
        return res.status(400).json({ error: 'Stunden müssen eine gültige positive Zahl sein' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO angebote (name, fach, preis, beschreibung, stunden) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, fach, preis, beschreibung, stunden]
    );
  
  
        console.log('✅ Neues Angebot gespeichert:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('❌ Fehler beim Hinzufügen:', error.message);
        res.status(500).json({ error: 'Interner Serverfehler', details: error.message });
    }
  });
  
  app.delete('/angebote/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        const result = await pool.query('DELETE FROM angebote WHERE id = $1 RETURNING *', [id]);
  
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        }
  
        res.json({ message: 'Eintrag erfolgreich gelöscht', deleted: result.rows[0] });
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
  });
  
  
  
  
  // 📌 Nachhilfeanfragen abrufen (GET)
  app.get('/nachhilfeanfragen', async (req, res) => {
      try {
          const result = await pool.query('SELECT * FROM nachhilfeanfragen');
          res.json(result.rows);
      } catch (err) {
          console.error('Fehler beim Abrufen der Nachhilfeanfragen:', err.message);
          res.status(500).json({ error: 'Fehler beim Abrufen der Daten', details: err.message });
      }
  });
  
  // 📌 Nachhilfeanfrage hinzufügen (POST)
  app.post('/nachhilfeanfragen', async (req, res) => {
      console.log('📩 Eingehende Anfrage:', req.body);
  
      const { name, fach, beschreibung, budget } = req.body;
  
      // ❌ Falls ein Feld fehlt, Fehler zurückgeben
      if (!name || !fach || !beschreibung || !budget) {
          return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
      }
  
      try {
          const result = await pool.query(
              'INSERT INTO nachhilfeanfragen (name, fach, beschreibung, budget) VALUES ($1, $2, $3, $4) RETURNING *',
              [name, fach, beschreibung, budget]
          );
  
          console.log('✅ Neue Anfrage gespeichert:', result.rows[0]);
          res.status(201).json(result.rows[0]);
      } catch (error) {
          console.error('❌ Fehler beim Hinzufügen:', error.message);
          res.status(500).json({ error: 'Interner Serverfehler', details: error.message });
      }
  });
  
  // 📌 Nachhilfeanfrage löschen (DELETE)
  app.delete('/nachhilfeanfragen/:id', async (req, res) => {
      const { id } = req.params;
  
      // ❌ Falls die ID ungültig ist, Fehler zurückgeben
      if (!id || isNaN(id)) {
          return res.status(400).json({ error: 'Ungültige ID' });
      }
  
      try {
          const result = await pool.query('DELETE FROM nachhilfeanfragen WHERE id = $1 RETURNING *', [id]);
  
          if (result.rowCount === 0) {
              return res.status(404).json({ error: 'Eintrag nicht gefunden' });
          }
  
          console.log('🗑️ Eintrag gelöscht:', result.rows[0]);
          res.json({ message: 'Eintrag erfolgreich gelöscht', deleted: result.rows[0] });
      } catch (error) {
          console.error('❌ Fehler beim Löschen:', error.message);
          res.status(500).json({ error: 'Interner Serverfehler', details: error.message });
      }
  });
  
  
  app.put('/angebote/:id/reduce', async (req, res) => {
    const { id } = req.params;
    const { stunden } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE angebote SET stunden = $1 WHERE id = $2 RETURNING *',
        [stunden, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Angebot nicht gefunden' });
      }
  
      res.json({ message: 'Stunden erfolgreich reduziert', updated: result.rows[0] });
    } catch (error) {
      console.error('Fehler beim Reduzieren der Stunden:', error.message);
      res.status(500).json({ error: 'Fehler beim Reduzieren der Stunden' });
    }
  });
  
  
  const SECRET_KEY = 'dein_geheimer_schluessel';

  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        res.json({ success: true, userId: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Fehler bei der Registrierung' });
    }
});




app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Falsche Anmeldedaten' });
        }

        const user = userResult.rows[0];
        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ success: false, message: 'Falsches Passwort' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, userId: user.id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Fehler beim Login' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username FROM users');
        res.json({ success: true, users: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Fehler beim Abrufen der Benutzer' });
    }
});

app.get('/validateToken', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ success: true, userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ success: false });
    }
});





app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
