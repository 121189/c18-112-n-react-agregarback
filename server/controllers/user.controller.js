const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { sendConfirmationEmail, sendPasswordToken } = require("../config/email.config");
const PasswordToken = require("../models/passwordToken.model");
const secretKey = process.env.JWT_SECRET_KEY;
const { generateTempToken } = require("../util/generateToken");
const Recipe = require("../models/recipe.model");
// Controladores básicos de CRUD
module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200);
    res.json({ user: newUser });
    const emailResponse = sendConfirmationEmail(req.body.email);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);

  }
};
module.exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
module.exports.findUser = async (req, res) => {
  const userId = req.body.userId; // ID del usuario logueado
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("followers").populate("following");
    let filter = { owner: req.params.id }
    let sort = {
      createdAt: -1,
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
      .skip(skip)
      .limit(limit)
      .sort(sort);


    if (user) {

      const isFollowing = user.followers.some(follower => follower._id.toString() === userId);
      const total = await Recipe.countDocuments(filter)
      const pages = Math.ceil(total / limit)

      res.status(200);
      res.json({ user, total, ok: true, recipes, page, pages, followersQty: user.followers.length, followingQty: user.following.length, isFollowing });
      return;
    }
    res.status(404);
    res.json({ error: "User not found" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200);
    res.json(updatedUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200);
    res.json(deletedUser);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};
// Get list of favorite recipes
module.exports.getFavorites = async (req, res) => {
  try {
    const userId = req.body.userId; // ID del usuario logueado
    const user = await User.find({ _id: userId });
    if (user) {
      res.status(200);
      res.json(user.favorites);
      console.log(user.favorites);
      return;
    }
    res.status(404);
    res.json({ error: "User not found" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};


//   MÉTODOS DE LOGIN
module.exports.login = async (req, res) => {
  try {
    /* Buscar el usuario */
    const user = await User.findOne({ email: req.body.email });
    /* Si no existe paro y retorno resultado */
    if (user === null) {
      res.status(404);
      res.json({
        errors: {
          email: {
            message: "user not found",
          },
        },
      });
      return;
    }
    /* Si existe revisamos contraseñas */
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    /* Si contraseña no coincide paro y retorno resultado */
    if (validatePassword === false) {
      res.status(400);
      res.json({
        errors: {
          password: {
            message: "Wrong Password",
          },
        },
      });
      return;
    }
    /* Si contraseña ok generar jwt y cookie */
    const newJWT = jwt.sign(
      {
        _id: user._id,
      },
      secretKey,
      { expiresIn: "10y" }
    );

    res.cookie("userToken", newJWT, { httpOnly: true });
    res.status(200);
    res.json({ user, accessToken: newJWT });
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};
module.exports.cookie = async (req, res) => {
  try {
    res.cookie("mycookie", "mydata", { httpOnly: true })
    res.json({ message: "ok" })
  } catch (error) {
    res.json(error)
  }
}
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("userToken");
    res.status(200);
    res.json({ msg: "Logout successful." });
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};

// Reset Password
module.exports.passwordResetToken = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404);
      res.json({ error: "Usuario no encontrado" });
      return;
    }
    const token = await PasswordToken.findOne({ user: user._id });
    if (token) {
      await PasswordToken.deleteOne({ _id: token._id });
    }
    const rawToken = generateTempToken(6);
    const newToken = await PasswordToken.create({ token: rawToken, user: user._id, valid: true });
    const emailToken = await sendPasswordToken({ user: user, token: rawToken });
    res.status(200);
    res.json(newToken);
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error
        },
      },
    });
  }
}

module.exports.passwordReset = async (req, res) => {
  const { email, password, token } = req.body;
  const data = {
    password
  }
  console.log(email, password, token);
  try {
    /* Busca el usuario por email */
    const user = await User.findOne({ email: email });
    /* Si no existe finaliza */
    if (!user) {
      res.status(404);
      res.json({ error: "Usuario no encontrado" });
      return;
    }
    /* Busca si el usuario tiene token activo */
    const activeToken = await PasswordToken.findOne({ user: user._id });
    console.log("User _id: " + user._id);
    console.log("Token : " + token);
    console.log("Token encontrado: " + activeToken);
    /* Si no hay token o el token ya no es válido */
    if (!activeToken || !activeToken.valid) {
      res.status(401);
      res.json({ error: "Token Expired" });
      return;
    }
    /* Valida el token ingresado con el hash de la DB */
    const validate = await bcrypt.compare(token, activeToken.token);
    /* Si no concuerdan, Finaliza */
    if (!validate) {
      res.status(401);
      res.json({ error: "Invalid Token" });
      return;
    }

    /* Actualizacion de contraseña */
    const userPatch = await User.findOneAndUpdate({ email: email }, data, { new: true, runValidators: true });
    /* Quema el token ( lo vuelve inválido) */
    const tokenPatch = await PasswordToken.findOneAndUpdate({ user: user._id }, { valid: false }, { new: true, runValidators: true });
    console.log(tokenPatch);
    res.status(200);
    res.json(userPatch);
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error
        }
      }
    });
  }
}

//FOLLOWERS AND FOLLOWERS CONTROLLER

//Followers and followed controller
module.exports.follow = async (req, res) => {
  try {
    const followerId = req.body.userId; // ID del usuario logueado
    const followingId = req.params.id;  // ID del usuario a seguir

    if (followerId === followingId) {
      res.status(400).json({ error: "No puedes seguirte a ti mismo" });
      return;
    }

    // Encuentra los usuarios
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // Verifica que las listas existan
    if (!follower.following) {
      follower.following = [];
    }
    if (!following.followers) {
      following.followers = [];
    }

    // Verifica si ya está siguiendo
    if (follower.following.includes(followingId)) {
      res.status(400).json({ error: "Ya estás siguiendo a este usuario" });
      return;
    }

    // Actualiza las listas
    await User.updateOne(
      { _id: followerId },
      { $push: { following: followingId } }
    );

    await User.updateOne(
      { _id: followingId },
      { $push: { followers: followerId } }
    );


    res.status(200).json({ message: "Siguiendo con éxito", ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Unfollow a user
module.exports.unfollow = async (req, res) => {
  try {
    const followerId = req.body.userId; // ID del usuario logueado
    const followingId = req.params.id;  // ID del usuario a seguir
    if (followerId === followingId) {
      res.status(400).json({ error: "No puedes dejar de seguirte a ti mismo" });
      return;
    }
    // Encuentra los usuarios
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    // Verifica que las listas existan
    if (!follower.following) {
      follower.following = [];
    }
    if (!following.followers) {
      following.followers = [];
    }

    // Verifica si ya está siguiendo
    if (!follower.following.includes(followingId)) {
      res.status(400).json({ error: "No estás siguiendo a este usuario" });
      return;
    }
    // Actualiza las listas
    await User.updateOne(
      { _id: followerId },
      { $pull: { following: followingId } }
    );
    await User.updateOne(
      { _id: followingId },
      { $pull: { followers: followerId } }
    );
    return res.status(200).json({ message: "Dejaste de seguir a este usuario", ok: true });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}



