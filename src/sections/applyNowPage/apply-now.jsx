import React from 'react';

import { Box, Typography } from '@mui/material';

function ApplyNow (){
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Apply Now
      </Typography>
      <Typography variant="body1">
        Application form and instructions go here.
      </Typography>
    </Box>
  );
};

export default ApplyNow;
