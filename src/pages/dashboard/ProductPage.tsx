import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { voucherData } from "../../data/VoucherData";
import { VoucherCard } from "../../components";

const ProductPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddProduct = () => {
    navigate("/dashboard/products/add");
  };

  return (
    <Box pb={isMobile ? 10 : 0}>
      {" "}
      {/* Tambah padding bawah jika tombol fixed */}
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={500}>
          Product
        </Typography>

        {!isMobile && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Tambah Produk
          </Button>
        )}
      </Box>
      {/* List Voucher */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {voucherData.map((game) => (
          <VoucherCard key={game.id} name={game.name} image={game.image} />
        ))}
      </Box>
      {/* Mobile Floating Button */}
      {isMobile && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          p={2}
          bgcolor="#fff"
          boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
          zIndex={1000}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Tambah Produk
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductPage;
