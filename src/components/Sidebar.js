import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from '@mui/icons-material/Task';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloudIcon from '@mui/icons-material/Cloud';
import Logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Tasks", icon: <TaskIcon />, path: "/tasks" },
  { label: "Expenses", icon: <CurrencyRupeeIcon />, path: "/expense" },
  { label: "Weather", icon: <CloudIcon />, path: "/weather" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: 'none',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ background: '#F4F3FF', height: '100%' }}>
      <Toolbar
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img src={Logo} alt="logo" style={{ width: 150 }} />
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={location.pathname === item.path}
            onClick={() => handleItemClick(item.path)}
            style={{
              backgroundColor:
                location.pathname === item.path ? "#1976d2" : "initial",
              color: location.pathname === item.path ? "white" : "initial",
              margin: '0 10px',
              borderRadius: 9,
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "white" : "initial",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
