import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

function Historico() {
  const [dados, setDados] = useState(null)

  function formatarUmidade(umidade) {
    return Math.round(((1024 - umidade) / 1023) * 100);
  }

  function formatarDataCompleta(timestamp) {
    const date = new Date(timestamp);

    if (isNaN(date)) return '';

    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  function processarDados(data) {
    const ordenado = [...data].sort(
      (a, b) => new Date(a.data) - new Date(b.data)
    );

    const dadosProcessados = ordenado.map(item => ({
      umidade: formatarUmidade(item.umidade),
      timestamp: new Date(item.data).getTime()
    }));

    setDados(dadosProcessados);
  }

  useEffect(() => {
    async function buscarHistorico() {
      try {
        const response = await fetch('https://projeto-vaso-backend.onrender.com/historico');
        const data = await response.json();
        console.log('Dados do histórico:', data);
        processarDados(data.historico);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    }
    buscarHistorico()
    const interval = setInterval(buscarHistorico, 10000)
  }, []);

  return (
    <>
      {dados && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="timestamp"
              tickFormatter={formatarDataCompleta}
              minTickGap={20}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              labelFormatter={(value) => formatarDataCompleta(value)}
              formatter={(value) => `${value}%`}
            />

            <Line
              type="monotone"
              dataKey="umidade"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default Historico;
