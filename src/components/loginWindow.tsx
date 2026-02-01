import { Button, Container, Paper, TextField, Typography} from "@mui/material";
import { useStores } from "../store/StoreContext.tsx";
import { useState } from "react";
import * as React from "react";

export default function LoginWindow() {
    const { authStore } = useStores()
    const [text, setText] = useState<string>("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleSubmit = () => {
        authStore.login(text)
    };

    return <Container sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper
            variant='outlined'
            sx={{display: 'flex', flexDirection: "column", width: '500px', gap: '20px', bgcolor: '#1b1b1b', borderRadius: '10px', p: 5, border: '1px solid #333'}}>
            <Typography
                variant="h5"
                color="white"
                component="div"
                sx={{fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase'}}>Введіть ключ аутентифікації</Typography>
            <TextField
                label="Ключ доступу"
                variant="filled"
                onChange={handleChange}
                slotProps={{
                    input: {
                        style: {
                            fontFamily: 'monospace',
                            letterSpacing: '3px',
                            color: '#e19200',
                        },
                    },
                    inputLabel: {
                        style: {
                            color: '#666',
                            textTransform: 'uppercase',
                        },
                    },
                }}
            ></TextField>
            <Button
                disableElevation
                variant="contained" size="large"
                fullWidth
                onClick={handleSubmit}
                sx={{height: '60px', bgcolor: '#e19200'}}>авторизуватися</Button>
        </Paper>
    </Container>
}