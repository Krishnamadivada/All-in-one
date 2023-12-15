import { Typography, Grid, Paper, IconButton } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBudget } from '../../Features/budgetSlice';
import { deleteExpense } from '../../Features/expenseSlice';

const ExistingBudgets = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budgets);
  const expenses = useSelector((state) => state.expenses);

  const calBudgetSpent = (category) => {
    const budgetSpent = expenses.reduce((acc, expense) => {
      if (expense.budget_category !== category) return acc;
      return acc + expense.amount;
    }, 0);
    return budgetSpent;
  };

  const spent = () => {
    return budgets.map((budget) => {
      return calBudgetSpent(budget.name);
    });
  };

  const handleDeleteBudget = (budgetId) => {
    const budgetToDelete = budgets.find((budget) => budget.id === budgetId);
    if (budgetToDelete) {
      const expensesToDelete = expenses.filter((expense) => expense.budget_category === budgetToDelete.name);
      expensesToDelete.forEach((expense) => {
        dispatch(deleteExpense(expense.id));
      });
    }
    dispatch(deleteBudget(budgetId));
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Grid container spacing={3} mt={1}>
      {budgets.map((budget, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper style={{ padding: 10, boxShadow: "0px 0px 8px 4px rgba(0,0,0,0.1)", borderLeft: '4px solid blue', color: getRandomColor(), borderRadius: 10}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">{budget.name}</Typography>
              <Typography>Budget: ₹ {budget.amount}</Typography>
              </div>
              <progress max={budget.amount} value={spent()[index]} style={{width: '100%'}} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='caption'>₹ {spent()[index]} spent</Typography>
              <Typography variant='caption'>₹ {budget.amount - spent()[index]} remaining</Typography>
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <IconButton
                color='primary'
                onClick={() => handleDeleteBudget(budget.id)}
                sx={{backgroundColor: '#fff', boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)"}}
              >
                <DeleteIcon />
              </IconButton>
              </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExistingBudgets;
