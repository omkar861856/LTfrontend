import * as yup from 'yup';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';


// ----------------------------------------------------------------------

// ================= validation schema

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup.string().label('This').required(),
  location: yup.string().label('This').required(),
  contact: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  altnumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().label('This').required().email(),
  qualification: yup.string().label('This').required(),
  branch: yup.string().label('This').required(),
  course: yup.string().label('This').required(),
  employed: yup.string().label('This'),
  aboutus: yup.string().label('This'),
});

const RenderForm = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const signInTime = dateObj.toLocaleTimeString();

  const formik = useFormik({
    initialValues: {
      name: 'Vasudev',
      location: 'Bengaluru',
      contact: '8888888888',
      altnumber: '0000000000',
      email: 'johndoe@gmail.com',
      qualification: 'B.E.',
      course: 'MERN stack',
      employed: 'Yes, Microsoft',
      aboutus: 'Got to know form Internet',
      branch: 'I.T',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify({ values, signInTime, day, month, year }, null, 2));
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
            helpertext={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helpertext={formik.touched.location && formik.errors.location}
          />
          <TextField
            fullWidth
            id="contact"
            name="contact"
            label="Contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helpertext={formik.touched.contact && formik.errors.contact}
          />
          <TextField
            fullWidth
            id="altnumber"
            name="altnumber"
            label="Alternate number"
            value={formik.values.altnumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.altnumber && Boolean(formik.errors.altnumber)}
            helpertext={formik.touched.altnumber && formik.errors.altnumber}
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
            helpertext={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="qualification"
            name="qualification"
            label="Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.qualification && Boolean(formik.errors.qualification)}
            helpertext={formik.touched.qualification && formik.errors.qualification}
          />
          <TextField
            fullWidth
            id="course"
            name="course"
            label="Course"
            value={formik.values.course}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.course && Boolean(formik.errors.course)}
            helpertext={formik.touched.course && formik.errors.course}
          />
          <TextField
            fullWidth
            id="employed"
            name="employed"
            label="Employed..? Organisation name"
            value={formik.values.employed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employed && Boolean(formik.errors.employed)}
            helpertext={formik.touched.employed && formik.errors.employed}
          />
          <TextField
            fullWidth
            id="aboutus"
            name="aboutus"
            label="How did you come to know about us?"
            value={formik.values.aboutus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.aboutus && Boolean(formik.errors.aboutus)}
            helpertext={formik.touched.aboutus && formik.errors.aboutus}
          />
          <TextField
            fullWidth
            id="branch"
            name="branch"
            label="Branch"
            value={formik.values.branch}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.branch && Boolean(formik.errors.branch)}
            helpertext={formik.touched.branch && formik.errors.branch}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            // onClick={handleClick}
          >
            Submit
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};

export default function NewEnquireyView() {
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

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography sx={{ pb: 2 }} variant="h4">
            Enquirey form
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
