import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Step1 = ({ formData, onChange, onNext }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadType, setUploadType] = useState('local'); // 'local' or 'url'

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews([...imagePreviews, reader.result]);
      };
      reader.readAsDataURL(file);
      onChange({ ...formData, images: [...(formData.images || []), { file, url: reader.result }] }); // Store both file and URL
    }
  };

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setImagePreviews([...imagePreviews, imageUrl]); // Add to image previews
    onChange({ ...formData, images: [...(formData.images || []), { url: imageUrl }] }); // Store only URL
  };

  const clearImagePreview = () => {
    setImagePreviews([]);
    onChange({ ...formData, images: [] });
  };

  const logFormData = () => {
    const step1Data = {
      name: formData.name,
      description: formData.description,
      cook_time: formData.cook_time,
      prep_time: formData.prep_time,
      serving_persons: formData.serving_persons,
      difficulty: formData.difficulty,
      youtube_link: formData.youtube_link,
      images: formData.images,
      imageUrl: formData.imageUrl,
    };

    localStorage.setItem('step1Data', JSON.stringify(step1Data));
    console.log('Form Data for Recipe Step 1:', step1Data);
    console.log('Stored in localStorage:', localStorage.getItem('step1Data'));
    onNext();
  };

  const handleAddImageLocal = () => {
    setUploadType('local');
  };

  const handleAddImageUrl = () => {
    setUploadType('url');
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    setImagePreviews(updatedPreviews);

    const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);
    onChange({ ...formData, images: updatedImages });
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
        required={false} // Optional field
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
        required={false} // Optional field
      />
      <TextField
        name="prep_time"
        label="Prep Time (minutes)"
        type="number"
        value={formData.prep_time}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required={false} // Optional field
      />
      <TextField
        name="serving_persons"
        label="Serving Persons"
        type="number"
        value={formData.serving_persons}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required={false} // Optional field
      />
      <TextField
        name="difficulty"
        label="Difficulty"
        select
        value={formData.difficulty}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required={false} // Optional field
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
      {/* Choose Local or URL */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Button
          variant={uploadType === 'local' ? 'contained' : 'outlined'}
          onClick={handleAddImageLocal}
          color="primary"
          style={{ marginRight: '1rem' }}
        >
          Add Image from Local
        </Button>
        <Button
          variant={uploadType === 'url' ? 'contained' : 'outlined'}
          onClick={handleAddImageUrl}
          color="primary"
        >
          Add Image URL
        </Button>
      </Box>
      {/* Conditional Rendering based on uploadType */}
      {uploadType === 'local' && (
        <Button
          variant="outlined"
          component="label"
          htmlFor="image-input"
          color="inherit"
          style={{ marginBottom: '1rem' }}
        >
          Select Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-input"
          />
        </Button>
      )}
      {uploadType === 'url' && (
        <TextField
          name="imageUrl"
          label="Image URL"
          value={formData.imageUrl}
          onChange={handleImageUrlChange}
          fullWidth
          margin="normal"
        />
      )}
      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <Box mt={2}>
          {imagePreviews.map((preview, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={preview.url || preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '1rem' }} />
              <Button onClick={() => handleRemoveImage(index)} variant="outlined" color="inherit">
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={clearImagePreview} variant="outlined" color="inherit">
            Clear All Images
          </Button>
        </Box>
      )}
      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" color="inherit">
          Back
        </Button>
        <Button
          onClick={logFormData}
          variant="contained"
          color="primary"
          disabled={!formData.name} // Disable button if name field is empty
        >
          Next
        </Button>
      </Box>
    </>
  );
};

Step1.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired, // Only name is required
    description: PropTypes.string,
    cook_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prep_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serving_persons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    difficulty: PropTypes.string,
    youtube_link: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.instanceOf(File), // For local file
        url: PropTypes.string, // For image URL
      })
    ),
    imageUrl: PropTypes.string, // Single image URL for backward compatibility
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default Step1;
