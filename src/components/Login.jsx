import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvder";
import { useNavigate } from "react-router-dom";
import Font from "./Font";

const Login = () => {
  const { error, setError, handleLogin } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      alert("some inputs are empty!");
      return;
    }
    const formData = new FormData();
    formData.append("email", loginForm.email);
    formData.append("password", loginForm.password);
    handleLogin(formData, loginForm.email, navigate);
  };

  return (
    <>
      <Font />
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
          margin: "18% 0 0 3%",
          border: "2px solid #1976D2",
          borderRadius: "20px",
          gap: "5px",
          padding: "30px 0",
        }}
        noValidate
        autoComplete="off"
      >
        <h2 className="text-center font-semibold text-xl">Login</h2>
        {error && (
          <span className="text-center text-red-700 font-bold text-xl">
            {error}
          </span>
        )}
        <TextField
          id="outlined-basic"
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </Box>
    </>
  );
};

export default Login;
