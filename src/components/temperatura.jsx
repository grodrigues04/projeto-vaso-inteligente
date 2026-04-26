import { useEffect, useState } from "react";

function Temperatura() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="container">
      <style>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .card {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          width: 320px;
          border-radius: 25px;
          padding: 30px;
          color: white;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .header {
          margin-bottom: 30px;
        }

        .city {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .region {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .temp-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .temp-value {
          font-size: 4.5rem;
          font-weight: 800;
        }

        .weather-icon {
          font-size: 3rem;
        }

        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
        }

        .info-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #d1d5db;
          display: block;
        }

        .info-value {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .loader {
          text-align: center;
          color: #3b82f6;
          padding: 50px;
        }
      `}</style>
      <div className="card">
        <div className="header">
          <h2 className="city">Florianópolis</h2>
          <span className="region">Santa Catarina, BR</span>
        </div>

        <div className="temp-main">
          <div className="temp-value">{Math.round(weather?.temperature)}°</div>
          <div className="weather-icon">☀️</div>
        </div>

        <div className="footer">
          <div className="info-group">
            <span className="info-label">Vento</span>
            <span className="info-value">{weather?.windspeed} <small>km/h</small></span>
          </div>
          <div className="info-group" style={{ textAlign: 'right' }}>
            <span className="info-label">Direção</span>
            <span className="info-value">{weather?.winddirection}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Temperatura;