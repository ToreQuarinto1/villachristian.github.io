const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Qui diciamo a Express di cercare file statici (HTML, CSS, immagini) nella cartella "public"
app.use(express.static('public'));

// Route per la homepage: quando l'utente va su /, serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/api/menu', (req, res) => {
  fs.readFile('menu.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file menu.json:', err);
      res.status(500).send('Errore del server');
      return;
    }

    const menu = JSON.parse(data);
    res.json(menu);
  });
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
