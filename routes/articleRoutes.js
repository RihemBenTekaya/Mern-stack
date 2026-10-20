const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controller/articleController');
const { protect } = require('../authMiddleware');

// Consultation publique
router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// Operations d'ecriture protegees par authentification JWT
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
