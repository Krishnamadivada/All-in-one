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
import Weather from "./screens/Weather";
import Logout from "./screens/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Route>
  )
);

export default router;
