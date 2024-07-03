import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step4 = ({ formData, onChange, onNext, onBack, handleAddInstruction, handleDeleteInstruction }) => {
  const [instructions, setInstructions] = useState([]);
  const [notes, setNotes] = useState([]);

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

    // Update notes state with new note if needed
    if (formData.instructionNotes) {
      setNotes([...notes, formData.instructionNotes]);
    } else {
      setNotes([...notes, null]); // Handle optional notes
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
      notes: [...notes, formData.instructionNotes || null], // Append new note with existing notes array
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

    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    onChange({ instructions: updatedInstructions });
  };

  return (
    <>
      <Typography variant="h6">Step 4: Add Instructions</Typography>
      <TextField
        name="instructionText"
        label="Instruction Text"
        value={formData.instructionText}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'instructionText')}
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
        onKeyDown={(e) => handleKeyDown(e, 'instructionImage')}
        fullWidth
        margin="normal"
      />
      <TextField
        name="instructionNotes"
        label="Notes (Optional)"
        value={formData.instructionNotes}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'instructionNotes')}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleAddInstructionClick}
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Instruction
      </Button>
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
          {notes[index] && (
            <Typography variant="body2" color="textSecondary">
              Notes: {notes[index]}
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
