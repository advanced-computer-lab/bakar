import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../components/Login/Login";
import axios from "../api";
import { useNavigate } from "react-router";

export default function SignUpSide() {
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let response = await axios.post("/users/register", {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),  
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email"),
      homeAddress: data.get("homeAddress"),
      passport: data.get("passport"),
      countryCode: data.get("countryCode"),
      phone: data.get("phoneNumber"),
    });
    console.log(response);
    localStorage.setItem("token", response.data);
    if (response.status === 200) {
      navigate("/flights");
    } else {
      navigate("/");
    }
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };
  return (
    <Grid container component={Paper} sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid
              container
              direction="row"
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="homeAddress"
              label="Home Address"
              id="homeAddress"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passport"
              label="Passport Number"
              id="passport"
            />
            <Grid
              container
              direction="row"
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  name="countryCode"
                  label="Country Code"
                  id="countryCode"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Copyright />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      />
    </Grid>
  );
}
