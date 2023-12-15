import { Box, CssBaseline, Typography, Toolbar, Grid } from '@mui/material'
import React from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import BudgetForm from './BudgetForm'
import ExpenseForm from './ExpenseForm'
import ExistingBudgets from './ExistingBudgets'
import ExpenseTable from './ExpenseTable'

const Expense = () => {

  const user = useSelector((state) => state.user.user);
  const budgets = useSelector((state) => state.budgets);
  const expenses = useSelector((state) => state.expenses);

  return (
    <Box sx={{ display: "flex" }}>
        <CssBaseline/>
        <Topbar/>
        <Sidebar/>
        <Box 
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: '#5B50FF' }}>
               Hello, {user.displayName}
            </Typography>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={6}>
                <BudgetForm />
            </Grid>
            {budgets.length > 0 && (
            <Grid item xs={12} sm={6}>
              <ExpenseForm />
            </Grid>
            )}
           </Grid>
            {budgets.length > 0 && (
              <>
              <Typography variant='h5' mt={5} fontWeight='bold'>
              Existing Budgets
             </Typography>
              <ExistingBudgets/>
              </>
            )}
            {expenses.length > 0 && (
              <>
              <Typography variant='h5' mt={5} fontWeight='bold'>
                Recent Expenses
              </Typography>
              <ExpenseTable/>
              </>
            )}
          </Box>
    </Box>
  )
}

export default Expense