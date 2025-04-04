import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import VoucherForm from "../../components/VoucherForm";
import { voucherData } from "../../data/VoucherData";

const VoucherPage = () => {
  const { gameId } = useParams();
  const selectedGame = voucherData.find((game) => game.name === gameId);

  if (!selectedGame) {
    return (
      <Container>
        <Typography variant="h5" mt={4} textAlign="center">
          Game tidak ditemukan 😥
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Kiri - Info Game */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 33%" }}>
          <img
            src={selectedGame.image}
            alt={selectedGame.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <Typography variant="h6" gutterBottom>
            {selectedGame.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedGame.description}
          </Typography>
        </Box>

        {/* Kanan - Form Voucher */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 66%" }}>
          <VoucherForm game={selectedGame} />
        </Box>
      </Box>
    </Container>
  );
};

export default VoucherPage;
