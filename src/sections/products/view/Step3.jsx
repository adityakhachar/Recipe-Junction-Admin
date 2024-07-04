import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step3 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    nutritionLevels: [{ serving_item_name: '', amount_gm: '' }],
    calories: '',
  });

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedData = [...formData[type]];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFormData({ ...formData, [type]: updatedData });
  };

  const handleAddMore = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { serving_item_name: '', amount_gm: '' }],
    });
  };

  const logFormData = () => {
    // Prepare data in the format expected by the nutritionSchema
    const nutritionData = {
      serving: formData.nutritionLevels,
      calories: parseInt(formData.calories, 10),
    };

    localStorage.setItem('step3Data', JSON.stringify(nutritionData));
    console.log(' step3Data Stored in localStorage:', localStorage.getItem('step3Data'));
    // Log the data in the desired schema format
    console.log('Form Data for Nutrition:', nutritionData);
  };

  return (
    <>
      <Typography variant="h6">Step 3: Add Nutrition Level</Typography>
      {formData.nutritionLevels.map((item, index) => (
        <div key={index}>
          <TextField
            name="serving_item_name"
            label="Serving Item Name"
            value={item.serving_item_name}
            onChange={(e) => handleChange(e, index, 'nutritionLevels')}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="amount_gm"
            label="Amount (gm)"
            type="number"
            value={item.amount_gm}
            onChange={(e) => handleChange(e, index, 'nutritionLevels')}
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
        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
        fullWidth
        margin="normal"
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack} variant="outlined" color="inherit">
          Back
        </Button>
        <Button
          onClick={() => {
            logFormData();
            onNext();
          }}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </Box>
    </>
  );
};

Step3.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step3;
