import React from "react";
import { theme } from "./ui/theme";

import { ThemeProvider } from "@mui/material";
import { Estimates } from "./features/estimates/Estimates";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Estimates />
      </div>
    </ThemeProvider>
  );
};

export default App;
