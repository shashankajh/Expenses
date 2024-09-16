import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export class Userdetails extends Component {
  handleClick = e => {
    e.preventDefault(); // Prevent default action

    const { values, nextStep } = this.props;
    const { firstName, lastName, email } = values;

    if (!firstName || !lastName || !email) {
      alert('Please fill in all fields');
    } else {
      nextStep();
    }
  };

  render() {
    const { values, handleChange } = this.props;

    // Check if all fields are filled
    const isDisabled = !values.firstName || !values.lastName || !values.email;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                User Details
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ paddingX: 4, paddingTop: 2, paddingBottom: 4 }}>
            <TextField
              placeholder="Enter your First Name"
              label="First Name"
              onChange={handleChange('firstName')}
              value={values.firstName}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              placeholder="Enter your Last Name"
              label="Last Name"
              onChange={handleChange('lastName')}
              value={values.lastName}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              placeholder="Enter your Email Address"
              label="Email"
              onChange={handleChange('email')}
              value={values.email}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <div
                onClick={this.handleClick}
                style={{
                  cursor: 'pointer', // Change cursor to pointer to mimic button behavior
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isDisabled} // Disable the button if any field is empty
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Box>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Userdetails;
