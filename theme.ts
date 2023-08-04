"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

const colors = {
  primary: {
    100: "#d4d4d4",
    200: "#a8a8a8",
    300: "#7d7d7d",
    400: "#515151",
    500: "#262626",
    600: "#1e1e1e",
    700: "#171717",
    800: "#0f0f0f",
    900: "#080808",
  },
  secondary: {
    100: "#fcfcfc",
    200: "#f9f9f9",
    300: "#f5f5f5",
    400: "#f2f2f2",
    500: "#efefef",
    600: "#bfbfbf",
    700: "#8f8f8f",
    800: "#606060",
    900: "#303030",
  },
  neutral: {
    100: "#e8e8e8",
    200: "#d1d1d1",
    300: "#bababa",
    400: "#a3a3a3",
    500: "#8c8c8c",
    600: "#707070",
    700: "#545454",
    800: "#383838",
    900: "#1c1c1c",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[100],
      dark: colors.primary[900],
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[100],
      dark: colors.secondary[900],
    },
    neutral: {
      main: colors.neutral[500],
      light: colors.neutral[200],
      dark: colors.neutral[900],
    },
  },
  typography: {},
});
