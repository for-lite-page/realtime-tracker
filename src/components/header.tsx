import {Typography} from "@mui/material";


export default function Header({objectsCount}: {objectsCount: number}) {
    return <>
            <Typography variant='h3'>GCS Monitoring</Typography>
        <Typography variant='body1'>Objects in air: <strong>{objectsCount}</strong></Typography>
    </>
}