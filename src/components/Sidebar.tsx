import {
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Button,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token_type");
    window.location.href = "/login";
  };

  const navItems = [
    { text: "Home", path: "/dashboard" },
    { text: "Produk", path: "/dashboard/products" },
    { text: "Transaksi", path: "/dashboard/transactions" },
  ];

  const drawerContent = (
    <Box
      width={drawerWidth}
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: "100%",
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mb: 1,
                bgcolor:
                  location.pathname === item.path
                    ? "primary.light"
                    : "transparent",
                "&:hover": { bgcolor: "primary.light" },
                color: "text.primary",
                textDecoration: "none",
              }}
              onClick={() => isMobile && handleDrawerToggle()}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Tombol Logout */}
      <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <>
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        pt={{ xs: 7, sm: 8 }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          height: "100vh",
          bgcolor: "background.default", // Warna sidebar sama dengan navbar
          borderRight: `1px solid ${theme.palette.divider}`,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1200,
          boxShadow: 1,
        }}
      >
        {drawerContent}
      </Box>
    </>
  );
};

export default Sidebar;
