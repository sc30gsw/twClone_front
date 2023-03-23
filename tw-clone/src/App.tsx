import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const App = () => {
  const theme = createTheme({ palette: { primary: { main: "#0000ff" } } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
