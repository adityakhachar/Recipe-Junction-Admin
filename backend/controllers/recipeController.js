const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const Nutrition = require('../models/Nutrition');
const Instructions = require('../models/Instructions');
const Ingredients = require('../models/Ingredients');
const mongoose = require('mongoose');
// Controller function to add a new recipe
exports.addRecipe = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const { step1Data, step2Data, step3Data, step4Data, step5Data } = req.body;

      // Validate and insert recipe
      const recipe = new Recipe({
          name: step1Data.name,
          images: step1Data.images,
          description: step1Data.description,
          youtube_link: step1Data.youtube_link,
          cook_time: step1Data.cook_time,
          prep_time: step1Data.prep_time,
          serving_persons: step1Data.serving_persons,
          difficulty: step1Data.difficulty
      });

      const savedRecipe = await recipe.save({ session });

      // Validate and insert categories
      const category = new Category({
          recipe: savedRecipe._id,
          cuisine_type: step2Data.cuisine_type,
          dietary: step2Data.dietary,
          meal_type: step2Data.meal_type
      });

      const savedCategory = await category.save({ session });

      // Validate and insert nutrition
      const nutrition = new Nutrition({
          recipe: savedRecipe._id,
          serving: step3Data.serving,
          calories: step3Data.calories
      });

      const savedNutrition = await nutrition.save({ session });

      // Validate and insert instructions
      const instructions = new Instructions({
          recipe: savedRecipe._id,
          instructions: step4Data.instructions,
          notes: step4Data.notes
      });

      const savedInstructions = await instructions.save({ session });

      // Validate and insert ingredients
      const ingredients = new Ingredients({
          recipe: savedRecipe._id,
          ingredients: step5Data.ingredients
      });

      const savedIngredients = await ingredients.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ message: 'Recipe saved successfully!' });
  } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Transaction aborted due to error:', error);

      if (error.name === 'ValidationError') {
          const errors = Object.keys(error.errors).map(key => ({
              field: key,
              message: error.errors[key].message
          }));

          return res.status(400).json({ errors });
      }

      res.status(500).json({ message: 'Failed to save recipe. Please try again later.' });
  }
};
// exports.addRecipe = async () => {
//     // Example data from local storage or frontend steps
//     const step1Data = JSON.parse(localStorage.getItem('step1Data'));
//     const step2Data = JSON.parse(localStorage.getItem('step2Data'));
//     const step3Data = JSON.parse(localStorage.getItem('step3Data'));
//     const step4Data = JSON.parse(localStorage.getItem('step4Data'));
//     const step5Data = JSON.parse(localStorage.getItem('step5Data'));
  
//     const session = await mongoose.startSession();
//     session.startTransaction();
  
//     try {
//       // Insert Recipe document
//       const recipe = new Recipe({
//         name: step1Data.name,
//         images: step1Data.images,
//         description: step1Data.description,
//         youtube_link: step1Data.youtube_link,
//         cook_time: step1Data.cook_time,
//         prep_time: step1Data.prep_time,
//         serving_persons: step1Data.serving_persons,
//         difficulty: step1Data.difficulty,
//         categories: [] // This will be populated after category insertion
//       });
  
//       const savedRecipe = await recipe.save({ session });
  
//       // Insert Category document
//       const category = new Category({
//         recipe: savedRecipe._id,
//         cuisine_type: step2Data.cuisine_type,
//         dietary: step2Data.dietary,
//         meal_type: step2Data.meal_type
//       });
  
//       const savedCategory = await category.save({ session });
  
//       // Insert Nutrition document
//       const nutrition = new Nutrition({
//         recipe: savedRecipe._id,
//         serving: step3Data.serving,
//         calories: step3Data.calories
//       });
  
//       const savedNutrition = await nutrition.save({ session });
  
//       // Insert Instructions document
//       const instructions = new Instructions({
//         recipe: savedRecipe._id,
//         instructions: step4Data.instructions,
//         notes: step4Data.notes
//       });
  
//       const savedInstructions = await instructions.save({ session });
  
//       // Insert Ingredients document
//       const ingredients = new Ingredients({
//         recipe: savedRecipe._id,
//         ingredients: step5Data.ingredients
//       });
  
//       const savedIngredients = await ingredients.save({ session });
  
//       // Add the category ID to the recipe document
//       savedRecipe.categories.push(savedCategory._id);
//       await savedRecipe.save({ session });
  
//       // Commit the transaction
//       await session.commitTransaction();
//       session.endSession();
  
//       console.log('All documents saved successfully!');
//     } catch (error) {
//       // If any error occurs, abort the transaction
//       await session.abortTransaction();
//       session.endSession();
//       console.error('Transaction aborted due to error:', error);
//     }
//   };
  
  // Call the function to insert data
  // insertRecipeData();
  