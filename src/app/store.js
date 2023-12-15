import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/userSlice';
import budgetReducer from '../Features/budgetSlice';
import expenseReducer from '../Features/expenseSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    budgets: budgetReducer,
    expenses: expenseReducer,
  },
});

export default store;