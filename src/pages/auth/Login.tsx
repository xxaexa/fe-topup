import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login dengan:", { email, password });
    // Kirim ke backend / validasi sesuai kebutuhanmu
  };

  const handleDemoLogin = () => {
    setEmail("test@test.com");
    setPassword("test12345");
    console.log("Login dengan demo account");
    // Otomatis isi dan bisa langsung kirim ke backend kalau mau
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleDemoLogin}
          >
            Login with Demo Account
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mt: 3 }}
          >
            Mengalami masalah? Hubungi kami di{" "}
            <Typography component="span" color="primary" fontWeight={600}>
              admin@emailkamu.com
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
