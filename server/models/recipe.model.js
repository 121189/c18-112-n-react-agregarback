const mongoose = require("mongoose");
const RecipesShema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: true,
    },
    sliderImages:{
        type: [String],
        required: true,
    },
    ingredients:{
        type: [String],
        required: true,
    },
    steps:{
        type: [String],
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    portions:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    favorites:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        default: [],
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true }
);

const Recipes = new mongoose.model("Recipes", RecipesShema);
module.exports = Recipes;
    

    