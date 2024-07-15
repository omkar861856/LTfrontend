import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik, FormikProvider } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormHelperText } from '@mui/material';

import { enquiry_api } from 'src/services/userapi';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ----------------------------------------------------------------------

const backendUrl = enquiry_api;

// todays date

const today = new Date();

// Get the day of the month
let dd = today.getDate();

// Get the month (adding 1 because months are zero-based)
let mm = today.getMonth() + 1;

// Get the year
const yyyy = today.getFullYear();

// Add leading zero if the day is less than 10
if (dd < 10) {
  dd = `0${dd}`;
}

// Add leading zero if the month is less than 10
if (mm < 10) {
  mm = `0${mm}`;
}

// Format the date as dd/mm/yyyy and log it
const today_now = `${dd}/${mm}/${yyyy}`;

// ================= validation schema

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup.string().label('This').required(),
  location: yup.string().label('This').required(),
  contact: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  altnumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().label('This').required().email(),
  qualification: yup.string().label('This').required(),
  branch: yup.string().label('This').required(),
  course: yup.string().label('This').required(),
  employed: yup.string().label('This'),
  aboutUs: yup.string().label('This'),
  isEmployed: yup.bool().label('This').required(),
  isFresher: yup.bool().label('This').required(),
  preferredLocation: yup
    .string()
    .oneOf(['btm', 'marathahalli', 'online'])
    .required('You must select an option'),
  preferredBatch: yup
    .string()
    .oneOf(['weekdays', 'weekends'])
    .required('You must select an option'),
});

