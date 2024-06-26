const Recipe = require("../models/recipe.model")
const mongoose = require("mongoose")
const User = require("../models/user.model")
const Recipes = require("../models/recipe.model")

// Create a new recipe
module.exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body)
    newRecipe.owner = req.body.userId
    await newRecipe.save()
    res.status(200)
    res.json(newRecipe)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Find all recipes
module.exports.findAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200)
    res.json(recipes)
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  }
}

//find all filtered recipes with paginator, 6 recipes per page and send the total of pages and actual page size
module.exports.searchRecipes = async (req, res) => {
  try {
    const {
      ingredientsQty,
      portionsQty,
      maxDuration,
      orderBy,
      order,
      keywords,
    } = req.body
    let filter = {}
    let sort = {
      createdAt: -1,
    }
    if (orderBy && order) {
      if (orderBy === "title") {
        sort = { title: order }
      }
      if (orderBy === "duration") {
        sort = { duration: order }
      }
    }
    if (ingredientsQty) {
      filter.ingredients = { $size: ingredientsQty }
    }

    if (portionsQty) {
      filter.portions = portionsQty
    }

    if (maxDuration) {
      filter.duration = { $lte: maxDuration }
    }
    if (keywords) {
      filter.title = { $regex: keywords, $options: "i" }
    }
    const page = parseInt(req.params.page || 1)
    let limit = 6
    const total = await Recipe.countDocuments(filter)
    if (!req.params.page) {
      limit = total
    }
    const pages = Math.ceil(total / limit)
    const skip = (page - 1) * limit

    const recipes = await Recipe.find(filter)
      .collation({ locale: "en", strength: 2 })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("owner")
    res.status(200)
    res.json({ recipes, pages, page, total })
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  }
}

// Find a recipe by ID
module.exports.findRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id }).populate(
      "owner",
      "_id name email"
    )
    if (recipe) {
      res.status(200)
      res.json(recipe)
      return
    }
    res.status(404)
    res.json({ error: "Recipe not found" })
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  }
}

// Update a recipe by ID
module.exports.updateRecipe = async (req, res) => {
  try {
    let updatedRecipe = await Recipe.findOne({ _id: req.params.id })
    if (updatedRecipe) {
      if (req.body.userId === updatedRecipe.owner.toString()) {
        updatedRecipe = await Recipe.updateOne(
          { _id: req.params.id },
          req.body,
          { new: true }
        )
        res.status(200)
        res.json(updatedRecipe)
      } else {
        res.status(401)
        res.json({ error: "Unauthorized" })
      }
    } else {
      res.status(404)
      res.json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Add a recipe to the user's favorites and add the user's ID to the recipe's favorites
module.exports.addFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    if (!recipe) {
      res.status(404)
      return res.json({ error: "Receta no encontrada" })
    }

    const userId = req.body.userId.toString()
    if (recipe.favorites.includes(userId)) {
      res.status(400)
      return res.json({ error: "Esta receta ya está en tus favoritos" })
    }
    const user = await User.findOne({ _id: userId })
    if (!user) {
      res.status(404)
      return res.json({ error: "Usuario no encontrado" })
    }
    await User.updateOne({ _id: userId }, { $push: { favorites: recipe._id } })
    recipe.favorites.push(userId)
    await recipe.save()
    res.status(200)
    res.json({
      recipe,
      message: "Receta añadida a favoritos",
      ok: true,
      userId: userId,
    })
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  }
}

//Remove a recipe from a user's favorites
module.exports.removeFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    if (!recipe) {
      res.status(404)
      return res.json({ error: "Receta no encontrada" })
    }

    const userId = req.body.userId.toString()
    if (!recipe.favorites.includes(userId)) {
      res.status(400)
      return res.json({ error: "Esta receta no está en tus favoritos" })
    }
    const user = await User.findOne({ _id: userId })
    if (!user) {
      res.status(404)
      return res.json({ error: "Usuario no encontrado" })
    }

    await User.updateOne({ _id: userId }, { $pull: { favorites: recipe._id } })
    recipe.favorites = recipe.favorites.filter(fav => fav.toString() !== userId)
    await recipe.save()
    res.status(200)
    res.json({
      recipe,
      message: "Receta eliminada de favoritos",
      ok: true,
      userId: userId,
    })
  } catch (error) {
    res.status(500)
    res.json({ error: error })
  }
}

//Get list of recipes from followed users with filters
module.exports.getFollowingRecipes = async (req, res) => {
  try {
    const userId = req.body.userId // ID del usuario logueado
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: "ID de usuario no válido" })
      return
    }
    // Encuentra el usuario logueado
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" })
      return
    }
    // Verifica que la lista de seguidos exista y contenga IDs válidos
    if (!user.following || user.following.length === 0) {
      res.status(200).json({ recipes: [] })
      return
    }
    // Asegúrate de que los IDs en la lista de following sean ObjectId válidos
    const followingIds = user.following.filter(id =>
      mongoose.Types.ObjectId.isValid(id)
    )
    if (followingIds.length === 0) {
      res.status(200).json({ recipes: [] })
      return
    }
    const {
      ingredientsQty,
      portionsQty,
      maxDuration,
      orderBy,
      order,
      keywords,
    } = req.body
    let filter = { owner: { $in: followingIds } }
    let sort = {
      createdAt: -1,
    }
    if (orderBy && order) {
      if (orderBy === "title") {
        sort = { title: order }
      }
      if (orderBy === "duration") {
        sort = { duration: order }
      }
    }
    if (ingredientsQty) {
      filter.ingredients = { $size: ingredientsQty }
    }

    if (portionsQty) {
      filter.portions = portionsQty
    }

    if (maxDuration) {
      filter.duration = { $lte: maxDuration }
    }
    if (keywords) {
      filter.title = { $regex: keywords, $options: "i" }
    }
    const page = parseInt(req.params.page)
    const limit = 6
    const skip = (page - 1) * limit
    // Obtener las recetas
    const recipes = await Recipe.find(filter)
      .collation({ locale: "en", strength: 2 })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("owner")
    const total = await Recipe.countDocuments(filter)
    const pages = Math.ceil(total / limit)
    res.status(200).json({ recipes, page, pages, total })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Get list of user's favorite recipes
module.exports.getFavorites = async (req, res) => {
  try {
    const userId = req.body.userId // ID del usuario logueado
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ error: "ID de usuario no válido" })
      return
    }
    // Encuentra el usuario logueado
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" })
      return
    }
    // Verifica que la lista de favoritos exista y contenga IDs válidos
    if (!user.favorites || user.favorites.length === 0) {
      res
        .status(200)
        .json({ recipes: [], message: "No tienes recetas favoritas" })
      return
    }
    const recipes = await Recipe.find()
    const favorites = recipes.filter(recipe =>
      user.favorites.includes(recipe._id.toString())
    )
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Delete recipe
module.exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("owner")
    if (recipe.owner._id.toString() === req.body.userId.toString()) {
      await Recipe.findByIdAndDelete(req.params.id)
      res.status(200)
      res.json({ message: "Receta eliminada" })
    } else {
      res.status(403)
      res.json({ message: "No tienes permiso para eliminar esta receta" })
    }
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}
