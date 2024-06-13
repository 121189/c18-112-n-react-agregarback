const Comment = require("../models/comment.model")

// Create a new comment
module.exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body)
    newComment.owner = req.body.userId
    await newComment.save()
    res.status(200)
    res.json(newComment)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

//Search comments by recipe id
module.exports.getCommentsByRecipeId = async (req, res) => {
  try {
    const comments = await Comment.find({
      recipe: { _id: req.params.recipeId },
    })
      .populate("owner")
      .populate("recipe")
    res.status(200)
    res.json(comments)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

//Update comment by id
module.exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("owner")
      .populate("recipe")
    if (req.body.userId.toString() === comment.owner._id.toString()) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.status(200)
      res.json(updatedComment)
    } else {
      res.status(403)
      res.json({ message: "No tienes permiso para editar este comentario" })
    }
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

// Delete a comment
module.exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("owner")
      .populate("recipe")
    if (
      comment.recipe.owner.toString() === req.body.userId.toString() ||
      req.body.userId.toString() === comment.owner._id.toString()
    ) {
      await Comment.findByIdAndDelete(req.params.id)
      res.status(200)
      res.json({ message: "Comentario eliminado" })
    } else {
      res.status(403)
      res.json({ message: "No tienes permiso para eliminar este comentario" })
    }
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}
