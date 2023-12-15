import { Typography, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget } from '../../Features/budgetSlice';

const BudgetForm = () => {
  const dispatch = useDispatch();

  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { budgetName, budgetAmount });

    dispatch(addBudget({ name: budgetName, amount: parseFloat(budgetAmount) || 0 }));

    setBudgetName('');
    setBudgetAmount('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '30rem', boxShadow: "0px 0px 8px 4px  rgba(0,0,0,0.1)", padding: 20, borderRadius: 10 }}>
      <Typography variant='h5' fontWeight='bold'>
        Create Budget
      </Typography>
      <form onSubmit={handleBudgetSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        <TextField
          label="Budget Name"
          variant="outlined"
          value={budgetName}
          size='small'
          onChange={(e) => setBudgetName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          size='small'
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ width: '10rem' }}>
          Create Budget
        </Button>
      </form>
    </div>
  );
};

export default BudgetForm;
