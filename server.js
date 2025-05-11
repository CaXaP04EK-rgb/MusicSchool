const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Настройки подключения к PostgreSQL
const pool = new Pool({
  user: 'ваш_пользователь',
  host: 'localhost',
  database: 'ваша_база',
  password: 'ваш_пароль',
  port: 5432,
});

// Пример API endpoint
app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ваша_таблица');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Добавление данных
app.post('/api/data', async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO ваша_таблица (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Эндпоинты для новостей
app.get('/api/news', async (req, res) => {
  try {
      const { rows } = await pool.query(
          'SELECT id, title, content, status, created_at, updated_at FROM news ORDER BY created_at DESC'
      );
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

app.post('/api/news', async (req, res) => {
  const { title, content, status } = req.body;
  try {
      const { rows } = await pool.query(
          'INSERT INTO news (title, content, status) VALUES ($1, $2, $3) RETURNING *',
          [title, content, status]
      );
      res.json(rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

app.put('/api/news/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, status } = req.body;
  try {
      const { rows } = await pool.query(
          'UPDATE news SET title = $1, content = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
          [title, content, status, id]
      );
      res.json(rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/news', upload.array('files'), async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const files = req.files; // Массив загруженных файлов
        
        // Здесь обработка сохранения новости и файлов в БД
        // ...
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
const db = mysql.createConnection({
  host: 'IP_СЕРВЕРА_БД', // тот самый айпишник
  user: 'логин_БД',
  password: 'пароль_БД',
  database: 'название_БД'
});
