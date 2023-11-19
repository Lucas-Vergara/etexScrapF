import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthenticationError, login } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [shake, setShake] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setShake(false);
      const response = await login(formData);
      const access_token = response.access_token;
      console.log(response);

      localStorage.setItem("access_token", access_token);
      navigate("/");
    } catch (error) {
      if (error instanceof AuthenticationError) {
        setErrorMessage("*Credenciales incorrectas");
      } else {
        console.error("Error al iniciar sesión:", error);
      }
      errorMessage && setShake(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "rgba(220, 97, 6, 1)" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label=""
            /> */}
          {errorMessage && (
            <Typography
              color="error"
              variant="body2"
              gutterBottom
              fontStyle="italic"
              className={shake ? "shake" : ""}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "rgba(220, 97, 6, 1)",
              "&:hover": {
                backgroundColor: "rgba(242, 121, 53)",
              },
            }}
          >
            Iniciar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
