import React from 'react';
import { useRouter } from 'src/routes/hooks';
import { Box, Grid, Paper, Button, Divider, Typography } from '@mui/material';

import PropTypes from 'prop-types';


const CourseCard = ({course}) => {
  const history = useRouter();

  const handleLearnMore = () => {
    history.push('/dashboard/courses/courselearnmore');
  };

  const handleApplyNow = () => {
    history.push('/dashboard/courses/applynow');
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#004d40', color: '#fff' }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {course.name}
        </Typography>
        <Typography variant="subtitle1">
          Learn with real work experience and get guaranteed placement as a Full-Stack or Backend Developer at product-based companies.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Project-led MERN or Backend Specialisation</Typography>
          <Typography variant="body1">Exterships with Real Tech Companies</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">DS, Algo, and System Design curriculum</Typography>
          <Typography variant="body1">Guaranteed Placement in top dev roles</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 4, backgroundColor: '#fff' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ backgroundColor: '#00695c', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Full Stack Specialisation</Typography>
            <Typography variant="body2">7 Professional Projects to learn with real work-experience (MongoDB, Express, React, NodeJS)</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ backgroundColor: '#00695c', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6">Backend Specialisation</Typography>
            <Typography variant="body2">5 Professional projects to learn with real work-experience (Core Java and Spring Boot)</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={handleLearnMore}>
          Learn More
        </Button>
        <Button variant="contained" color="secondary" onClick={handleApplyNow}>
          Apply Now
        </Button>
      </Box>
    </Paper>
  );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
      name: PropTypes.string.isRequired,
      // Add other required properties here
    }).isRequired,
  };

export default CourseCard;
