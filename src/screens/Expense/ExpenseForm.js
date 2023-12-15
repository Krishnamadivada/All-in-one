import { Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../Features/expenseSlice';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState('');
  const budgets = useSelector((state) => state.budgets);

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
          console.log('Form submitted:', { expenseName, expenseAmount, selectedBudgetCategory });
          dispatch(addExpense({ name: expenseName, amount: parseFloat(expenseAmount) || 0, budget_category: selectedBudgetCategory }))
          setExpenseName('');
          setExpenseAmount('');
          setSelectedBudgetCategory('');
      };

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '30rem', boxShadow: "0px 0px 8px 4px  rgba(0,0,0,0.1)", padding: 20, borderRadius: 10 }}>
      <Typography variant='h5' fontWeight='bold'>
        Create Expense
      </Typography>
    <form onSubmit={handleExpenseSubmit} style={{display: 'flex', flexDirection: 'column', marginTop: 10 }}>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextField
        label="Expense Name"
        variant="outlined"
        value={expenseName}
        size='small'
        onChange={(e) => setExpenseName(e.target.value)}
        sx={{mb: 2, width: '13rem'}}
      />
      <TextField
        label="Amount"
        type="number"
        variant="outlined"
        size='small'
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        sx={{mb: 2, width: '13rem'}}
      />
      </div>
      <FormControl>
      <InputLabel id="budget-category">Budget Category</InputLabel>
      <Select
        value={selectedBudgetCategory}
        variant="outlined"
        labelId="budget-category"
        label= 'Budget Category'
        size="small"
        onChange={(e) => setSelectedBudgetCategory(e.target.value)}
        sx={{mb: 2}}
      >
        {budgets.map((budget, index) => (
           <MenuItem key={index} value={budget.name}>{budget.name}</MenuItem> 
        ))}
      </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" sx={{width: '12rem'}}>
        Create Expense
      </Button>
    </form>
    </div>
  )
}

export default ExpenseForm