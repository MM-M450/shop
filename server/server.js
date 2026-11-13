require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT p.id, p.title, p.price, p.stock, c.name AS category
       FROM products p
       JOIN categories c ON c.id = p.category_id
       ORDER BY p.id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const categories = [
  { id: 1, name: "Электроника" },
  { id: 2, name: "Одежда" },
  { id: 3, name: "Книги" }
];

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.listen(process.env.PORT, () => {
  console.log('Сервер запущен: http://localhost:' + process.env.PORT);
});