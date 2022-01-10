import { Theme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    primary: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["neutral"];
    primary: PaletteOptions["primary"];
    secondary: PaletteOptions["secondary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

declare module "@mui/styles" {
  interface DefaultTheme extends Theme {}
}
