import React from "react";
import theme from "./Theme";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Flights from "./pages/Flights";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const generalTheme = createTheme(theme);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={generalTheme}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/flights" element={<Flights />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
