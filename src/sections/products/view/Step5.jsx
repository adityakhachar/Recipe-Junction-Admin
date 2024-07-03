import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step5 = ({ formData, onChange, onSubmit, onReset, onBack }) => {
  const [ingredientName, setIngredientName] = useState('');

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
          <Button onClick={onSubmit} variant="contained" color="primary">
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
