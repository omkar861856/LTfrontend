import { useState } from 'react';

import { createTheme } from '@mui/material/styles';
import { Grid, StyledEngineProvider } from '@mui/material';

import EnquiryTable from './components/table';

function AllEnquiryView() {
  const [darkMode, setDarkMode] = useState(true);

  // create a darkTheme function to handle dark theme using createTheme
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1 className="text-3xl font-bold underline">All Enquirys</h1>
        </Grid>
        {/* <Grid item xs={4}>
          <button
            type="button"
            onClick={() => {
              toggleDarkMode();
            }}
          >
            {darkMode ? <LightModeIcon /> : <NightlightRoundIcon />}
          </button>
        </Grid> */}
        <Grid item xs={12}>
          <StyledEngineProvider injectFirst>
            <EnquiryTable />
          </StyledEngineProvider>
        </Grid>
      </Grid>
      {/* <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{JSON.stringify(notification)}</li>
        ))}
      </ul> */}
    </>
  );
}

export default AllEnquiryView;
