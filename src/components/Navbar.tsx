import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ColorModeContext } from "../theme/ThemeProvider"; // context untuk toggle tema

const Navbar = () => {
  const theme = useTheme(); // akses tema saat ini (light atau dark)
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // cek apakah tampilan mobile
  const colorMode = useContext(ColorModeContext); // akses fungsi toggle tema
  const [drawerOpen, setDrawerOpen] = useState(false); // state untuk drawer menu mobile

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Tracking", path: "/tracking" },
  ];

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    color: isActive ? theme.palette.secondary.main : theme.palette.text.primary,
  });

  const renderThemeToggle = () => (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.background.default, // latar belakang sesuai tema
          color: theme.palette.text.primary, // warna teks sesuai tema
        }}
        elevation={1} // sedikit shadow
      >
        <Toolbar
          sx={{
            maxWidth: "1440px", // batas lebar maksimal
            mx: "auto", // margin horizontal auto untuk center
            width: "100%",
            justifyContent: "space-between", // spasi antar elemen kiri dan kanan
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              // tombol menu hamburger di mobile
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            {/* Logo atau nama toko */}
            <NavLink to="/" style={navLinkStyle}>
              <Typography variant="h6">TokoSaya</Typography>
            </NavLink>
          </Box>

          {/* Navigasi desktop */}
          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} style={navLinkStyle}>
                  <Button color="inherit">{item.label}</Button>
                </NavLink>
              ))}
              {renderThemeToggle()}
            </Box>
          ) : (
            // hanya toggle tema jika mobile (karena navItem ada di drawer)
            renderThemeToggle()
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer untuk navigasi mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary, // warna teks drawer sesuai tema
                  "&.active": {
                    backgroundColor: theme.palette.primary.main, // highlight aktif
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
