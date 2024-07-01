import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
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

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    if (customCuisine && !cuisineOptions.includes(customCuisine)) {
      setCuisineOptions((prevOptions) => [...prevOptions, customCuisine]);
      setFormData((prevData) => ({
        ...prevData,
        cuisine_type: [...prevData.cuisine_type, customCuisine],
      }));
      setCustomCuisine('');
    }
  };

  const handleAddCustomDietary = () => {
    if (customDietary && !dietaryOptions.includes(customDietary)) {
      setDietaryOptions((prevOptions) => [...prevOptions, customDietary]);
      setFormData((prevData) => ({
        ...prevData,
        dietary: [...prevData.dietary, customDietary],
      }));
      setCustomDietary('');
    }
  };

  const handleAddCustomMealType = () => {
    if (customMealType && !mealTypeOptions.includes(customMealType)) {
      setMealTypeOptions((prevOptions) => [...prevOptions, customMealType]);
      setFormData((prevData) => ({
        ...prevData,
        meal_type: [...prevData.meal_type, customMealType],
      }));
      setCustomMealType('');
    }
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
    setMealTypeOptions([
      'Breakfast',
      'Brunch',
      'Lunch',
      'Dinner',
      'Snack',
      'Dessert',
      'Custom',
    ]);
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
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="inherit">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary" type="button">
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

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="inherit">
                Back
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary" type="button">
                Next
              </Button>
            </Box>
          </>
        );

      case 2:
        return (
          <>
            <Typography variant="h6">Step 3: Add Nutrition Level</Typography>
            {/* ...fields for Step 3 */}
          </>
        );

      case 3:
        return (
          <>
            <Typography variant="h6">Step 4: Add Instructions</Typography>
            {/* ...fields for Step 4 */}
          </>
        );

      case 4:
        return (
          <>
            <Typography variant="h6">Step 5: Add Ingredients</Typography>
            {/* ...fields for Step 5 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="inherit">
                Back
              </Button>
              <Button onClick={handleReset} variant="outlined" color="secondary">
                Reset
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary" type="button">
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
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Add Recipe
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSubmit}>
        {getStepContent(activeStep)}
      </Box>
    </Container>
  );
}
