import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function MoistureLineChart({ data }) {
  console.log("Received moisture data:", data);
  const chartData = Array.isArray(data) ? data : [];
  const values = chartData.map((entry) => entry.moisture);
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 100;
  const latestPoint = chartData[chartData.length - 1];

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2, minHeight: 420 }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="overline" color="text.secondary">
              Soil moisture
            </Typography>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
              Last received readings
            </Typography>
          </Box>

          <Chip
            icon={<OpacityOutlinedIcon />}
            label={`${chartData.length} points`}
            color="primary"
            variant="outlined"
          />
        </Stack>

        {chartData.length > 0 ? (
          <>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Box>
                <Typography variant="h3" component="p" sx={{ fontWeight: 700 }}>
                  {latestPoint.moisture}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Most recent moisture value
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Range {minValue}%–{maxValue}%
              </Typography>
            </Stack>

            <Box sx={{ height: 300 }}>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: chartData.map((entry) => formatTimestamp(entry.timestamp)),
                  },
                ]}
                yAxis={[
                  {
                    min: Math.max(0, minValue - 5),
                    max: Math.min(100, maxValue + 5),
                  },
                ]}
                series={[
                  {
                    data: chartData.map((entry) => entry.moisture),
                    color: "#2e7d32",
                    area: true,
                    showMark: false,
                    curve: "monotoneX",
                  },
                ]}
                margin={{ left: 40, right: 20, top: 20, bottom: 30 }}
                grid={{ vertical: false, horizontal: true }}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No moisture readings available yet.
          </Typography>
        )}
      </Stack>
    </Card>
  );
}
