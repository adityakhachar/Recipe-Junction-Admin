import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';


// Define bgGradient function
const bgGradient = ({ color, imgUrl }) => ({
  backgroundImage: `linear-gradient(to right, ${color}, ${color}), url(${imgUrl})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});


export default function ForgotPassword() {
    const theme = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Implement your logic to handle form submission here
      console.log('Submitted email:', email);
      // Example redirect after form submission
      router.push('/reset-password');
    };
  
    return (
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: '100vh', // Adjust height as needed
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={3} component={Card} sx={{ p: 5, maxWidth: 420 }}>
          <Typography variant="h4" align="center">
            Forgot Password
          </Typography>
  
          <Typography variant="body2" align="center">
            Please enter your email address. We will send you a link to reset your password.
          </Typography>
  
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: 3 }}
              required
            />
  
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Send Reset Link
            </Button>
          </form>
  
          <Divider sx={{ my: 3 }} />
  
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </Stack>
      </Box>
    );
  }