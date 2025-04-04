import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

const dummyOrder = {
  id: "ff",
  name: "Free Fire",
  image: "/assets/ff.jpg",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ab quaerat sunt ipsa amet, libero explicabo, voluptatum eaque laudantium voluptas est? Maiores at, quia saepe dolorum incidunt neque! Iste, totam.",
  inputs: [{ label: "User ID", name: "userId" }],
  options: [
    {
      id: "ff-1",
      label: "35 Diamonds",
      icon: "🔥",
      price: 8000,
      type: "satuan",
    },
    {
      id: "ff-2",
      label: "70 Diamonds",
      icon: "🔥",
      price: 16000,
      type: "package",
    },
    {
      id: "ff-3",
      label: "140 Diamonds",
      icon: "🔥",
      price: 32000,
      type: "package",
    },
  ],
};

const TrackPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const handleSubmit = () => {
    if (orderId === dummyOrder.id) {
      setOrderData(dummyOrder);
    } else {
      setOrderData(null);
    }
  };

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cek Status Pesanan
        </Typography>

        <Box display="flex" gap={2} mb={4}>
          <TextField
            fullWidth
            label="Masukkan Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Cek
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {orderData ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Detail Pesanan
            </Typography>

            <Box
              component="img"
              src={orderData.image}
              alt={orderData.name}
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {orderData.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              {orderData.description}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Item yang Dibeli:
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
              {orderData.options.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    bgcolor: "#fff",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item.icon} {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Harga: Rp {item.price.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          orderId && (
            <Typography variant="body1" color="error">
              Data pesanan tidak ditemukan.
            </Typography>
          )
        )}
      </Container>
    </Box>
  );
};

export default TrackPage;
