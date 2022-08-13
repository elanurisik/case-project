import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailComp from "../components/EmailComp";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorEmailText, setErrorEmailText] = useState("");
  const [errorMessage, setErrorMessage] = useState({ text: "", color: "" });
  const [open, setOpen] = useState(false);

  const handleClick = (body = { email, password }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    fetch(`https://62cf30a0486b6ce82653e89a.mockapi.io/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
        if ((data.success = true))
          window.localStorage.setItem("token", data?.token);
        setErrorMessage({ text: "Giriş başarılı", color: "success" });
        setOpen(true);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 7,
      }}
    >
      <Card sx={{ width: "375px" }}>
        <CardHeader title="Giriş Yap" />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <EmailComp
                  email={email}
                  setEmail={setEmail}
                  errorEmailText={errorEmailText}
                  setErrorEmailText={setErrorEmailText}
                />
              </Grid>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
              >
                <Alert
                  onClose={() => setOpen(false)}
                  severity={errorMessage?.color}
                  sx={{ width: "100%" }}
                >
                  {errorMessage?.text}
                </Alert>
              </Snackbar>
              <Grid item>
                <TextField
                  type="password"
                  label="Şifre"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    if (email.length > 0 && password.length > 0) {
                      handleClick();
                    } else {
                      setOpen(true);
                      setErrorMessage({
                        text: "Eksik alan girildi",
                        color: "error",
                      });
                    }
                  }}
                >
                  Giriş Yap
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Login;
