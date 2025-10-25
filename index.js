const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./tarefas.db', (err) => {
  if(err) console.error('Erro ao conectar DB:', err);
  else console.log('Banco de dados conectado!');
});

db.run(`CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  data TEXT,
  tipo TEXT,
  status TEXT
)`);

app.get('/tarefas', (req, res) => {
  db.all('SELECT * FROM tarefas', (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/tarefas', (req, res) => {
  const { titulo, data, tipo, status = 'pendente' } = req.body;
  db.run('INSERT INTO tarefas (titulo,data,tipo,status) VALUES (?,?,?,?)',
    [titulo, data, tipo, status],
    function(err) {
      if(err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.put('/tarefas/:id/concluir', (req, res) => {
  const id = req.params.id;
  db.run('UPDATE tarefas SET status=? WHERE id=?', ['concluído', id], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    res.json({ changed: this.changes });
  });
});

app.delete('/tarefas/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tarefas WHERE id=?', [id], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
