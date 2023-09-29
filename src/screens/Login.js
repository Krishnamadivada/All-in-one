// Login.js
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
  Slide,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMessage, SetErrorMessage] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("email is required");
      return;
    }else if(!password){
      setPasswordError("password is required");
      return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setEmailError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("jhgfd", openSnackbar);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("error", error);
      SetErrorMessage(true);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    SetErrorMessage(false);
    setOpenSnackbar(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(225deg, #00C9FF, #92FE9D)",
        alignItems: "center",
        justifyContent: "center",
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
          Login
        </Typography>
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
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Login
        </Button>
        <Typography variant="body1" gutterBottom mt={3}>
          No Account? <Link to="/signup">Signup</Link>
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
          TransitionComponent={TransitionLeft}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={errorMessage ? "error" : "success"}>
            {errorMessage
              ? "Invalid username or password"
              : "Login successful!"}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Login;
