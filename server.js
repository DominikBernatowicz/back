const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3002;

const pool = new Pool({
  user: 'dominik',
  database: 'bd_dyplom',
  password: 'pracadyplomowa',
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Endpoint GET - Pobierz dane
app.get('/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM measurement');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint GET - Pobierz dane z przedziału czasowego
app.get('/data/range', async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;

    // Sprawdź, czy obie daty są dostarczone w poprawnym formacie
    if (!isValidDate(dateFrom) || !isValidDate(dateTo)) {
      return res.status(400).send('Invalid date format. Please use YYYY-MM-DD.');
    }

    const { rows } = await pool.query(
      'SELECT * FROM measurement WHERE timestamp >= $1 AND timestamp <= $2',
      [dateFrom, dateTo]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint POST - Zapisz dane
app.post('/data', async (req, res) => {
  const { U1, U2, I1, I2, P1, P2 } = req.body;

  if (!U1 || !U2 || !I1 || !I2 || !P1 || !P2) {
    return res.status(400).send('Brak wymaganych danych.');
  }

  const timestamp = new Date().toISOString();

  try {
    await pool.query(
      'INSERT INTO measurement (U1, U2, I1, I2, P1, P2, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [U1, U2, I1, I2, P1, P2, timestamp]
    );
    res.send('Dane zostały zapisane.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint DELETE - Usuń rekord po ID
app.delete('/data/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM measurement WHERE id = $1', [id]);
    res.send(`Rekord o ID ${id} został usunięty.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Funkcja pomocnicza do sprawdzania poprawności formatu daty
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
