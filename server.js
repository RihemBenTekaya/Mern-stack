const express = require('express');   // 1. charger la bibliothèque Express

const app = express();                // 2. créer l'application : c'est notre serveur
const PORT = 3000;

app.use(express.json());   // lit le corps JSON et le range dans req.body

// 3. une route : quand un client demande GET /, Express exécute cette fonction
// 3. une route : quand un client demande GET /, Express exécute cette fonction
app.get('/', (req, res) => {
  res.json({ message: "Bonjour, je suis l'API du blog" });
});

app.get('/about', (req, res) => {
  res.json({
    application: 'Mon API Blog',
    nom: 'Rihem',
    version: '1.0.0'
  });
}); 
const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Rihem', email: 'rihem@example.com' },
  { id: 3, name: 'Admin', email: 'admin@example.com' }
];
app.post('/contact', (req, res) => {
  const { email, message } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({
      error: 'L’email et le message sont obligatoires'
    });
  }

  res.status(200).json({
    message: 'Merci, votre message a bien été reçu'
  });
});app.get('/api/users', (req, res) => {
  const { name } = req.query;
  const filteredUsers = name
    ? users.filter(user => user.name === name)
    : users;

  res.json(filteredUsers);
});
app.get('/api/users', (req, res) => {
  res.json(users);
});app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} non trouvé` });
  }

  res.json({ user });
});
const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];
// GET /api/articles?author=Aya -> seulement ceux d'Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;   // = const author = req.query.author;

  let resultat = articles;
  if (author) {                   // si le client a précisé ?author=...
    resultat = articles.filter(a => a.author === author);
  }
  res.json({ total: resultat.length, articles: resultat });
});

// GET /api/articles            -> tous les articles
// GET /api/articles?author=Aya -> seulement ceux d'Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;

  let resultat = articles;
  if (author) {
    resultat = articles.filter(a => a.author === author);
  }

  res.json({ total: resultat.length, articles: resultat });
});

app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} non trouvable` });
  }

  res.json({ article });
});

let prochainId = 4; // le prochain id à attribuer (les ids 1, 2 et 3 existent déjà)
// POST /api/articles -> crée un article avec { "title": "...", "author": "..." }
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Le titre et l\'auteur sont obligatoires' });
  }

  const nouvelArticle = { id: prochainId, title, author };
  prochainId += 1;
  articles.push(nouvelArticle);

  res.status(201).json({ message: 'Article créé', article: nouvelArticle });
});

// 4. démarrer le serveur : il attend les requêtes sur le port 3000
app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});