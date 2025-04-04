// src/components/ThemeProviderWrapper.tsx
import { createContext, useMemo, useState, ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#4F46E5",
          },
          secondary: {
            main: "#10B981",
          },
          background: {
            default: mode === "light" ? "#F9FAFB" : "#111827",
            paper: mode === "light" ? "#FFFFFF" : "#1F2937",
          },
          text: {
            primary: mode === "light" ? "#111827" : "#F3F4F6",
            secondary: mode === "light" ? "#6B7280" : "#9CA3AF", // abu-abu mid untuk kontras lembut
          },
        },

        typography: {
          fontFamily: "Roboto, sans-serif",
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440,
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
