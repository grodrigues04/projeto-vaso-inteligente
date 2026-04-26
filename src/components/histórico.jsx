import { useEffect, useState } from "react";

function Temperatura() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("Temperatura component renderizado", weather);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-27.5954&longitude=-48.5480&current_weather=true&timezone=America%2FSao_Paulo"
        );
        const dados = await response.json();
        setWeather(dados.current_weather);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loader">Carregando...</div>;

  return (
    <div>
      <h2>Temperatura atual: {weather.temperature}°C</h2>
    </div>
  );
}

export default Temperatura;