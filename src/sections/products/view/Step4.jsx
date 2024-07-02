import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step4 = ({ formData, onChange, onNext, onBack, handleAddInstruction, handleDeleteInstruction }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <>
      <Typography variant="h6">Step 4: Add Instructions</Typography>
      <TextField
        name="instructionText"
        label="Instruction Text"
        value={formData.instructionText}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        required
      />
      <TextField
        name="instructionImage"
        label="Instruction Image URL (Optional)"
        value={formData.instructionImage}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleAddInstruction}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Instruction
      </Button>
      <TextField
        name="instructionNotes"
        label="Notes (Optional)"
        value={formData.instructionNotes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {formData.instructions.map((instruction, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Typography variant="body1">{instruction.text}</Typography>
          {instruction.image && (
            <Box sx={{ mt: 1 }}>
              <img
                src={instruction.image}
                alt={`Step ${index + 1}`}
                style={{ maxWidth: '100%' }}
              />
            </Box>
          )}
          {instruction.notes && (
            <Typography variant="body2" color="textSecondary">
              Notes: {instruction.notes}
            </Typography>
          )}
          <Button
            onClick={() => handleDeleteInstruction(index)}
            variant="outlined"
            color="error"
            sx={{ mt: 1 }}
          >
            Delete
          </Button>
        </Box>
      ))}

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

Step4.propTypes = {
  formData: PropTypes.shape({
    instructionText: PropTypes.string,
    instructionImage: PropTypes.string,
    instructionNotes: PropTypes.string,
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        image: PropTypes.string,
        notes: PropTypes.string,
      })
    ),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleAddInstruction: PropTypes.func.isRequired,
  handleDeleteInstruction: PropTypes.func.isRequired,
};

export default Step4;
