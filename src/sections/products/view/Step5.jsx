import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Step5 = ({ formData, onBack, onSubmit }) => (
  <>
    <Typography variant="h6">Step 5: Review and Submit</Typography>
    <Typography variant="body1">
      Please review the information before submitting:
    </Typography>
    <Typography variant="body1">
      Name: {formData.name}
    </Typography>
    <Typography variant="body1">
      Description: {formData.description}
    </Typography>
    <Typography variant="body1">
      Cook Time: {formData.cook_time} minutes
    </Typography>
    <Typography variant="body1">
      Prep Time: {formData.prep_time} minutes
    </Typography>
    <Typography variant="body1">
      Serving Persons: {formData.serving_persons}
    </Typography>
    <Typography variant="body1">
      Difficulty: {formData.difficulty}
    </Typography>
    <Typography variant="body1">
      Cuisine Type: {formData.cuisine_type.join(', ')}
    </Typography>
    {/* Display other form data fields as needed */}

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button onClick={onBack} variant="outlined" color="inherit">
        Back
      </Button>
      <Button onClick={onSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  </>
);

Step5.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    cook_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prep_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serving_persons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    difficulty: PropTypes.string,
    cuisine_type: PropTypes.arrayOf(PropTypes.string),
    // Add PropTypes for other fields if necessary
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Step5;
