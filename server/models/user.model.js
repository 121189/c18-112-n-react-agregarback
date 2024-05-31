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
                message: "Please enter a valid email",
              },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (val) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};:'",.<>/?[\]`|~]).{8,}$/.test(
                    val
                  ),
                message:
                  "Password must have at least one uppercase, one lowercase, one number, one special character",
              },
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
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