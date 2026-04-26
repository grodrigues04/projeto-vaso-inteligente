import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Typography from '@mui/material/Typography';
function Grafico() {
    const [dados, setDados] = useState(null)
    const [lastItem, setLastItem] = useState(null)

    function formatarDataBrasil(dataISO) {
        const date = new Date(dataISO);

        if (isNaN(date)) return '';

        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    }

    function formatarUmidade(umidade){
        return Math.round(((1024 - umidade) / 1023) * 100);
    }

    function processarDados(data) {
        const dadosProcessados = data.map(item => ({ 
            umidade: formatarUmidade(item.umidade), 
            data: formatarDataBrasil(item.data)
        }))
    
        setLastItem(dadosProcessados[dadosProcessados.length - 1])
        setDados(dadosProcessados)
    }

    useEffect(() => {
        const coletarDados = async () =>{
            const response = await fetch('https://projeto-vaso-backend.onrender.com/dados_atuais')
            const data = await response.json()
            processarDados(data)
        }
        coletarDados()
        const interval = setInterval(coletarDados, 5000)

    }, [])
        
    return (
        <>
            {dados && <ResponsiveContainer width="50%" height={300}>
                <LineChart data={dados}>
                    <XAxis dataKey="data" />
                    <YAxis dataKey="umidade"/>
                    <Tooltip />
                    <Line type="monotone" dataKey="umidade" />
                </LineChart>
            </ResponsiveContainer>}
            
        </>
        
    );
}

export default Grafico