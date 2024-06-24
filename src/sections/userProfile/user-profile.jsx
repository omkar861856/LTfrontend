// axios
import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

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
  const [avatar, setAvatar] = useState(user?.photoURL === '');

  const router = useRouter();

  const [backendResponse, setBackendResponse] = useState('');

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
        name, photoURL: avatar
      })
      setBackendResponse(null);
      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setSubmitting(false);
      }, 400);
      (async () => {
        const url = `${backendUrl}/update-profile`;
        const signupaxios = await axios
          .patch(url, {
            email:user.email,
            name,
            photoURL: avatar,
          })
          .then((response) => {
            setBackendResponse(response.data.msg);
            resetForm();
            console.log(backendResponse);
            if (response.data.msg === 'User profile updated successfully') {
              
              router.reload();
            }else{
              router.reload()
            }
          })
          .catch((error) => alert(error, 'error block activated'));
        console.log(signupaxios);
      })();
      // alert(JSON.stringify({ email, password, role_radio }, null, 2));
    },
  });

  function handleImageUpload(e) {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={3}>
          <Avatar alt="Avatar" src={avatar} sx={{ width: 80, height: 80 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <TextField
            onChange={(e) => handleImageUpload(e)}
            accept="image/png, image/jpeg"
            fullWidth
            type="file"
          />

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
     height="100" width="100%" p={4}
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
