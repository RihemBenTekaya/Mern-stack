let articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

let prochainId = 4;

const getAllArticles = (req, res) => {
  const { author } = req.query;
  let resultat = articles;

  if (author) {
    resultat = articles.filter((article) => article.author === author);
  }

  return res.status(200).json({ total: resultat.length, articles: resultat });
};

const getArticleById = (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  return res.status(200).json(article);
};

const createArticle = (req, res) => {
  const { title, author } = req.body || {};

  if (!title || !author) {
    return res.status(400).json({ error: "Le titre et l'auteur sont obligatoires" });
  }

  const nouvelArticle = { id: prochainId, title, author };
  prochainId += 1;
  articles.push(nouvelArticle);

  return res.status(201).json({ message: 'Article créé', article: nouvelArticle });
};

const updateArticle = (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body || {};
  const index = articles.findIndex((article) => article.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  if (title) articles[index].title = title;
  if (author) articles[index].author = author;

  return res.status(200).json({
    message: 'Article mis à jour',
    article: articles[index]
  });
};

const deleteArticle = (req, res) => {
  const id = Number(req.params.id);
  const articleExiste = articles.some((a) => a.id === id);

  if (!articleExiste) {
    return res.status(404).json({ error: `Impossible de supprimer : article ${id} introuvable` });
  }

  articles = articles.filter((a) => a.id !== id);
  return res.status(200).json({ message: `Article ${id} supprimé avec succès` });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};