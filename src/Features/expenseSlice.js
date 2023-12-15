import { createSlice, nanoid } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      const { name , amount, budget_category } = action.payload;
      state.push({
        id: nanoid(),
        name,
        amount,
        budget_category,
        createdAt: new Date()
      });
    },
    deleteExpense: (state, action) => {
      const expenseId = action.payload;
      return state.filter(expense => expense.id !== expenseId);
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;