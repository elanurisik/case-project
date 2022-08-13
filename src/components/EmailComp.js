import { TextField } from "@mui/material";
import React from "react";

const EmailComp = ({
  email,
  setEmail,
  errorEmailText,
  setErrorEmailText,
  // variant = "standart",
}) => {
  const handleOnChange = (e) => {
    setEmail(e.target.value);
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (e.target.value.length === 0) setErrorEmailText("");
    else if (!validEmail.test(e.target.value)) {
      setErrorEmailText("Lütfen doğru bir mail adresi giriniz.");
    } else setErrorEmailText("");
  };
  return (
    <TextField
      error={!!errorEmailText}
      value={email}
      onChange={handleOnChange}
      fullWidth
      label="E-Posta"
      autoComplete={false}
      name="password"
      variant="outlined"
      helperText={errorEmailText}
    />
  );
};

export default EmailComp;
