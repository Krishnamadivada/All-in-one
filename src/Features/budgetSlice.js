
import { createSlice, nanoid } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: [],
  reducers: {
    addBudget: (state, action) => {
      const { name , amount } = action.payload;
      state.push({
        id: nanoid(),
        name,
        amount,
        createdAt: new Date()
      });
    },
    deleteBudget: (state, action) => {
      const budgetId = action.payload;
      return state.filter(budget => budget.id !== budgetId);
    },
  },
});

export const { addBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
