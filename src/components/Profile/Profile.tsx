import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { changePassword } from "../../api/api";
import NavBar from "../NavBar/NavBar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [errorMessage, setErrorMessage] = React.useState("");
  const [apiMessage, setApiMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await changePassword(data);
      setApiMessage(response);
      handleOpen();
    } catch (error) {
      setErrorMessage("error");
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <br />
        <br />
        <br />
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "rgba(220, 97, 6, 1)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambiar Contraseña
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Nueva Contraseña"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Repetir Contraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="repetir-contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Typography
              color="error"
              variant="body2"
              gutterBottom
              fontStyle="italic"
              mt={1}
            >
              {errorMessage}
            </Typography>
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
              Aceptar
            </Button>
          </Box>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{apiMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "teal" }}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
