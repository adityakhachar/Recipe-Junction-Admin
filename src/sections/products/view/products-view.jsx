import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

// Import your step components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const steps = [
  { component: Step1, name: 'Recipe Details' },
  { component: Step2, name: 'Ingredients' },
  { component: Step3, name: 'Nutrition Information' },
  { component: Step4, name: 'Instructions' },
  { component: Step5, name: 'Review & Submit' },
];

const ProductsView = () => {
  const [activeStep, setActiveStep] = useState(3); // Initial activeStep set to 0 (Step 1)

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
    nutritionLevels: [{ serving_item_name: '', amount_gm: '' }],
    instructions: [],
    instructionText: '',
    instructionImage: '',
    instructionNotes: '',
    ingredients: [],
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0); // Reset to Step 0
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
      nutritionLevels: [{ serving_item_name: '', amount_gm: '' }],
      instructions: [],
      instructionText: '',
      instructionImage: '',
      instructionNotes: '',
      ingredients: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    handleReset();
  };

  const handleFormChange = (updatedFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedFormData,
    }));
  };

  const handleCustomCuisineChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      customCuisine: value,
    }));
  };

  const handleAddCustomCuisine = () => {
    if (formData.customCuisine && !formData.cuisine_type.includes(formData.customCuisine)) {
      setFormData((prevData) => ({
        ...prevData,
        cuisine_type: [...prevData.cuisine_type, formData.customCuisine],
        customCuisine: '',
      }));
    }
  };

  useEffect(() => {
    console.log('Active Step:', activeStep);
  }, [activeStep]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Stepper sx={{ mb: 4 }} activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography variant="h6">{step.name}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {React.createElement(steps[activeStep].component, {
        formData,
        onChange: handleFormChange,
        onNext: handleNext,
        onBack: handleBack,
        onReset: handleReset,
        onSubmit: handleSubmit,
        cuisineOptions: ['Italian', 'Chinese', 'Indian', 'Custom'], // example options
        handleCustomCuisineChange,
        handleAddCustomCuisine,
      })}
    </Box>
  );
};

export default ProductsView;
