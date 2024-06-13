const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.get("/passwordReset", userController.passwordResetToken);
router.patch("/passwordReset", userController.passwordReset);

/* Rutas Basicas del CRUD */
router.post("", userController.createUser);
router.get("", authenticate, userController.findAllUsers);
//autenticate
router.get("/:id", authenticate, userController.findUser);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

//Followers and followed controller
router.post("/:id/follow", authenticate, userController.follow);
router.delete("/:id/follow", authenticate, userController.unfollow);
//Gets a user's favorites list
router.get("/favorites", authenticate, userController.getFavorites);

module.exports = router;