const RenderForm = () => {
  const [backendResponse, setBackendResponse] = useState();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      contact: '',
      altContact: '',
      email: '',
      qualification: '',
      course: '',
      organisation: '',
      aboutUs: '',
      isEmployed: '',
      branch: '',
      preferredLocation: '',
      isFresher: '',
      preferredBatch: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setBackendResponse(null);

      setTimeout(() => {
        //   alert(JSON.stringify({email:email,password:password}, null, 2));
        setLoading(true);
        setSubmitting(false);
      }, 0);

      (async () => {
        const url = `${backendUrl}/enquiry`;

        await axios
          .post(url, {
            ...values,
            creationDate: today,
          })
          .then((response) => {
            window.location.reload();
            if (response.data.msg === 'Enquiry registered') {
              alert(response.data.msg);
              setLoading(false);
            }
          })
          .catch((error) => {
            resetForm();
            alert(error);
            setBackendResponse('User not found');
          });
      })();
      // alert(JSON.stringify({email,password, login_location}, null, 2));
    },
  });

  return (
    <FormikProvider value={formik}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} mb={3}>
            {/* <div role="group" aria-labelledby="my-radio-group1">
                <label>
                  <Field type="radio" name="preferredLocation" value="btm" />
                  BTM
                </label>
                <label>
                  <Field type="radio" name="preferredLocation" value="marathahalli" />
                  Marathahalli
                </label>
                <label>
                  <Field type="radio" name="preferredLocation" value="online" />
                  Online
                </label>
              </div> */}

            <TextField
              required
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
              required
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
            <FormLabel id="demo-radio-buttons-group-label">Are you a Fresher?*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={null}
              name="isFresher"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.isFresher && Boolean(formik.errors.isFresher)}
              helpertext={formik.touched.isFresher && formik.errors.isFresher}
            >
              <FormControlLabel value control={<Radio required />} label="Yes" />
              <FormControlLabel value={false} control={<Radio required />} label="No" />
            </RadioGroup>
            <TextField
              fullWidth
              required
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
              id="altContact"
              name="altContact"
              label="Alternate number"
              value={formik.values.altContact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.altContact && Boolean(formik.errors.altContact)}
              helpertext={formik.touched.altContact && formik.errors.altContact}
            />
            <TextField
              fullWidth
              required
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helpertext={formik.touched.email && formik.errors.email}
            />
            <FormLabel id="demo-radio-buttons-group-label">Preferred Location*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="preferredLocation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.preferredLocation && Boolean(formik.errors.preferredLocation)}
              helpertext={formik.touched.preferredLocation && formik.errors.preferredLocation}
            >
              <FormControlLabel value="btm" control={<Radio required />} label="Btm" />
              <FormControlLabel
                value="marathahalli"
                control={<Radio required />}
                label="Marathahalli"
              />
              <FormControlLabel value="online" control={<Radio required />} label="Online" />
            </RadioGroup>
            <TextField
              required
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
              required
              id="branch"
              name="branch"
              label="Branch"
              value={formik.values.branch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.branch && Boolean(formik.errors.branch)}
              helpertext={formik.touched.branch && formik.errors.branch}
            />

            <FormLabel id="demo-radio-buttons-group-label">Are you Employed?*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="isEmployed"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.isEmployed && Boolean(formik.errors.isEmployed)}
              helpertext={formik.touched.isEmployed && formik.errors.isEmployed}
            >
              <FormControlLabel value control={<Radio required />} label="Yes" />
              <FormControlLabel value={false} control={<Radio required />} label="No" />
            </RadioGroup>
            {formik.values.isEmployed === 'true' ? (
              <TextField
                fullWidth
                required
                id="organisation"
                name="organisation"
                label="Employed organisation name"
                value={formik.values.organisation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.organisation && Boolean(formik.errors.organisation)}
                helpertext={formik.touched.organisation && formik.errors.organisation}
              />
            ) : null}

            <TextField
              fullWidth
              id="aboutUs"
              name="aboutUs"
              label="How did you come to know about us?"
              value={formik.values.aboutUs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aboutUs && Boolean(formik.errors.aboutUs)}
              helpertext={formik.touched.aboutUs && formik.errors.aboutUs}
            />

            {/* <TextField
              fullWidth
              required
              id="course"
              name="course"
              label="Course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.course && Boolean(formik.errors.course)}
              helpertext={formik.touched.course && formik.errors.course}
            /> */}

            <FormControl fullWidth error={formik.touched.course && Boolean(formik.errors.course)}>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                required
                labelId="course-label"
                id="course"
                name="course"
                value={formik.values.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Course"
              >
                <MenuItem value="aws">AWS</MenuItem>
                <MenuItem value="android">Android</MenuItem>
                <MenuItem value="big data masters program data analytics">
                  Big Data Masters Program Data Analytics
                </MenuItem>
                <MenuItem value="data science python">Data Science Python</MenuItem>
                <MenuItem value="devops">Devops</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="javascript">Javascript</MenuItem>
                <MenuItem value="power bi">Power Bi</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="react js">React Js</MenuItem>
                <MenuItem value="software training">Software Training</MenuItem>
                <MenuItem value="sql">SQL</MenuItem>
                <MenuItem value="tableau">Tableau</MenuItem>
              </Select>
              {formik.touched.course && formik.errors.course ? (
                <FormHelperText>{formik.errors.course}</FormHelperText>
              ) : null}
            </FormControl>

            <FormLabel id="demo-radio-buttons-group-label">Preferred Batch*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="preferredBatch"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.preferredBatch && Boolean(formik.errors.preferredBatch)}
              helpertext={formik.touched.preferredBatch && formik.errors.preferredBatch}
            >
              <FormControlLabel value="weekdays" control={<Radio required />} label="Weekdays" />
              <FormControlLabel value="weekends" control={<Radio required />} label="Weekends" />
            </RadioGroup>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              // onClick={handleClick}
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </div>
    </FormikProvider>
  );
};

export default function NewEnquireyView() {
  return (
    <Box>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 620,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography sx={{ pb: 2 }} variant="h4">
                Enquiry form
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ pb: 2 }} variant="h6">
                {today_now}
              </Typography>
            </Grid>
          </Grid>

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
