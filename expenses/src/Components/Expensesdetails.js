import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

export class Expensesdetails extends Component {
  state = {
    alertMessage: '',
    openSnackbar: false,
  };

  calculateTotalExpenses = () => {
    const {
      monthlyRent,
      monthlyPetrolCost,
      monthlyElectricityBill,
      monthlyInternetBill,
      monthlyWaterBill,
      monthlyFoodExpenses,
      monthlyGroceriesExpenses,
      savingsGoal,
      investmentGoal,
    } = this.props.values;

    // Calculate fixed expenses
    const fixedExpenses = parseFloat(monthlyRent || 0)
      + parseFloat(monthlyPetrolCost || 0)
      + parseFloat(monthlyElectricityBill || 0)
      + parseFloat(monthlyInternetBill || 0)
      + parseFloat(monthlyWaterBill || 0)
      + parseFloat(monthlyFoodExpenses || 0)
      + parseFloat(monthlyGroceriesExpenses || 0);

    // Calculate optional expenses
    const optionalTotal = this.props.values.optionalExpenses.reduce(
      (total, expense) => total + parseFloat(expense.amount || 0),
      0
    );

    // Calculate financial goals
    const financialGoalsTotal = parseFloat(savingsGoal || 0) + parseFloat(investmentGoal || 0);

    return fixedExpenses + optionalTotal + financialGoalsTotal;
  };

  calculateRemainingBalance = () => {
    const { budgetAmount, creditCardLimit, creditCardSelected } = this.props.values;
    const totalBudget = parseFloat(budgetAmount || 0)
      + (creditCardSelected ? parseFloat(creditCardLimit || 0) : 0);

    return totalBudget - this.calculateTotalExpenses();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.values !== this.props.values) {
      const remainingBalance = this.calculateRemainingBalance();
      console.log('Remaining Balance:', remainingBalance); // Debugging line

      if (remainingBalance < 0) {
        const exceededAmount = -remainingBalance;
        const message = `Remaining balance is ${remainingBalance.toFixed(2)}. You have exceeded your budget by ${exceededAmount.toFixed(2)}. Please adjust your expenses.`;
        this.setState({ alertMessage: message, openSnackbar: true });
        this.scrollToAlert();
      } else {
        this.setState({ alertMessage: '', openSnackbar: false });
      }
    }
  }

  scrollToAlert = () => {
    const alertElement = document.getElementById('alert-message');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const { values, handleChange, handleOptionalExpensesChange, addNewOptionalExpense, prevStep, nextStep } = this.props;
    const { alertMessage, openSnackbar } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Expenses Details</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <Box sx={{ paddingX: 4, paddingTop: 2, paddingBottom: 4 }}>
            <Box
              sx={{
                backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp9Pvj6CutkvopcFcB1hyZc9RytVk7DufuUA&s)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: 3,
              }}
            >
              {/* Alert Message */}
              {alertMessage && (
                <Box id="alert-message" sx={{ marginBottom: 4 }}>
                  <Snackbar
                    open={openSnackbar}
                    onClose={this.handleCloseSnackbar}
                    message={alertMessage}
                    action={
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseSnackbar}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{
                      '.MuiSnackbarContent-root': {
                        backgroundColor: '#f44336',
                        color: '#fff',
                      },
                    }}
                    autoHideDuration={null} // Disables auto-hide
                  />
                </Box>
              )}

              {/* Form Fields */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Fixed Expenses
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Rent"
                    label="Monthly Rent"
                    onChange={handleChange('monthlyRent')}
                    value={values.monthlyRent}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Petrol Cost"
                    label="Monthly Petrol Cost"
                    onChange={handleChange('monthlyPetrolCost')}
                    value={values.monthlyPetrolCost}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Electricity Bill"
                    label="Monthly Electricity Bill"
                    onChange={handleChange('monthlyElectricityBill')}
                    value={values.monthlyElectricityBill}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Internet Bill"
                    label="Monthly Internet Bill"
                    onChange={handleChange('monthlyInternetBill')}
                    value={values.monthlyInternetBill}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Water Bill"
                    label="Monthly Water Bill"
                    onChange={handleChange('monthlyWaterBill')}
                    value={values.monthlyWaterBill}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Food Expenses"
                    label="Monthly Food Expenses"
                    onChange={handleChange('monthlyFoodExpenses')}
                    value={values.monthlyFoodExpenses}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Enter Monthly Groceries Expenses"
                    label="Monthly Groceries Expenses"
                    onChange={handleChange('monthlyGroceriesExpenses')}
                    value={values.monthlyGroceriesExpenses}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <br />

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Optional Expenses
              </Typography>

              {values.optionalExpenses.map((expense, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Optional Expense Description"
                      label="Optional Expense Description"
                      onChange={handleOptionalExpensesChange(index, 'description')}
                      value={expense.description}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      placeholder="Optional Expense Amount"
                      label="Optional Expense Amount"
                      onChange={handleOptionalExpensesChange(index, 'amount')}
                      value={expense.amount}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}

              <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={addNewOptionalExpense}>
                  Add New Optional Expense
                </Button>
              </Box>

              <br />

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Financial Goals
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Savings Goal"
                    label="Savings Goal"
                    onChange={handleChange('savingsGoal')}
                    value={values.savingsGoal}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Investment Goal"
                    label="Investment Goal"
                    onChange={handleChange('investmentGoal')}
                    value={values.investmentGoal}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <br />

              {/* Display Budget Information */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
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
                  <Typography variant="h6">Total Budget Amount: {parseFloat(values.budgetAmount || 0) + parseFloat(values.creditCardLimit || 0)}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Box sx={{ padding: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                  <Typography variant="h6">Remaining Balance: ${this.calculateRemainingBalance().toFixed(2)}</Typography>
                </Box>
              </Box>

              <Box sx={{ marginTop: 4 }}>
                <Button variant="contained" color="secondary" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.props.calculateRemainingBudget(this.calculateTotalExpenses());
                    nextStep();
                  }}
                  sx={{ marginLeft: 2 }}
                >
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

export default Expensesdetails;
