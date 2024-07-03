import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step1 = ({ formData, onChange, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const logFormData = () => {
    // Prepare data in the format expected by the recipeSchema
    const recipeData = {
      name: formData.name,
      description: formData.description,
      youtube_link: formData.youtube_link || '', // Optional field
      cook_time: parseInt(formData.cook_time, 10),
      prep_time: parseInt(formData.prep_time, 10),
      serving_persons: parseInt(formData.serving_persons, 10),
      difficulty: formData.difficulty
    };

    // Log the data in the desired schema format
    console.log('Form Data for Recipe:', recipeData);
  };

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
      <TextField
        name="youtube_link"
        label="YouTube Video Link"
        value={formData.youtube_link}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button disabled onClick={() => {}} variant="outlined" color="inherit">
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

Step1.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    cook_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prep_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serving_persons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    difficulty: PropTypes.string,
    youtube_link: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Step1;
