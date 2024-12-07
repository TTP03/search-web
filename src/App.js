import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  IconButton,
  Container,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setError("");
    try {
      const response = await axios.get(`http://localhost:3000/api/songs/search?q=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, bgcolor: "#f9fafb", p: 3, borderRadius: 2 }}>
      {/* Title */}
      <Typography variant="h3" align="center" gutterBottom sx={{ color: "#1976d2" }}>
        🎵 Song Search
      </Typography>

      {/* Search Box */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <TextField
          variant="outlined"
          placeholder="Search for songs, artists, or lyrics..."
          fullWidth
          sx={{
            maxWidth: 600,
            bgcolor: "#ffffff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          color="primary"
          size="large"
          onClick={handleSearch}
          sx={{ ml: 2, bgcolor: "#1976d2", color: "white", "&:hover": { bgcolor: "#1565c0" } }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Results */}
      <Box>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: "#e3f2fd",
                "&:hover": { bgcolor: "#bbdefb" },
                transition: "background-color 0.3s",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1976d2" }}>
                  {result._source.song}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Artist(s): {result._source.artists}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {result._source.lyrics.slice(0, 150)}...
                </Typography>
                <MuiLink
                  href={result._source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ mt: 1, display: "block", color: "primary.main" }}
                >
                  Listen here
                </MuiLink>
              </CardContent>
            </Card>
          ))
        ) : (
          query && (
            <Typography align="center" color="textSecondary" variant="body1">
              No results found.
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
};

export default App;
