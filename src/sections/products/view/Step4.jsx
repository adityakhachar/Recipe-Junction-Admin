import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step4 = ({ formData, onChange, onNext, onBack, handleAddInstruction, handleDeleteInstruction }) => {
  const [instructions, setInstructions] = useState([]);
  const [notes, setNotes] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleAddInstructionClick = () => {
    // Prepare new instruction object
    const newInstruction = {
      text: formData.instructionText,
      image: formData.instructionImage || null, // Optional image field
    };

    // Update instructions state with newInstruction if needed
    setInstructions([...instructions, newInstruction]);

    // Update notes state if notes are provided
    if (formData.instructionNotes) {
      setNotes(formData.instructionNotes);
    }

    // Update formData state to clear fields if needed
    onChange({
      instructionText: '',
      instructionImage: '',
      instructionNotes: '',
      instructions: [...instructions, newInstruction], // Update parent component state with new instruction
    });

    // Prepare consolidated data for logging (database format)
    const consolidatedData = {
      instructions: [...instructions, newInstruction],
      notes: formData.instructionNotes || '', // Update notes state with new note if needed
    };

    // Log consolidated data to console in database format
    console.log('Consolidated Data for Database:', consolidatedData);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      switch (field) {
        case 'instructionText':
        case 'instructionImage':
        case 'instructionNotes':
          handleAddInstructionClick();
          break;
        default:
          break;
      }
    }
  };

  const handleDelete = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);

    onChange({ instructions: updatedInstructions });
  };

  const handleNextClick = () => {
    // Prepare data for storage in localStorage
    const step4Data = {
      instructions,
      notes,
    };

    // Store in localStorage
    localStorage.setItem('step4Data', JSON.stringify(step4Data));
    console.log('Step 4 Data:', step4Data);

    // Call onNext function to proceed to the next step
    onNext();
  };

  return (
    <>
      <Typography variant="h6">Step 4: Add Instructions</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          name="instructionText"
          label="Instruction Text"
          value={formData.instructionText}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'instructionText')}
          fullWidth
          margin="normal"
          multiline
          rows={1} // Adjusted rows to 2
          required
        />
        <TextField
          name="instructionImage"
          label="Instruction Image URL (Optional)"
          value={formData.instructionImage}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'instructionImage')}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleAddInstructionClick}
          variant="outlined"
          color="primary"
          sx={{ mt: 2, minWidth: 'auto' }}
        >
          Add Instruction
        </Button>
      </Box>
      <TextField
        name="instructionNotes"
        label="Notes (Optional)"
        value={formData.instructionNotes}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'instructionNotes')}
        fullWidth
        margin="normal"
      />

      {instructions.map((instruction, index) => (
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
          {notes && (
            <Typography variant="body2" color="textSecondary">
              Notes: {notes}
            </Typography>
          )}
          <Button
            onClick={() => handleDelete(index)}
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
        <Button onClick={handleNextClick} variant="contained" color="primary">
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
