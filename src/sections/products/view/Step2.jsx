import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const cuisineOptions = ['Italian', 'Indian', 'Chinese', 'Japanese', 'Mexican', 'French', 'Mediterranean'];
const dietaryOptions = ['Vegan', 'Vegetarian', 'Pescatarian', 'Gluten-free', 'Lactose-free', 'Sugar-free', 'Non-vegetarian'];
const mealTypeOptions = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const Step2 = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [showCustomCuisineInput, setShowCustomCuisineInput] = useState(false);
  const [customCuisine, setCustomCuisine] = useState('');
  const [showCustomDietaryInput, setShowCustomDietaryInput] = useState(false);
  const [customDietary, setCustomDietary] = useState('');
  const [showCustomMealTypeInput, setShowCustomMealTypeInput] = useState(false);
  const [customMealType, setCustomMealType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleAddCustomCuisineClick = () => {
    setShowCustomCuisineInput(true);
  };

  const handleAddCustomCuisineOption = () => {
    if (customCuisine && !formData.cuisine_type.includes(customCuisine)) {
      const updatedCuisineTypes = [...formData.cuisine_type, customCuisine];
      onChange({ cuisine_type: updatedCuisineTypes });
      setCustomCuisine(''); // Clear customCuisine state after adding
      setShowCustomCuisineInput(false);
    } else {
      console.log("Custom Cuisine is undefined or already exists in formData.cuisine_type.");
    }
  };

  const handleDeleteCustomCuisine = (cuisine) => {
    const updatedCuisineTypes = formData.cuisine_type.filter(item => item !== cuisine);
    onChange({ cuisine_type: updatedCuisineTypes });
  };

  const handleAddCustomDietaryClick = () => {
    setShowCustomDietaryInput(true);
  };

  const handleAddCustomDietaryOption = () => {
    if (customDietary && !formData.dietary.includes(customDietary)) {
      const updatedDietaryPreferences = [...formData.dietary, customDietary];
      onChange({ dietary: updatedDietaryPreferences });
      setCustomDietary(''); // Clear customDietary state after adding
      setShowCustomDietaryInput(false);
    } else {
      console.log("Custom Dietary is undefined or already exists in formData.dietary.");
    }
  };

  const handleDeleteCustomDietary = (dietary) => {
    const updatedDietaryPreferences = formData.dietary.filter(item => item !== dietary);
    onChange({ dietary: updatedDietaryPreferences });
  };

  const handleAddCustomMealTypeClick = () => {
    setShowCustomMealTypeInput(true);
  };

  const handleAddCustomMealTypeOption = () => {
    if (customMealType && !formData.meal_type.includes(customMealType)) {
      const updatedMealTypes = [...formData.meal_type, customMealType];
      onChange({ meal_type: updatedMealTypes });
      setCustomMealType(''); // Clear customMealType state after adding
      setShowCustomMealTypeInput(false);
    } else {
      console.log("Custom Meal Type is undefined or already exists in formData.meal_type.");
    }
  };

  const handleDeleteCustomMealType = (mealType) => {
    const updatedMealTypes = formData.meal_type.filter(item => item !== mealType);
    onChange({ meal_type: updatedMealTypes });
  };

  const logFormData = () => {
    // Prepare data in the format expected by the Category schema
    const categoryData = {
      cuisine_type: formData.cuisine_type,
      dietary: formData.dietary,
      meal_type: formData.meal_type,
    };

    // Store in localStorage
    localStorage.setItem('step2Data', JSON.stringify(categoryData));
    console.log('Form Data for Category:', categoryData);
    console.log(' step2Data Stored in localStorage:', localStorage.getItem('step2Data'));

    // Call onNext function to proceed to the next step
    onNext();
  };

  return (
    <>
      <Typography variant="h6">Step 2: Category Information</Typography>

      {/* Cuisine Type */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Cuisine Type</InputLabel>
        <Select
          name="cuisine_type"
          multiple
          value={formData.cuisine_type}
          onChange={handleChange}
          renderValue={(selected) => (
            <div style={{ display: 'none' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={() => handleDeleteCustomCuisine(value)} sx={{ mr: 1, mb: 1 }} />
              ))}
            </div>
          )}
        >
          {cuisineOptions.map((cuisine) => (
            <MenuItem key={cuisine} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </Select>
        {!showCustomCuisineInput && (
          <Button onClick={handleAddCustomCuisineClick} variant="outlined" color="primary" sx={{ mt: 1, maxWidth: '15%', minWidth: 'auto', whiteSpace: 'nowrap' }}>
            Add Custom Cuisine
          </Button>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {formData.cuisine_type.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDeleteCustomCuisine(value)}
              deleteIcon={<span style={{ cursor: 'pointer', padding: 2 }}>×</span>}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </FormControl>

      {/* Add Custom Cuisine Input */}
      {showCustomCuisineInput && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TextField
            name="custom_cuisine"
            label="Add Custom Cuisine"
            value={customCuisine}
            onChange={(e) => setCustomCuisine(e.target.value)}
            fullWidth
            margin="normal"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomCuisineOption();
              }
            }}
          />
          <Button
            onClick={handleAddCustomCuisineOption}
            variant="outlined"
            color="primary"
            sx={{ height: '100%' }}
          >
            Add
          </Button>
        </Box>
      )}

      {/* Dietary Preferences */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Dietary Preferences</InputLabel>
        <Select
          name="dietary"
          multiple
          value={formData.dietary}
          onChange={handleChange}
          renderValue={(selected) => (
            <div style={{ display: 'none' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={() => handleDeleteCustomDietary(value)} sx={{ mr: 1, mb: 1 }} />
              ))}
            </div>
          )}
        >
          {dietaryOptions.map((dietary) => (
            <MenuItem key={dietary} value={dietary}>
              {dietary}
            </MenuItem>
          ))}
        </Select>
        {!showCustomDietaryInput && (
          <Button onClick={handleAddCustomDietaryClick} variant="outlined" color="primary" sx={{ mt: 1, maxWidth: '15%', minWidth: 'auto', whiteSpace: 'nowrap' }}>
            Add Custom Dietary
          </Button>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {formData.dietary.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDeleteCustomDietary(value)}
              deleteIcon={<span style={{ cursor: 'pointer', padding: 2 }}>×</span>}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </FormControl>

      {/* Add Custom Dietary Input */}
      {showCustomDietaryInput && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TextField
            name="custom_dietary"
            label="Add Custom Dietary"
            value={customDietary}
            onChange={(e) => setCustomDietary(e.target.value)}
            fullWidth
            margin="normal"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomDietaryOption();
              }
            }}
          />
          <Button
            onClick={handleAddCustomDietaryOption}
            variant="outlined"
            color="primary"
            sx={{ height: '100%' }}
          >
            Add
          </Button>
        </Box>
      )}

      {/* Meal Type */}
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Meal Type</InputLabel>
        <Select
          name="meal_type"
          multiple
          value={formData.meal_type}
          onChange={handleChange}
          renderValue={(selected) => (
            <div style={{ display: 'none' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={() => handleDeleteCustomMealType(value)} sx={{ mr: 1, mb: 1 }} />
              ))}
            </div>
          )}
        >
          {mealTypeOptions.map((mealType) => (
            <MenuItem key={mealType} value={mealType}>
              {mealType}
            </MenuItem>
          ))}
        </Select>
        {!showCustomMealTypeInput && (
          <Button onClick={handleAddCustomMealTypeClick} variant="outlined" color="primary" sx={{ mt: 1, maxWidth: '15%', minWidth: 'auto', whiteSpace: 'nowrap' }}>
            Add Custom Meal Type
          </Button>
        )}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {formData.meal_type.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => handleDeleteCustomMealType(value)}
              deleteIcon={<span style={{ cursor: 'pointer', padding: 2 }}>×</span>}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </FormControl>

      {/* Add Custom Meal Type Input */}
      {showCustomMealTypeInput && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TextField
            name="custom_meal_type"
            label="Add Custom Meal Type"
            value={customMealType}
            onChange={(e) => setCustomMealType(e.target.value)}
            fullWidth
            margin="normal"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomMealTypeOption();
              }
            }}
          />
          <Button
            onClick={handleAddCustomMealTypeOption}
            variant="outlined"
            color="primary"
            sx={{ height: '100%' }}
          >
            Add
          </Button>
        </Box>
      )}

      {/* Back and Next Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack} variant="outlined" color="inherit">
          Back
        </Button>
        <Button onClick={logFormData} variant="contained" color="primary" type="button">
          Next
        </Button>
      </Box>
    </>
  );
};

Step2.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step2;
