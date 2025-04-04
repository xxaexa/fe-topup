import { Box } from "@mui/material";
import { Navbar, Footer } from "../../components";
import { Outlet } from "react-router-dom";

const StoreLayout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default StoreLayout;
