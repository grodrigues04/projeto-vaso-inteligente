import { Droplet } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Reading = {
  moisture: number;
  timestamp: string;
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function MoistureLineChart() {
  const [chartData, setChartData] = useState<Reading[]>([]);

  function normalizeHumidity(value: number) {
    return Math.round(((1023 - value) / 1023) * 100);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://projeto-vaso-backend.onrender.com/dados_atuais");
        const data = await res.json();

        const normalized: Reading[] = Array.isArray(data)
          ? data.map((item: { umidade: number; data: string }) => ({
              moisture: normalizeHumidity(item.umidade),
              timestamp: item.data,
            }))
          : [];

        setChartData(normalized);
      } catch (err) {
        setChartData([]);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 7000);

    return () => clearInterval(interval);
  }, []);

  const values = chartData.map((entry) => entry.moisture);
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 100;
  const latestPoint = chartData[chartData.length - 1];

  const series = chartData.map((entry) => ({
    time: formatTimestamp(entry.timestamp),
    moisture: entry.moisture,
  }));

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm min-h-[420px]">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Leitor de umidade
            </p>
            <h2 className="mt-1 text-lg font-bold text-foreground">Últimas leituras</h2>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <Droplet className="h-4 w-4" />
          </div>
        </div>

        {chartData.length > 0 && latestPoint ? (
          <>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-5xl font-bold tracking-tight text-foreground">
                  {latestPoint.moisture.toFixed(1)}
                  <span className="ml-1 text-2xl font-medium text-muted-foreground">%</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Valor mais recente</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
                  <defs>
                    <linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="moistureStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(160 84% 39%)" />
                      <stop offset="100%" stopColor="hsl(142 71% 45%)" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 6"
                    vertical={false}
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    domain={[Math.max(0, minValue - 5), maxValue + 5]}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                  />
                  <Tooltip
                    cursor={{
                      stroke: "hsl(142 71% 45%)",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                    contentStyle={{
                      backgroundColor: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      boxShadow: "0 8px 24px -8px rgb(0 0 0 / 0.15)",
                      color: "var(--color-popover-foreground)",
                    }}
                    labelStyle={{ color: "var(--color-muted-foreground)", fontSize: 12 }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Umidade"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="url(#moistureStroke)"
                    strokeWidth={3}
                    fill="url(#moistureFill)"
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "hsl(142 71% 45%)",
                      stroke: "var(--color-background)",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No moisture readings available yet.</p>
        )}
      </div>
    </div>
  );
}
