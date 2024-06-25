import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
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

import CircularIndeterminate from 'src/utils/loading-spinner';

import { bgGradient } from 'src/theme/css';
import { user_api } from 'src/services/userapi';
import { signIn } from 'src/redux/slices/userSlice';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

const backendUrl = user_api;

// ================= validation schema

const validationSchema = yup.object().shape({
  email: yup.string().label('This').required().email(),

  password: yup.string().label('Password').required(),
  login_location: yup
    .string()
    .oneOf(['marathahalli', 'btm', 'wfh'])
    .required('You must select an option'),
});

const RenderForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const timeObj = new Date().toLocaleTimeString(undefined, {
    timeZone: 'Asia/Kolkata',
  });

  const dayObj = new Date().toLocaleDateString(undefined, {
    timeZone: 'Asia/Kolkata',
  });
  // const month = timeObj.getUTCMonth() + 1; // months from 1-12
  // const day = timeObj.getUTCDate();
  // const year = timeObj.getUTCFullYear();
  // const signInTime = timeObj.toLocaleTimeString();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');

  const login = new Date();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      login_location: '',
      login_time: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { email, password, login_location } = values;
      setBackendResponse(null);
      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setLoading(true);
        setSubmitting(false);
      }, 0);
      (async () => {
        const url = `${backendUrl}/signin`;

        await axios
          .post(url, {
            email,
            password,
            login,
            login_location,
            loginDay: dayObj,
            loginTime: timeObj,
          })
          .then((response) => {
            resetForm();
            if (response.data.msg === 'Logged in') {
              setBackendResponse(response.data.msg);
              dispatch(
                signIn({
                  email,
                  login,
                  logout: 'not yet',
                  login_location,
                  name: response.data.name,
                  loginDay: dayObj,
                  loginTime: timeObj,
                  token: response.data.token,
                  role: response.data.role,
                })
              );
              console.log(response);
              router.push('/dashboard');
              setLoading(false);
            } else {
              resetForm();
              setBackendResponse(response.data.msg);
              setLoading(!loading);
            }
          })
          .catch((error) => {
            resetForm();
            setBackendResponse('User not found');
          });
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
            helpertext={formik.touched.email && formik.errors.email}
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
            helpertext={formik.touched.password && formik.errors.password}
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
            helpertext={formik.touched.login_location && formik.errors.login_location}
          >
            <FormControlLabel value="btm" control={<Radio />} label="BTM" />

            <FormControlLabel value="marathahalli" control={<Radio />} label="Marathahalli" />
            <FormControlLabel value="wfh" control={<Radio />} label="WFH" />
          </RadioGroup>

          {backendResponse !== 'logged in' && loading === false ? (
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
          ) : (
            <div>
              {backendResponse !== 'User not found' ? (
                <LoadingButton variant="outlined">
                  <CircularIndeterminate />
                </LoadingButton>
              ) : (
                <div>
                  <p style={{ color: 'red' }}>{backendResponse} backend response</p>
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
                </div>
              )}
            </div>
          )}
          {backendResponse}
        </Stack>
      </form>
    </div>
  );
};

export default function LoginView() {
  const theme = useTheme();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // Must use destructuring router assignmenteslint
  const router = useRouter();

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
            <Button
              onClick={() => {
                router.push('/signup');
              }}
            >
              Sign Up
            </Button>
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
          {RenderForm()}{' '}
        </Card>
      </Stack>
    </Box>
  );
}
