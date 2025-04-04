import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DashboardNavbar, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : drawerWidth,
          zIndex: 1100,
        }}
      >
        <DashboardNavbar onSidebarToggle={handleDrawerToggle} />
      </Box>

      {/* Konten Utama */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
          ml: isMobile ? 0 : `${drawerWidth}px`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
