import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const steps = [
  'Recipe Details',
  'Category Information',
  'Add Nutrition Level',
  'Add Instructions',
  'Add Ingredients',
];

export default function ProductsView() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cook_time: '',
    prep_time: '',
    serving_persons: '',
    difficulty: '',
    cuisine_type: [],
    dietary: [],
    meal_type: [],
    nutritionLevels: [{ serving_item_name: '', amount_gm: '' }],
    instructions: [],
    instructionText: '',
    instructionImage: '',
    instructionNotes: '',
    ingredients: []
  });

  const [customCuisine, setCustomCuisine] = useState('');
  const [customDietary, setCustomDietary] = useState('');
  const [customMealType, setCustomMealType] = useState('');

  const [cuisineOptions, setCuisineOptions] = useState([
    'Italian',
    'Indian',
    'Chinese',
    'Japanese',
    'Mexican',
    'French',
    'Mediterranean',
    'Custom',
  ]);

  const [dietaryOptions, setDietaryOptions] = useState([
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Gluten-free',
    'Lactose-free',
    'Sugar-free',
    'Non-vegetarian',
    'Custom',
  ]);

  const [mealTypeOptions, setMealTypeOptions] = useState([
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert',
    'Custom',
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle custom options logic
    let updatedValue = value;
  
    if (name === 'cuisine_type' && value.includes('Custom') && customCuisine) {
      updatedValue = value.filter((option) => option !== 'Custom');
    }
  
    if (name === 'dietary' && value.includes('Custom') && customDietary) {
      updatedValue = value.filter((option) => option !== 'Custom');
    }
  
    if (name === 'meal_type' && value.includes('Custom') && customMealType) {
      updatedValue = value.filter((option) => option !== 'Custom');
    }
  
    if (name.startsWith('nutritionLevels')) {
      const [, index, subFieldName] = name.match(/\[(\d+)\]\.(\w+)/);
      setFormData((prevData) => ({
        ...prevData,
        nutritionLevels: prevData.nutritionLevels.map((item, i) =>
          i === parseInt(index, 10) ? { ...item, [subFieldName]: value } : item
        ),
      }));
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  
  

  const handleCustomCuisineChange = (e) => {
    setCustomCuisine(e.target.value);
  };

  const handleCustomDietaryChange = (e) => {
    setCustomDietary(e.target.value);
  };

  const handleCustomMealTypeChange = (e) => {
    setCustomMealType(e.target.value);
  };

  const handleAddCustomCuisine = () => {
    if (customCuisine && !cuisineOptions.includes(customCuisine) && customCuisine.toLowerCase() !== 'custom') {
      setCuisineOptions((prevOptions) => {
        const filteredOptions = prevOptions.filter((option) => option !== 'Custom');
        return [...filteredOptions, customCuisine];
      });
      setFormData((prevData) => ({
        ...prevData,
        cuisine_type: [...prevData.cuisine_type, customCuisine],
      }));
      setCustomCuisine('');
    }
  };

  const handleAddCustomDietary = () => {
    if (customDietary && !dietaryOptions.includes(customDietary) && customDietary.toLowerCase() !== 'custom') {
      setDietaryOptions((prevOptions) => {
        const filteredOptions = prevOptions.filter((option) => option !== 'Custom');
        return [...filteredOptions, customDietary];
      });
      setFormData((prevData) => ({
        ...prevData,
        dietary: [...prevData.dietary, customDietary],
      }));
      setCustomDietary('');
    }
  };

  const handleAddCustomMealType = () => {
    if (customMealType && !mealTypeOptions.includes(customMealType) && customMealType.toLowerCase() !== 'custom') {
      setMealTypeOptions((prevOptions) => {
        const filteredOptions = prevOptions.filter((option) => option !== 'Custom');
        return [...filteredOptions, customMealType];
      });
      setFormData((prevData) => ({
        ...prevData,
        meal_type: [...prevData.meal_type, customMealType],
      }));
      setCustomMealType('');
    }
  };

  const handleAddMore = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], { serving_item_name: '', amount_gm: '' }],
    }));
  };

  const handleAddInstruction = () => {
    const newInstruction = {
      text: formData.instructionText,
      image: formData.instructionImage,
      notes: formData.instructionNotes,
    };
    setFormData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, newInstruction],
      instructionText: '',
      instructionImage: '',
      instructionNotes: '',
    }));
  };
  
  const handleDeleteInstruction = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      instructions: prevData.instructions.filter((_, i) => i !== index),
    }));
  };
  

  
  
  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, prevData.ingredientText],
      ingredientText: '', // Clear input after adding
    }));
  };

  const handleDeleteIngredient = (index) => {
    setFormData((prevData) => {
      // Ensure prevData.ingredients is an array before filtering
      const updatedIngredients = Array.isArray(prevData.ingredients)
        ? prevData.ingredients.filter((_, i) => i !== index)
        : [];
  
      return {
        ...prevData,
        ingredients: updatedIngredients,
      };
    });
  };

  

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      name: '',
      description: '',
      cook_time: '',
      prep_time: '',
      serving_persons: '',
      difficulty: '',
      cuisine_type: [],
      dietary: [],
      meal_type: [],
      nutritionLevels: [{ serving_item_name: '', amount_gm: '' }],
      instructions: [],
      instructionText: '',
      instructionImage: '',
      instructionNotes: '',
    });
    setCuisineOptions([
      'Italian',
      'Indian',
      'Chinese',
      'Japanese',
      'Mexican',
      'French',
      'Mediterranean',
      'Custom',
    ]);
    setDietaryOptions([
      'Vegan',
      'Vegetarian',
      'Pescatarian',
      'Gluten-free',
      'Lactose-free',
      'Sugar-free',
      'Non-vegetarian',
      'Custom',
    ]);
    setMealTypeOptions(['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Custom']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    handleReset();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6">Step 1: Recipe Details</Typography>
            <TextField
              name="name"
              label="Recipe Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
              required
              helperText="Minimum 200 characters"
            />
            <TextField
              name="cook_time"
              label="Cook Time (minutes)"
              type="number"
              value={formData.cook_time}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="prep_time"
              label="Prep Time (minutes)"
              type="number"
              value={formData.prep_time}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="serving_persons"
              label="Serving Persons"
              type="number"
              value={formData.serving_persons}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="difficulty"
              label="Difficulty"
              select
              value={formData.difficulty}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value="" />
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                color="inherit"
              >
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </>
        );

        case 1:
          return (
            <>
              <Typography variant="h6">Step 2: Category Information</Typography>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Cuisine Type</InputLabel>
                <Select
                  name="cuisine_type"
                  multiple
                  value={formData.cuisine_type}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {cuisineOptions.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formData.cuisine_type.includes('Custom') && (
                <TextField
                  name="custom_cuisine"
                  label="Add Custom Cuisine"
                  value={customCuisine}
                  onChange={handleCustomCuisineChange}
                  fullWidth
                  margin="normal"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomCuisine();
                    }
                  }}
                />
              )}
  
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Dietary Preferences</InputLabel>
                <Select
                  name="dietary"
                  multiple
                  value={formData.dietary}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {dietaryOptions.map((dietary) => (
                    <MenuItem key={dietary} value={dietary}>
                      {dietary}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formData.dietary.includes('Custom') && (
                <TextField
                  name="custom_dietary"
                  label="Add Custom Dietary"
                  value={customDietary}
                  onChange={handleCustomDietaryChange}
                  fullWidth
                  margin="normal"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomDietary();
                    }
                  }}
                />
              )}
  
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Meal Type</InputLabel>
                <Select
                  name="meal_type"
                  multiple
                  value={formData.meal_type}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {mealTypeOptions.map((mealType) => (
                    <MenuItem key={mealType} value={mealType}>
                      {mealType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formData.meal_type.includes('Custom') && (
                <TextField
                  name="custom_meal_type"
                  label="Add Custom Meal Type"
                  value={customMealType}
                  onChange={handleCustomMealTypeChange}
                  fullWidth
                  margin="normal"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomMealType();
                    }
                  }}
                />
              )}
  
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={handleBack} variant="outlined" color="inherit">
                  Back
                </Button>
                <Button onClick={handleNext} variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </>
          );

      case 2:
        return (
          <>
            <Typography variant="h6">Step 3: Add Nutrition Level</Typography>
            {/* {/ Mapping over nutrition levels in formData to display existing entries /} */}
            {formData.nutritionLevels.map((item, index) => (
              <div key={index}>
                <TextField
  name={`nutritionLevels[${index}].serving_item_name`}
  label="Serving Item Name"
  value={item.serving_item_name}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
/>
<TextField
  name={`nutritionLevels[${index}].amount_gm`}
  label="Amount (gm)"
  type="number"
  value={item.amount_gm}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
/>
                {index === formData.nutritionLevels.length - 1 && (
                  <Button
                    onClick={() => handleAddMore('nutritionLevels')}
                    variant="outlined"
                    color="primary"
                  >
                    Add More
                  </Button>
                )}
              </div>
            ))}
            <TextField
              name="calories"
              label="Calories"
              type="number"
              value={formData.calories}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleBack} variant="outlined" color="inherit">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </>
        );

      case 3:
        return (
          <>
            <Typography variant="h6">Step 4: Add Instructions</Typography>
            {/* {/ Instructions list /}
            
            {/ Add new instruction /} */}
            <TextField
              name="instructionText"
              label="Instruction Text"
              value={formData.instructionText}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              name="instructionImage"
              label="Instruction Image URL (Optional)"
              value={formData.instructionImage}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleAddInstruction}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Add Instruction
            </Button>
            <TextField
              name="instructionNotes"
              label="Notes (Optional)"
              value={formData.instructionNotes}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {formData.instructions.map((instruction, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="body1">{instruction.text}</Typography>
                {instruction.image && (
                  <Box sx={{ mt: 1 }}>
                    <img
                      src={instruction.image}
                      alt={`Step ${index + 1}`}
                      style={{ maxWidth: '100%' }}
                    />
                  </Box>
                )}
                {instruction.notes && (
                  <Typography variant="body2" color="textSecondary">
                    Notes: {instruction.notes}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteInstruction(index)}
                  sx={{ mt: 1 }}
                >
                  Delete
                </Button>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleBack} variant="outlined" color="inherit">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </>
        );

        case 4:
          return (
            <>
              <Typography variant="h6">Step 5: Add Ingredients</Typography>
              <TextField
                name="ingredientText"
                label="Ingredient"
                value={formData.ingredientText}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button onClick={handleAddIngredient} sx={{ mt: 2 }}>
                Add Ingredient
              </Button>
              {formData.ingredients && formData.ingredients.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  {formData.ingredients.map((ingredient, index) => (
                    <Chip
                      key={index}
                      label={ingredient}
                      onDelete={() => handleDeleteIngredient(index)}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  color="inherit"
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                  Finish
                </Button>
              </Box>
            </>
          );
  
        

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Stepper sx={{ mb: 4 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>{getStepContent(activeStep)}</form>
    </Box>
  );
}
