import { Typography, CssBaseline, Box, Toolbar } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Settings = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Weather
        </Typography>
      </Box>
    </Box>
  );
};

export default Settings;
