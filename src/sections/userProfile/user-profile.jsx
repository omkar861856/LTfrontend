// axios
import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';

import { useDispatch } from 'react-redux';

import { useRouter } from 'src/routes/hooks';

import Account from 'src/_mock/account';
import { bgGradient } from 'src/theme/css';
import { user_api } from 'src/services/userapi';
import { updateUser } from 'src/redux/slices/userSlice';

// ================= validation schema ==================

const validationSchema = yup.object().shape({
  name: yup.string().label('Name').required(),

  email: yup.string().label('Email').required().email(),
});

const RenderForm = () => {
  const backendUrl = user_api;
  const { user } = Account();
  const [avatar, setAvatar] = useState(user.photoURL);

  const router = useRouter();

  const dispatch = useDispatch();

  const [backendResponse, setBackendResponse] = useState('');

  const handleChange = (event) => {
    setAvatar(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      photoURL: avatar,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { name } = values;
      updateUser({
        name,
        photoURL: avatar,
      });
      setBackendResponse(null);
      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setSubmitting(false);
      }, 400);
      (async () => {
        const url = `${backendUrl}/update-profile`;
        const signupaxios = await axios
          .patch(url, {
            email: user.email,
            name,
            photoURL: avatar,
          })
          .then((response) => {
           
            resetForm();
            dispatch(
              updateUser({
                name,
                photoURL: avatar,
              })
            );
          })
          .catch((error) => alert(error, 'error block activated'));
        console.log(signupaxios);
      })();
      // alert(JSON.stringify({ email, password, role_radio }, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={3}>
          <Avatar alt="Avatar" src={avatar} sx={{ width: 80, height: 80 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <InputLabel id="demo-simple-select-helper-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={avatar}
            label="Age"
            autoWidth
            onChange={handleChange}
          >
            {[...Array(23)].map((_, index) => (
              <MenuItem value={`/assets/images/avatars/avatar_${index + 1}.jpg`}>
                <Avatar
                  alt="Avatar"
                  src={`/assets/images/avatars/avatar_${index + 1}.jpg`}
                  sx={{ width: 60, height: 60 }}
                />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select your profile photo amongst</FormHelperText>

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
            disabled
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
            Update
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default function UserProfileView() {
  const theme = useTheme();

  return (
    <Box
      height="100"
      width="100%"
      p={4}
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
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
          <Typography variant="h4">Edit your profile here</Typography>
          <br />

          {RenderForm()}
        </Card>
      </Stack>
    </Box>
  );
}
