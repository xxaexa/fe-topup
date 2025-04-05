// Home.tsx
import { Box, Skeleton, TextField } from "@mui/material";
import { useState } from "react";
import { CustomSlider, VoucherCard } from "../../components";
import { useGetVouchersQuery } from "../../redux/api/voucherApi";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data: vouchers = [], isLoading } = useGetVouchersQuery();

  const filteredGames = vouchers.filter((game) =>
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

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width={250}
                height={300}
                animation="wave"
                sx={{ borderRadius: 2 }}
              />
            ))
          : filteredGames.map((game) => (
              <VoucherCard key={game._id} name={game.name} image={game.image} />
            ))}
      </Box>
    </Box>
  );
};

export default HomePage;
