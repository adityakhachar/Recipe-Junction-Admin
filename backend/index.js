const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const recipeRoutes = require('./routes/recipeRoutes');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the MERN stack Recipe Junction!');
});

app.use('/api/recipes', recipeRoutes);

// Start server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
  