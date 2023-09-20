// Signup.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Popover,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    console.log("Email onBlur triggered");
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regex = re.test(String(email).toLowerCase());
    if (!regex) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    return regex;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePopoverOpen = () => {
    setAnchorEl(document.getElementById("password-field"));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    const valid = regex.test(password);

    if (!valid) {
      handlePopoverOpen(); // Open popover if password is invalid
    }

    return valid;
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_-]{3,16}$/; // Example: 3-16 characters, alphanumeric, hyphen, and underscore
    const valid = regex.test(username);

    if (!valid) {
      setUsernameError("Invalid username format");
    } else {
      setUsernameError("");
    }

    return valid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setUsernameError("Username is required");
      return;
    }

    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateUsername(username)
    ) {
      return;
    }

    setEmailError("");
    setPasswordError("");
    setUsernameError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      const user = userCredential.user;
      console.log("user", user);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      setOpenSnackbar(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(225deg, #00C9FF, #92FE9D)",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 4,
          boxShadow: 1,
          textAlign: "center",
          alignItems: "center",
          background: "#ffffff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <TextField
          type="text"
          required
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError("");
          }}
          error={Boolean(usernameError)}
          helperText={usernameError}
          onBlur={() => validateUsername(username)}
        />
        <TextField
          type="email"
          required
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          onBlur={() => validateEmail(email)}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          required
          size="small"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          id="password-field"
          onBlur={() => validatePassword(password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          sx={{ mt: 3 }}
        >
          Signup
        </Button>
        <Typography variant="body1" gutterBottom mt={3}>
          Already have an Account? <Link to="/">Login</Link>
        </Typography>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper sx={{ padding: 2, maxWidth: "320px" }}>
            <Typography sx={{ fontSize: 10, color: "red" }}>
              Password must be 6-12 characters and contain at least one
              uppercase, one lowercase, one number, and one special character.
            </Typography>
          </Paper>
        </Popover>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success">Signup successful!</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Signup;
