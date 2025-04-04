// Home.tsx
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CustomSlider, VoucherCard } from "../../components";
import { voucherData } from "../../data/VoucherData";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const filteredGames = voucherData.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        maxWidth: "1440px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
      }}
    >
      {/* Slider */}
      <CustomSlider />

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Cari game..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ my: 3 }}
      />

      {/* List Voucher */}
      <Typography variant="h6" mb={2}>
        List Voucher
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {filteredGames.map((game) => (
          <VoucherCard key={game.id} name={game.name} image={game.image} />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
