import React from "react";
import theme from "./Theme";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import Flights from "./pages/Flights";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const generalTheme = createTheme(theme);

function App() {
  return (
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
  );
}

export default App;
