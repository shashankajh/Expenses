import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export class Confirmdetails extends Component {
  state = {
    openToast: false,
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
      optionalExpenses,
      savingsGoal,
      investmentGoal,
    } = this.props.values;

    const fixedExpenses = parseFloat(monthlyRent || 0)
      + parseFloat(monthlyPetrolCost || 0)
      + parseFloat(monthlyElectricityBill || 0)
      + parseFloat(monthlyInternetBill || 0)
      + parseFloat(monthlyWaterBill || 0)
      + parseFloat(monthlyFoodExpenses || 0)
      + parseFloat(monthlyGroceriesExpenses || 0);

    const optionalTotal = optionalExpenses.reduce(
      (total, expense) => total + parseFloat(expense.amount || 0),
      0
    );

    const financialGoalsTotal = parseFloat(savingsGoal || 0) + parseFloat(investmentGoal || 0);

    return fixedExpenses + optionalTotal + financialGoalsTotal;
  };

  calculateRemainingBalance = () => {
    const { budgetAmount, creditCardLimit, creditCardSelected } = this.props.values;
    const totalBudget = parseFloat(budgetAmount || 0)
      + (creditCardSelected ? parseFloat(creditCardLimit || 0) : 0);

    return totalBudget - this.calculateTotalExpenses();
  };

  handleConfirm = () => {
    this.setState({ openToast: true });
    // Optionally, navigate to another page or perform an action here
  };

  handleCloseToast = () => {
    this.setState({ openToast: false });
  };

  render() {
    const { values, back } = this.props;
    const { openToast } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Confirm Details</Typography>
            </Toolbar>
          </AppBar>
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
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Review Your Expense Sheet
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title="Personal Information"
                      titleTypographyProps={{ variant: 'h6' }}
                      sx={{ backgroundColor: theme.palette.primary.main, color: '#fff' }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">Name: {`${values.firstName} ${values.lastName}`}</Typography>
                      <Typography variant="subtitle1">Email: {values.email}</Typography>
                      <Typography variant="subtitle1">Occupation: {values.occupation}</Typography>
                      <Typography variant="subtitle1">City: {values.city}</Typography>
                      <Typography variant="subtitle1">Budget Month: {values.budgetMonth}</Typography>
                      <Typography variant="subtitle1">Budget Year: {values.budgetYear}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Budget Summary"
                      titleTypographyProps={{ variant: 'h6' }}
                      sx={{ backgroundColor: theme.palette.primary.main, color: '#fff' }}
                    />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>Item</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.primary.main, color: '#fff' }}>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Budget Amount</TableCell>
                              <TableCell>${values.budgetAmount || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Credit Card Limit</TableCell>
                              <TableCell>${values.creditCardLimit || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Budget Amount</TableCell>
                              <TableCell>${parseFloat(values.budgetAmount || 0) + parseFloat(values.creditCardLimit || 0)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Expenses</TableCell>
                              <TableCell color={this.calculateRemainingBalance() < 0 ? 'error' : 'textPrimary'}>
                                ${this.calculateTotalExpenses().toFixed(2)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Remaining Balance</TableCell>
                              <TableCell color={this.calculateRemainingBalance() < 0 ? 'error' : 'textPrimary'}>
                                ${this.calculateRemainingBalance().toFixed(2)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader
                      title="Detailed Expenses"
                      titleTypographyProps={{ variant: 'h6' }}
                      sx={{ backgroundColor: theme.palette.secondary.main, color: '#fff' }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Fixed Expenses
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.secondary.main, color: '#fff' }}>Expense</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.secondary.main, color: '#fff' }}>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Monthly Rent</TableCell>
                              <TableCell>${values.monthlyRent || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Petrol Cost</TableCell>
                              <TableCell>${values.monthlyPetrolCost || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Electricity Bill</TableCell>
                              <TableCell>${values.monthlyElectricityBill || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Internet Bill</TableCell>
                              <TableCell>${values.monthlyInternetBill || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Water Bill</TableCell>
                              <TableCell>${values.monthlyWaterBill || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Food Expenses</TableCell>
                              <TableCell>${values.monthlyFoodExpenses || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Monthly Groceries Expenses</TableCell>
                              <TableCell>${values.monthlyGroceriesExpenses || 0}</TableCell>
                            </TableRow>
                            {values.optionalExpenses && values.optionalExpenses.length > 0 && (
                              <>
                                <TableRow>
                                  <TableCell colSpan={2} sx={{ fontWeight: 'bold', marginTop: 2 }}>Optional Expenses</TableCell>
                                </TableRow>
                                {values.optionalExpenses.map((expense, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{expense.description || "No Optional Expenses"}</TableCell>
                                    <TableCell>${expense.amount || 0}</TableCell>
                                  </TableRow>
                                ))}
                              </>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
                        Financial Goals
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.secondary.main, color: '#fff' }}>Goal</TableCell>
                              <TableCell sx={{ fontWeight: 'bold', backgroundColor: theme.palette.secondary.main, color: '#fff' }}>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Savings Goal</TableCell>
                              <TableCell>${values.savingsGoal || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Investment Goal</TableCell>
                              <TableCell>${values.investmentGoal || 0}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={back}
                >
                  Edit Details
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.handleConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Box>

          <Snackbar
            open={openToast}
            autoHideDuration={3000}
            onClose={this.handleCloseToast}
            action={
              <Button color="inherit" onClick={this.handleCloseToast}>
                Close
              </Button>
            }
          >
            <Alert onClose={this.handleCloseToast} severity="success">
              🎉 Confirmation Complete! Thank you.
            </Alert>
          </Snackbar>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Confirmdetails;
