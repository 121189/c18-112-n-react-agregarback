const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// Controladores básicos de CRUD
module.exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const newUser = await User.create(req.body);
        res.status(200);
        res.json({ user: newUser });
        //const emailResponse = sendConfirmationEmail(req.body.email);
    } catch (error) {
        res.status(500);
        res.json(error);

    }
};


