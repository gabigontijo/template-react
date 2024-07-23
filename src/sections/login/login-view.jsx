import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/hooks/authProvider';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const auth= useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [setLoading] = useState(false);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      setLoading(true);
      try{
        auth.loginAction(input.username, input.password);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert(error.message);
      }finally {
        setLoading(false);
      }
    } else {
      alert("Login ou senha inválidos");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Email" type='email' id='username' placeholder='example@gmail.com' onChange={handleInput}/>

        <TextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          id='password'
          onChange={handleInput}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Esqueceu a senha?
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
        Entrar
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
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
          <Typography variant="h4">Acesse sua conta</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}/>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
