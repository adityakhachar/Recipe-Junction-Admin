import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks'; // Adjust the path as per your project structure
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecureCodeInput, setShowSecureCodeInput] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleSecureCodeButtonClick = () => {
    setShowSecureCodeInput(!showSecureCodeInput);
  };

  const handleForgotPassword = () => {
    router.push('/forgotpassword');
  };

  const handleGetStarted = () => {
    router.push('/register'); // Navigate to '/register' on click
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {showSecureCodeInput && (
          <TextField
            name="secureCode"
            label="Secure Code"
            type="text"
            fullWidth
            required
          />
        )}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
        <Button variant="outlined" onClick={handleSecureCodeButtonClick}>
          {showSecureCodeInput ? 'Login without Secure Code' : 'Login with Secure Code'}
        </Button>
        <Link variant="subtitle2" underline="hover" onClick={handleForgotPassword}>
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.background.default, 0.9)}, ${alpha(theme.palette.background.default, 0.9)}), url('/assets/background/overlay_4.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleGetStarted}>
              Get started
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
