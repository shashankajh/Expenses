import React, { Component } from 'react';
import Userdetails from './Userdetails';
import Personaldetails from './Personaldetails';
import Expensesdetails from './Expensesdetails';
import Confirmdetails from './Confirmdetails';

export class Expenseform extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    city: '',
    budgetMonth: '',
    budgetYear: '',
    budgetAmount: '',
    debitCardSelected: false,
    creditCardSelected: false,
    creditCardLimit: '',
    totalBudgetAmount: 0,
    remainingBudget: 0,
    optionalExpenses: [{ description: '', amount: '' }],
  };

  // Method to calculate total budget amount
  calculateTotalBudget = () => {
    const { budgetAmount, creditCardSelected, creditCardLimit } = this.state;
    const totalBudgetAmount =
      parseFloat(budgetAmount || 0) +
      (creditCardSelected ? parseFloat(creditCardLimit || 0) : 0);
    this.setState({ totalBudgetAmount });
  };

  // Method to calculate remaining budget after expenses
  calculateRemainingBudget = (totalExpenses) => {
    const remainingBudget = this.state.totalBudgetAmount - totalExpenses;
    this.setState({ remainingBudget });
  };

  // Method to go to the next step
  nextStep = () => {
    const { step } = this.state;
    if (step === 2) this.calculateTotalBudget(); // Calculate total budget when moving from personal details to expenses
    this.setState({ step: step + 1 });
  };

  // Method to go to the previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // Handle fields change
  handleChange = input => e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [input]: value });
  };

  handleOptionalExpensesChange = (index, field) => e => {
    const newOptionalExpenses = [...this.state.optionalExpenses];
    newOptionalExpenses[index][field] = e.target.value;
    this.setState({ optionalExpenses: newOptionalExpenses });
  };

  addNewOptionalExpense = () => {
    this.setState({
      optionalExpenses: [
        ...this.state.optionalExpenses,
        { description: '', amount: '' },
      ],
    });
  };

  render() {
    const { step, totalBudgetAmount, remainingBudget, optionalExpenses } = this.state;
    const values = { ...this.state, totalBudgetAmount, remainingBudget, optionalExpenses };

    switch (step) {
      case 1:
        return (
          <Userdetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Personaldetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Expensesdetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleOptionalExpensesChange={this.handleOptionalExpensesChange}
            addNewOptionalExpense={this.addNewOptionalExpense}
            calculateRemainingBudget={this.calculateRemainingBudget}
            values={values}
          />
        );
      case 4:
          return (
            <Confirmdetails
              values={values}
              back={this.prevStep}
              confirm={this.handleConfirm}
            />
          );
      default:
        return null;
    }
  }
}

export default Expenseform;
