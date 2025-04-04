import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { ColorModeContext } from "../theme/ThemeProvider";

const DashboardNavbar = ({
  onSidebarToggle,
}: {
  onSidebarToggle: () => void;
}) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onSidebarToggle}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          Admin Dashboard
        </Typography>

        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
