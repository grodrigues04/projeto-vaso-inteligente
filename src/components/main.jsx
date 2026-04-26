import React from 'react'
import { useState } from 'react';
import Grafico from './grafico.jsx'
import Temperatura from './histórico.jsx'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
function Main(){

    const [ultimaTemperatura, setUltimaTemperatura] = useState(null);
    const [horario, setHorario] = useState(null);
    const mudarTemperatura = (temperatura) => {
        setUltimaTemperatura(temperatura.umidade);
        setHorario(temperatura.data);
    }
    return(
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom> Monitoramento do Vaso </Typography>            
            <Typography variant="h4" component="h3" gutterBottom> Ultima umidade registrada: {ultimaTemperatura} </Typography>
            <Typography variant="h4" component="h3" gutterBottom> Horário: {horario} </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '20px' }}> 
                <Grafico callBackTemperatura={mudarTemperatura}/>
            </Stack>
        </Stack>
    )
}

export default Main