const Recipe = require('../models/recipe.model');


// Create a new recipe
module.exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        newRecipe.owner = req.body.userId;
        await newRecipe.save();
        res.status(200);
        res.json(newRecipe);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

// Find all recipes
module.exports.findAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200);
        res.json(recipes);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

//find all filtered recipes with paginator, 6 recipes per page and send the total of pages and actual page size
module.exports.searchRecipes = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = 6;
        const skip = (page - 1) * limit;
        const recipes = await Recipe.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Recipe.countDocuments();
        const pages = Math.ceil(total / limit);
        res.status(200);
        res.json({ recipes, pages, page });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};



// Find a recipe by ID
module.exports.findRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id });
        if (recipe) {
            res.status(200);
            res.json(recipe);
            return;
        }
        res.status(404);
        res.json({ error: "Recipe not found" });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

// Update a recipe by ID
module.exports.updateRecipe = async (req, res) => {
    try {
        let updatedRecipe = await Recipe.findOne({ _id: req.params.id });
        if (updatedRecipe) {
            if (req.body.userId === updatedRecipe.owner.toString()) {
               updatedRecipe= await Recipe.updateOne({ _id: req.params.id }, req.body,{new:true});
               res.status(200);
               res.json(updatedRecipe);
            }else{
                res.status(401);
                res.json({error:"Unauthorized"});
            }
        }else{
            res.status(404);
            res.json({error:"Recipe not found" });
        }
        } catch (error) {
            res.status(500);
            res.json(error);
        }
    };
    

    // Delete a recipe by ID
    module.exports.deleteRecipe = async (req, res) => {
        try {
            let deletedRecipe = await Recipe.findOne({ _id: req.params.id });
            console.log(req.body.userId, deletedRecipe.owner.toString())
            if(deletedRecipe){
                if (req.body.userId === deletedRecipe.owner.toString()) {
                    deletedRecipe= await Recipe.deleteOne({ _id: req.params.id });
                    res.status(200);
                    res.json(deletedRecipe);
                 }else{
                     res.status(401);
                     res.json({error:"Unauthorized"});
                 }
            }else{
                res.status(404);
                res.json({error:"Recipe not found" });
            }
        } catch (error) {
            res.status(500);
            res.json(error);
        }
    };
