import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import { Box, Container, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { CityTemperatureCard } from "../components/city-temperature-card";
import { MoistureLineChart } from "../components/moisture-line-chart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plant Soil Monitor" },
      {
        name: "description",
        content: "Simple frontend for viewing recent soil moisture readings from a plant pot.",
      },
      { property: "og:title", content: "Plant Soil Monitor" },
      {
        property: "og:description",
        content: "Simple frontend for viewing recent soil moisture readings from a plant pot.",
      },
    ],
  }),
  component: Index,
});

const mockedMoistureData = Array.from({ length: 80 }, (_, index) => {
  const baseTime = new Date("2026-04-22T08:00:00");
  baseTime.setMinutes(baseTime.getMinutes() + index * 15);

  return {
    timestamp: baseTime.toISOString(),
    moisture: 42 + Math.round(Math.sin(index / 4) * 10 + index * 0.4),
  };
});

function Index() {
  return (
    <Box component="main" sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <WaterDropOutlinedIcon color="primary" />
              <Typography variant="overline" color="primary.main">
                Plant pot monitor
              </Typography>
            </Stack>

            <Typography component="h1" variant="h2" sx={{ fontWeight: 700, maxWidth: 560 }}>
              Live soil moisture overview
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
              A minimal frontend that highlights the latest moisture readings while leaving data
              wiring open for your upcoming integration.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "320px minmax(0, 1fr)" },
              alignItems: "start",
            }}
          >
            <CityTemperatureCard />
            <MoistureLineChart data={mockedMoistureData} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
