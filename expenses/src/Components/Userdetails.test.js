// Userdetails.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Update this line
import Userdetails from './Userdetails'; // Adjust the path as needed

describe('Userdetails Component', () => {
  // Mock the nextStep and handleChange functions
  const mockNextStep = jest.fn();
  const mockHandleChange = jest.fn().mockImplementation((field) => (e) => {
    // Simulate setting values
    const { value } = e.target;
    mockHandleChange.mock.calls.forEach(([key]) => {
      if (key === field) {
        e.target.value = value;
      }
    });
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  };

  test('renders Userdetails component correctly', () => {
    render(
      <Userdetails
        values={initialValues}
        handleChange={mockHandleChange}
        nextStep={mockNextStep}
      />
    );

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/continue/i)).toBeInTheDocument();
  });

  test('shows alert when fields are empty and Continue is clicked', () => {
    // Spy on the alert function
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Userdetails
        values={initialValues}
        handleChange={mockHandleChange}
        nextStep={mockNextStep}
      />
    );

    fireEvent.click(screen.getByText(/continue/i));

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
    jest.restoreAllMocks();
  });

  test('calls nextStep when all fields are filled and Continue is clicked', () => {
    render(
      <Userdetails
        values={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }}
        handleChange={mockHandleChange}
        nextStep={mockNextStep}
      />
    );

    fireEvent.click(screen.getByText(/continue/i));

    expect(mockNextStep).toHaveBeenCalled();
  });

  test('disables Continue button when fields are empty', () => {
    render(
      <Userdetails
        values={initialValues}
        handleChange={mockHandleChange}
        nextStep={mockNextStep}
      />
    );

    expect(screen.getByText(/continue/i)).toBeDisabled();
  });

  test('enables Continue button when all fields are filled', () => {
    render(
      <Userdetails
        values={{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }}
        handleChange={mockHandleChange}
        nextStep={mockNextStep}
      />
    );

    expect(screen.getByText(/continue/i)).toBeEnabled();
  });
});

//Note :
//If you want to ensure that clicking the "Continue" button displays an alert even when the button is disabled, you can use a workaround. Here’s how you can handle it:

//Wrap the button in a div that will handle the click event and show an alert if fields are empty.
//Conditionally render the button so it looks like a button but is not clickable when disabled.