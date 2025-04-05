import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import VoucherForm from "../../components/VoucherForm";
import { useGetVoucherByIdQuery } from "../../redux/api/voucherApi";

const VoucherPage = () => {
  const { gameName } = useParams();
  const { data, isLoading, isError } = useGetVoucherByIdQuery(gameName || "");
  console.log(data);
  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading.....</Typography>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Gagal memuat data game atau game tidak ditemukan.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* left - Info Game */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 33%" }}>
          <img
            src={data.image}
            alt={data.name}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
          />
          <Typography variant="h6" gutterBottom>
            {data.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography> */}
        </Box>

        {/* right - Form Voucher */}
        <Box flex={{ xs: "1 1 100%", md: "1 1 66%" }}>
          <VoucherForm game={data} />
        </Box>
      </Box>
    </Container>
  );
};

export default VoucherPage;
