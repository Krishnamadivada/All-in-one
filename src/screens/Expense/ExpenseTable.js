import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../../Features/expenseSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  return (
    <TableContainer component={Paper} sx={{mt: 2}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>S.no</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Amount</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Category</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Created At</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.budget_category}</TableCell>
              <TableCell>{expense.createdAt.toLocaleString()}</TableCell>
              <TableCell>
              <IconButton
                color='primary'
                onClick={() => dispatch(deleteExpense(expense.id))}
                sx={{backgroundColor: '#fff', boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)"}}
              >
                <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
