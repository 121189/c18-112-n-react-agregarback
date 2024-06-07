const express = require('express');
const router = express.Router();

const recipesController = require("../controllers/recipe.controller");
const { authenticate } = require('../config/jwt.config');


/*Rutas Basicas del CRUD*/
router.post("", authenticate, recipesController.createRecipe);
router.get("",authenticate,  recipesController.findAllRecipes);
router.get("/:id", authenticate, recipesController.findRecipe);
router.put("/:id", authenticate, recipesController.updateRecipe);
router.delete("/:id", authenticate, recipesController.deleteRecipe);

/*Rutas con funcionalidades adicionales*/
router.post("search", authenticate, recipesController.searchRecipes);

module.exports = router;