const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
require('dotenv').config();
require('./config/database.config');

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes
const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);
const sessionRoutes = require('./routes/session.routes');
app.use('/api/session', sessionRoutes);

const recipeRoutes = require('./routes/recipe.routes');
app.use('/api/recipe', recipeRoutes);

const commentRoutes = require('./routes/comment.routes');
app.use('/api/comment', commentRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));
