import { Typography, Paper, Box } from "@mui/material";

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={500} mb={3}>
        Dashboard Admin
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        <Paper
          elevation={3}
          sx={{
            flex: "1 1 300px",
            p: 2,
            minWidth: 250,
          }}
        >
          <Typography variant="subtitle1">Total Transaksi</Typography>
          <Typography variant="h6">Rp 25.000.000</Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: "1 1 300px",
            p: 2,
            minWidth: 250,
          }}
        >
          <Typography variant="subtitle1">Produk Aktif</Typography>
          <Typography variant="h6">53</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
