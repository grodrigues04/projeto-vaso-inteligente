import { useEffect, useState } from "react";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Box, Card, Chip, CircularProgress, Stack, Typography } from "@mui/material";

const mockedWeatherResponse = {
  city: "Copenhagen",
  temperature: 19,
  condition: "Mild breeze",
  humidity: 58,
};

export function CityTemperatureCard() {
  const [weather] = useState(mockedWeatherResponse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="overline" color="text.secondary">
            City temperature
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Loading current conditions…
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="overline" color="text.secondary">
              City temperature
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <PlaceOutlinedIcon color="action" fontSize="small" />
              <Typography variant="body1">{weather.city}</Typography>
            </Stack>
          </Box>

          <Chip icon={<WbSunnyOutlinedIcon />} label={weather.condition} color="success" variant="outlined" />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <ThermostatOutlinedIcon color="error" sx={{ fontSize: 44 }} />
          <Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 700 }}>
              {weather.temperature}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mocked API response for the current city reading
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Chip icon={<AirOutlinedIcon />} label={weather.condition} variant="outlined" />
          <Chip icon={<WbSunnyOutlinedIcon />} label={`${weather.humidity}% humidity`} variant="outlined" />
        </Stack>
      </Stack>
    </Card>
  );
}