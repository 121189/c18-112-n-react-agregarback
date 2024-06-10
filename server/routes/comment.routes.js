const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');
const { authenticate } = require('../config/jwt.config');

// Rutas de CRUD
router.post("", authenticate, commentController.createComment);
router.get("/:recipeId", authenticate, commentController.getCommentsByRecipeId);
router.delete("/:id", authenticate, commentController.deleteComment);

module.exports = router;