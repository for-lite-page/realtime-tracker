import {Box, Typography} from "@mui/material";


export default function Header({objectsCount}: {objectsCount: number}) {
    return <>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant='h3'>GCS Monitoring</Typography>
        </Box>
        <Typography variant='body1'>Objects in air: <strong>{objectsCount}</strong></Typography>
    </>
}