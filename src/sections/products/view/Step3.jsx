import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step3 = ({ formData, onChange, onNext, onBack, handleAddMore }) => {
  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedData = [...formData[type]];
    updatedData[index] = { ...updatedData[index], [name]: value };
    onChange({ [type]: updatedData });
  };

  return (
    <>
      <Typography variant="h6">Step 3: Add Nutrition Level</Typography>
      {formData.nutritionLevels.map((item, index) => (
        <div key={index}>
          <TextField
            name={`nutritionLevels[${index}].serving_item_name`}
            label="Serving Item Name"
            value={item.serving_item_name}
            onChange={(e) => handleChange(e, index, 'nutritionLevels')}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name={`nutritionLevels[${index}].amount_gm`}
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
        onChange={(e) => onChange({ calories: e.target.value })}
        fullWidth
        margin="normal"
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onBack} variant="outlined" color="inherit">
          Back
        </Button>
        <Button onClick={onNext} variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </>
  );
};

Step3.propTypes = {
  formData: PropTypes.shape({
    nutritionLevels: PropTypes.arrayOf(
      PropTypes.shape({
        serving_item_name: PropTypes.string,
        amount_gm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
    calories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleAddMore: PropTypes.func.isRequired,
};

export default Step3;
