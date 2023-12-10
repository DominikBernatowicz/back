// const express = require('express');
// const cors = require('cors');
// const sqlite3 = require('sqlite3').verbose();

// const app = express();
// const port = 3002;

// const db = new sqlite3.Database('mydatabase.db');

// app.use(express.json());
// app.use(cors());

// // Utwórz tabelę, jeśli nie istnieje o nazwie measurement
// // db.run(
// //     'CREATE TABLE IF NOT EXISTS measurement (id INTEGER PRIMARY KEY AUTOINCREMENT, U1 TEXT, U2 TEXT, I1 TEXT, I2 TEXT, P1 TEXT, P2 TEXT, timestamp)',
// //     (err) => {
// //         if (err) {
// //             console.error('Błąd przy tworzeniu tabeli:', err.message);
// //         } else {
// //             console.log('Tabela utworzona pomyślnie.');
// //         }
// //     }
// // );

// // Endpoint GET - Pobierz dane
// app.get('/data', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     db.all('SELECT * FROM measurement', (err, rows) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else {
//             res.json(rows);
//         }
//     });
// });

// // Endpoint GET - Pobierz dane z przedziału czasowego
// app.get('/data', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
    
//     const { dateFrom, dateTo } = req.query;

//     console.log('wykonuję pobieranie')
//     // Sprawdź, czy obie daty są dostarczone w poprawnym formacie
//     if (!isValidDate(dateFrom) || !isValidDate(dateTo)) {
//         return res.status(400).send('Invalid date format. Please use YYYY-MMM-DD.');
//     }

//     db.all(
//         'SELECT * FROM measurement WHERE timestamp >= ? AND timestamp <= ?',
//         [dateFrom, dateTo],
//         (err, rows) => {
//             if (err) {
//                 res.status(500).send(err.message);
//             } else {
//                 res.json(rows);
//             }
//         }
//     );
// });

// // Funkcja pomocnicza do sprawdzania poprawności formatu daty
// function isValidDate(dateString) {
//     const regex = /^\d{4}-\d{3}-\d{2}$/;
//     console.log('sprawdzam date')
//     return regex.test(dateString);
// }

// // Endpoint POST - Zapisz dane
// app.post('/data', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     const { U1, U2, I1, I2, P1, P2 } = req.body;

//     if (!U1 || !U2 || !I1 || !I2 || !P1 || !P2) {
//         return res.status(400).send('Brak wymaganych danych.');
//     }
//     const timestamp = new Date().toISOString();

//     db.run(
//         'INSERT INTO measurement (U1, U2, I1, I2, P1, P2, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
//         [U1, U2, I1, I2, P1, P2, timestamp],
//         (err) => {
//             if (err) {
//                 res.status(500).send(err.message);
//             } else {
//                 res.send('Dane zostały zapisane.');
//             }
//         }
//     );
// });

// // Endpoint DELETE - Usuń rekord po ID
// app.delete('/data/:id', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     const id = req.params.id;

//     db.run('DELETE FROM measurement WHERE id = ?', [id], (err) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else {
//             res.send(`Rekord o ID ${id} został usunięty.`);
//         }
//     });
// });

// // Endpoint DELETE - Usuń całą zawartość tabeli
// // app.delete('/data', (req, res) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
// //     res.header('Access-Control-Allow-Headers', 'Content-Type');

// //     db.run('DELETE FROM measurement', (err) => {
// //         if (err) {
// //             res.status(500).send(err.message);
// //         } else {
// //             res.send('Cała zawartość tabeli została usunięta.');
// //         }
// //     });
// // });

// // // Endpoint DELETE - Usuń tabelę
// //     db.run('DROP TABLE IF EXISTS mytable', (err) => {
// //         (err) => {
// //             if (err) {
// //                 console.error('Błąd przy usuwaniu tabeli:', err.message);
// //             } else {
// //                 console.log('Tabela usunięta pomyślnie.');
// //             }
// //         }
// //     });

// app.listen(port, () => {
//     console.log(`Serwer działa na porcie ${port}`);
// });
