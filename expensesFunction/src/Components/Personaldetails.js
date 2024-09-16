import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

export class Personaldetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  calculateBudgetAmount = () => {
    const { budgetAmount, creditCardSelected, creditCardLimit } = this.props.values;
    return (
      parseFloat(budgetAmount || 0) +
      (creditCardSelected ? parseFloat(creditCardLimit || 0) : 0)
    );
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Personal Details</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <Box sx={{ paddingX: 4, paddingTop: 2, paddingBottom: 4 }}>
          <Box
  sx={{
    backgroundImage: 'url(https://img.freepik.com/free-vector/education-background-with-pencil_53876-115369.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723507200&semt=ais_hybrid)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
minHeight: '100vh', // Ensure the background covers the full viewport height
    padding: 3,
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
    <Typography variant="h6" sx={{ marginRight: 2 }}>
      Select Source of Expense:
    </Typography>
    <FormControlLabel
      control={
        <Checkbox
          checked={values.debitCardSelected}
          onChange={handleChange('debitCardSelected')}
          color="primary"
        />
      }
      label="Debit Card"
      sx={{ marginRight: 2 }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={values.creditCardSelected}
          onChange={handleChange('creditCardSelected')}
          color="primary"
        />
      }
      label="Credit Card"
    />
  </Box>

  <TextField
    placeholder="Enter your Occupation"
    label="Occupation"
    onChange={handleChange('occupation')}
    value={values.occupation}
    fullWidth
    sx={{ marginBottom: 2 }}
  />
  <TextField
    placeholder="Enter your City"
    label="City"
    onChange={handleChange('city')}
    value={values.city}
    fullWidth
    sx={{ marginBottom: 2 }}
  />
  <TextField
    placeholder="Enter your Budget Month"
    label="Budget Month"
    onChange={handleChange('budgetMonth')}
    value={values.budgetMonth}
    fullWidth
    sx={{ marginBottom: 2 }}
  />
  <TextField
    placeholder="Enter your Budget Year"
    label="Budget Year"
    onChange={handleChange('budgetYear')}
    value={values.budgetYear}
    fullWidth
    sx={{ marginBottom: 2 }}
  />

  {values.debitCardSelected && (
    <TextField
      placeholder="Enter your Budget Amount"
      label="Budget Amount"
      onChange={handleChange('budgetAmount')}
      value={values.budgetAmount}
      fullWidth
      sx={{ marginBottom: 2 }}
    />
  )}

  {values.creditCardSelected && (
    <TextField
      placeholder="Enter your Credit Card Limit"
      label="Credit Card Limit"
      onChange={handleChange('creditCardLimit')}
      value={values.creditCardLimit}
      fullWidth
      sx={{ marginBottom: 2 }}
    />
  )}

  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
    {values.debitCardSelected && (
      <Box
        sx={{
          paddingX: 2,
          padding: 2,
          backgroundColor: '#c5e1a5',
          borderRadius: 1,
          width: '30%',
        }}
      >
        <Typography variant="h6">Budget Amount: {values.budgetAmount}</Typography>
      </Box>
    )}

    {values.creditCardSelected && (
      <Box
        sx={{
          paddingX: 2,
          padding: 2,
          backgroundColor: '#ffcc80',
          borderRadius: 1,
          width: '30%',
        }}
      >
        <Typography variant="h6">Credit Card Limit: {values.creditCardLimit}</Typography>
      </Box>
    )}

    <Box
      sx={{
        paddingX: 2,
        padding: 2,
        backgroundColor: '#b3e5fc',
        borderRadius: 1,
        width: '30%',
      }}
    >
      <Typography variant="h6">Total Budget Amount: {this.calculateBudgetAmount()}</Typography>
    </Box>
  </Box>

  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
    <Button color="primary" variant="contained" onClick={this.back}>
      Back
    </Button>
    <Button color="primary" variant="contained" onClick={this.continue}>
      Continue
    </Button>
  </Box>
</Box>

          </Box>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Personaldetails;
