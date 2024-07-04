import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step5 = ({ formData, onChange, onSubmit, onReset, onBack }) => {
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    // Load data from local storage
    const step1Data = JSON.parse(localStorage.getItem('step1Data')) || {};
    const step2Data = JSON.parse(localStorage.getItem('step2Data')) || {};
    const step3Data = JSON.parse(localStorage.getItem('step3Data')) || {};
    const step4Data = JSON.parse(localStorage.getItem('step4Data')) || {};

    // Log the loaded data
    console.log('Loaded Step 1 Data:', step1Data);
    console.log('Loaded Step 2 Data:', step2Data);
    console.log('Loaded Step 3 Data:', step3Data);
    console.log('Loaded Step 4 Data:', step4Data);

    // Optionally, you can use the loaded data to pre-fill formData or perform other actions
  }, []);

  const handleAddIngredient = () => {
    if (ingredientName && !formData.ingredients.includes(ingredientName)) {
      const updatedIngredients = [...formData.ingredients, ingredientName];
      onChange({ ingredients: updatedIngredients });
      setIngredientName(''); // Clear ingredientName state after adding
    }
  };

  const handleDeleteIngredient = (ingredient) => {
    const updatedIngredients = formData.ingredients.filter(item => item !== ingredient);
    onChange({ ingredients: updatedIngredients });
  };

  const handleSubmitClick = () => {
    // Prepare data for storage in localStorage
    const step5Data = {
      ingredients: formData.ingredients,
    };

    // Store in localStorage
    localStorage.setItem('step5Data', JSON.stringify(step5Data));
    console.log('Step 5 Data:', step5Data);

    // Call onSubmit function to submit the form
    onSubmit();
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Step 5: Add Ingredients
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Please provide the ingredients.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <TextField
          name="ingredient_name"
          label="Ingredient Name"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          fullWidth
          margin="normal"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddIngredient();
            }
          }}
        />
        <Button
          onClick={handleAddIngredient}
          variant="outlined"
          color="primary"
          sx={{ height: '100%' }}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {formData.ingredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onDelete={() => handleDeleteIngredient(ingredient)}
            deleteIcon={<span style={{ cursor: 'pointer', padding: 2 }}>×</span>}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack} variant="outlined" color="inherit">
          Back
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={onReset} variant="outlined" color="secondary">
            Reset
          </Button>
          <Button onClick={handleSubmitClick} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

Step5.propTypes = {
  formData: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step5;
