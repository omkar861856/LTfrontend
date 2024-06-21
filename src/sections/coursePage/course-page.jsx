import React from 'react';
import { Typography, Box } from '@mui/material';

function LearnMore(){
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learn More About the Program
      </Typography>
      <Typography variant="body1">
        Detailed information about the program goes here.
      </Typography>
    </Box>
  );
};

export default LearnMore;
