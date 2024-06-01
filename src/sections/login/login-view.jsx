import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const backendUrl = 'https://learnmore-backend-chi.vercel.app';

// ================= validation schema

const validationSchema = yup.object().shape({
  email: yup.string().label('This').required().email(),

  password: yup.string().label('Password').required(),
});

const RenderForm = () => {
  const router = useRouter();


  const dateObj = new Date();
  // const month = dateObj.getUTCMonth() + 1; // months from 1-12
  // const day = dateObj.getUTCDate();
  // const year = dateObj.getUTCFullYear();
  // const signInTime = dateObj.toLocaleTimeString();

  const [showPassword, setShowPassword] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const [token, setToken] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      login_location: '',
      
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { email, password, login_location } = values;
      setBackendResponse(null);
      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setSubmitting(false);
      }, 400);
      (async () => {
        const url = `${backendUrl}/signin`;
        const signupaxios = await axios
          .post(url, {
            email,
            password,
            login_location,
            login_time: dateObj,
          })
          .then((response) => {
            setBackendResponse(response.data.msg);
            setToken(response.data.token);
            resetForm();
            if (response.data.msg === 'logged in') {
              window.localStorage.setItem('token', response.data.token);
              window.localStorage.setItem('login', true);
              router.push('/dashboard');
              alert({ backendResponse, token });
            }
          })
          .catch((error) => alert(error, 'error block activated'));
        console.log(signupaxios);
      })();
      // alert(JSON.stringify({email,password, login_location}, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={3}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

          <FormLabel id="demo-row-radio-buttons-group-label">Login Location:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="login_location"
            value={formik.values.login_location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.login_location && Boolean(formik.errors.login_location)}
            helperText={formik.touched.login_location && formik.errors.login_location}
          >
            <FormControlLabel value="btm" control={<Radio />} label="BTM" />

            <FormControlLabel value="marathahalli" control={<Radio />} label="Marathahalli" />
            <FormControlLabel value="wfh" control={<Radio />} label="WFH" />
          </RadioGroup>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            // onClick={handleClick}
          >
            Sign In
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default function LoginView() {
  const theme = useTheme();

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
          <Typography variant="h4">Sign in to Learnmore Technologies</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <h3>Contact Admin Desk!!</h3>
          </Typography>

          {/* ========Google, Facebook, Twitter Buttons========= */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {RenderForm()}
          
        </Card>
      </Stack>
    </Box>
  );
}
