import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import App from "./App";
import ProtectedRoutes from "./protectedRoutes";
import Tasks from "./screens/Tasks";
import Expense from "./screens/Expense/Expense";
import Weather from "./screens/Weather/Weather";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/weather" element={<Weather />} />
      </Route>
    </Route>
  )
);

export default router;
