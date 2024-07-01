import * as React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Select,Divider,MenuItem,FormControl,InputLabel } from '@mui/material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [age, setAge] = React.useState('');

    const handleAge = (event) => {
        setAge(event.target.value);
    };
    return (
    <Grid2 container direction='row' sx={{ width: '100%'}}>
        <Grid2  sx={{ width: '60%' , border: '2px solid blue' }}>
            <h1 style={{ textAlign: 'center' ,  border: '2px solid black' }}>MEAS Display</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Manual" {...a11yProps(0)} />
                    <Tab label="Lista" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <>
                    MEAS Puntual
                    <h2>Valor real:<strong>{age}</strong></h2>
                    <h2>Valor imaginario:<strong>{age}</strong></h2>
                </>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                MEAS lista
                
            </CustomTabPanel>
        </Grid2>
        <Grid2 sx={{ width: '40%',  border: '2px solid red'}} >
            <h1 style={{ textAlign: 'center' ,  border: '2px solid black' }}>MEAS Config</h1>
            <Divider sx={{ pt:6}}/>
            <Box sx={{ p: 3}}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Función</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleAge}
                        sx={{ width: '100px'}}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Grid2>
    </Grid2>
    );
}

export default function PaginaInicial() {
    return (
        <>
            <h1>LCR Meter control</h1>
            <BasicTabs />
        </>
    )
};