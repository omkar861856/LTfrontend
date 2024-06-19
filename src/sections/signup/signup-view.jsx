// axios
import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import { user_api } from 'src/services/userapi';

import Iconify from 'src/components/iconify';

// ================= validation schema ==================

const validationSchema = yup.object().shape({
  name: yup.string().label('Name').required(),

  email: yup.string().label('Email').required().email(),

  password: yup.string().label('This').required(),
  confirm_password: yup
    .string()
    .label('This too')
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RenderForm = () => {


  const backendUrl = 'https://learnmore-backend-chi.vercel.app';

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [backendResponse, setBackendResponse] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      role_radio: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { name, email, password, role_radio } = values;
      setBackendResponse(null);
      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setSubmitting(false);
      }, 400);
      (async () => {
        const url = `${user_api}/signup`;
        const signupaxios = await axios
          .post(url, {
            name,
            email,
            password,
            role_radio,
          })
          .then((response) => {
            setBackendResponse(response.data.msg);
            resetForm();
            if (response.data.msg === 'User added') {
              router.push('/');
            }
          })
          .catch((error) => alert(error, 'error block activated'));
      })();
      // alert(JSON.stringify({ email, password, role_radio }, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={3}>
        <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <TextField
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
          />

          <FormLabel id="demo-row-radio-buttons-group-label">Role:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="role_radio"
            value={formik.values.role_radio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role_radio && Boolean(formik.errors.role_radio)}
            helperText={formik.touched.role_radio && formik.errors.role_radio}

          >
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel default value="mentor" control={<Radio />} label="Mentor" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
            Sign Up
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default function SignUpView() {
  const router = useRouter();

  const theme = useTheme();

  const handleClick = () => {
    router.push('/');
  };

  // const renderForm = (
  //   <>
  //     <Stack spacing={3} mb={3}>
  //       <TextField name="email" label="Email address" />

  //       <TextField name="newpassword" label="New Password" />

  //       <TextField name="confirmpassword" label="Confirm Password" />
  //     </Stack>

  //     <LoadingButton
  //       fullWidth
  //       size="large"
  //       type="submit"
  //       variant="contained"
  //       color="inherit"
  //       onClick={handleClick}
  //     >
  //       Sign Up
  //     </LoadingButton>
  //   </>
  // );

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
          <Typography variant="h4">Sign Up to Learnmore Technologies</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link onClick={handleClick} variant="subtitle2" sx={{ ml: 0.5 }}>
              Log in
            </Link>
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

          <a
            rel="noreferrer"
            target="_blank"
            href="https://medium.com/@raoufslv09/simplifying-forget-reset-password-in-your-mern-stack-web-app-a56845bfa33c"
          >
            forgot password
          </a>
          <br />
        </Card>
      </Stack>
    </Box>
  );
}
