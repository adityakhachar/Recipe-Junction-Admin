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
  const [activeStep, setActiveStep] = useState(1); // Start activeStep from 1
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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
    setActiveStep(1); // Reset activeStep to 1
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
    });
  };

  const handleSubmit = () => {
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
    });

    // Reset active step to 1
    setActiveStep(1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h6">Step 1: Recipe Details</Typography>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        );
      case 2:
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
          </>
        );
      case 3:
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
          </>
        );
      case 4:
        return (
          <>
            <Typography variant="h6">Step 4: Add Instructions</Typography>
            {/* Add fields for instructions */}
          </>
        );
      case 5:
        return (
          <>
            <Typography variant="h6">Step 5: Add Ingredients</Typography>
            {/* Add fields for ingredients */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleReset} variant="outlined">
                Reset
              </Button>
              <Button type="submit" variant="contained" color="primary">
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

      <Stepper activeStep={activeStep - 1} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box>{getStepContent(activeStep)}</Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              disabled={activeStep === 1}
              onClick={handleBack}
              sx={{ mr: 2 }}
              variant="outlined"
              color="inherit"
            >
              Back
            </Button>

            {activeStep === steps.length + 1 ? (
              <Button type="submit" variant="contained" color="primary">
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
