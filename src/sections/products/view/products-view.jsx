import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const steps = [
  'Recipe Details',
  'Category Information',
  'Add Nutrition Level',
  'Add Instructions',
  'Add Ingredients',
];

export default function ProductsView() {
  const [activeStep, setActiveStep] = useState(0); // Start activeStep from 0
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cook_time: '',
    prep_time: '',
    serving_persons: '',
    difficulty: '',
  });

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

  const handleReset = () => {
    setActiveStep(0); // Reset activeStep to 0
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      name: '',
      description: '',
      cook_time: '',
      prep_time: '',
      serving_persons: '',
      difficulty: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
    // Optionally, add redirection logic or API calls for form submission

    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      name: '',
      description: '',
      cook_time: '',
      prep_time: '',
      serving_persons: '',
      difficulty: '',
    });

    // Reset active step to 0
    setActiveStep(0);
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
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            <TextField
              name="addressLine1"
              label="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="addressLine2"
              label="Address Line 2"
              value={formData.addressLine2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
      case 3:
        return (
          <>
            <Typography variant="h6">Step 4: Add Instructions</Typography>
            {/* Add fields for instructions */}
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
      case 4:
        return (
          <>
            <Typography variant="h6">Step 5: Add Ingredients</Typography>
            {/* Add fields for ingredients */}
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

      <Box sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box>{getStepContent(activeStep)}</Box>
        </form>
      </Box>
    </Container>
  );
}