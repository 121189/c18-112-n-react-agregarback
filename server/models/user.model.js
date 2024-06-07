const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (val) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
                message: (props) => `${props.value} no es un email válido. Asegúrate de que siga el formato: nombre@dominio.com`,
              },
        },
        password: {
         
            type: String,
            required: true,
            validate: {
              validator: (val) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};:'",.<>/?[\]`|~]).{8,}$/.test(val),
              message:
                "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.",
            },
       
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        image:{
          type: String,
        },
        favorites:{
          type:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Recipes",
            },
          ],
          default: [],
        },
        following:{
          type:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
          default: [],
        },
        followers:{
          type:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
          ],
          default: [],
        },

    }, { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
    message: "Email {VALUE} ya está registrado",
  });
  
  UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));
  UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Las contraseñas no coinciden");
    }
    next();
  });
  
  UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  });
  
  UserSchema.pre(["findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash;
        next();
      } catch (error) {
        next(error);
      }
    }
    next();
  });
  
const User = new mongoose.model("User", UserSchema);
module.exports = User;