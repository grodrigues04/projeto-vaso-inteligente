import React from 'react'
import Grafico from './grafico.jsx'
import Temperatura from './temperatura'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
function Main(){
    return(
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom> Monitoramento do Vaso </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '20px' }}> 
                <Grafico />
                <Temperatura />
            </Stack>
        </Stack>
    )
}

export default Main