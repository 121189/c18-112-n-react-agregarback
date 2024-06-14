const express = require('express');
const router = express.Router();
const multer = require('multer');


// Multer config for images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Guardar los archivos en la carpeta "uploads"
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Mantener el nombre original del archivo
    }
});

const upload = multer({ storage: storage });


const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.get("/passwordReset", userController.passwordResetToken);
router.patch("/passwordReset", userController.passwordReset);

/* Rutas Basicas del CRUD */
router.post("", userController.createUser);
router.get("", authenticate, userController.findAllUsers);
router.post("/:id/:page?", authenticate, userController.findUser);
router.put("/:id", authenticate,upload.single('image'), userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

//Followers and followed controller
router.post("/:id/follow/user", authenticate, userController.follow);
router.delete("/:id/follow", authenticate, userController.unfollow);
//Gets a user's favorites list
router.get("/favorites", authenticate, userController.getFavorites);

module.exports = router;