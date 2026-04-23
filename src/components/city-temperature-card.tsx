import { useEffect, useState } from "react";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Box, Card, Chip, CircularProgress, Stack, Typography } from "@mui/material";

type Weather = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
};

export function CityTemperatureCard() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-27.5954&longitude=-48.5480&current_weather=true&timezone=America%2FSao_Paulo",
        );

        const data = await response.json();

        const rawHumidity = data?.current_weather?.humidity ?? 0;

        const mapped: Weather = {
          city: "Florianópolis",
          temperature: Math.round(data.current_weather.temperature),
          condition: "Condições atuais",
          humidity: rawHumidity,
        };

        setWeather(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading || !weather) {
    return (
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="overline" color="text.secondary">
            Cidade temperatura
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <CircularProgress size={18} />
            <Typography variant="body2" color="text.secondary">
              Carregando dados do tempo...
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
              Temperatura da cidade
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <PlaceOutlinedIcon color="action" fontSize="small" />
              <Typography variant="body1">{weather.city}</Typography>
            </Stack>
          </Box>

          <Chip
            icon={<WbSunnyOutlinedIcon />}
            label={weather.condition}
            color="success"
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <ThermostatOutlinedIcon color="error" sx={{ fontSize: 44 }} />
          <Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 700 }}>
              {weather.temperature}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperatura atual
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}></Stack>
      </Stack>
    </Card>
  );
}
