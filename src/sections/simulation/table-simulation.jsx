import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

export default function TableSimulation({ stateMachine, mode, objectTax, value }) {
    let valorFormatado = '';
    if (!Number.isNaN(value)) {
        valorFormatado = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    return (
        <TableContainer component={Paper}>
            <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction='column'
                alignItems={{ xs: 'initial' }}
                width="100%"
            >
                <Box
                    sx={{ width: '100%', display: 'flex' }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        component="div"
                        margin={0}
                    >
                        {mode === 'Presencial' ? 'Presencial' : 'Online'}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="h8"
                        gutterBottom
                        component="div"
                        margin={0}
                        textAlign="right"
                    >
                        Valor: {valorFormatado}
                    </Typography>
                </Box>
            </Stack>
            <Table sx={{ minWidth: 350 }} aria-label="tax simulation" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Parcelas</TableCell>
                        <TableCell>Valor por parcela</TableCell>
                        <TableCell>Valor Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(objectTax).map((row, index) => (
                        <TableRow key={`row${mode}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            <TableCell align="right">{index}</TableCell>
                            <TableCell>{value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

TableSimulation.propTypes = {
    stateMachine: PropTypes.any,
    mode: PropTypes.any,
    objectTax: PropTypes.any,
    value: PropTypes.any,
};
