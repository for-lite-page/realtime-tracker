import { observer } from "mobx-react-lite";
import { useStores } from "../store/StoreContext";
import {
    List, ListItem, ListItemText, ListItemButton,
    ListItemIcon, Chip, TextField, Box, Typography
} from "@mui/material";
import RadarIcon from '@mui/icons-material/Radar';
import { useState } from "react";

const LiveFeed = observer(() => {
    const { mainStore } = useStores();
    const [search, setSearch] = useState("");

    const drones = Array.from(mainStore.objects.values()).filter(d =>
        d.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Об'єкти ({drones.length})</Typography>
                <TextField
                    fullWidth
                    size="small"
                    label="Пошук ID..."
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {drones.map((drone) => (
                    <ListItem key={drone.id} disablePadding>
                        <ListItemButton onClick={() => {
                            // Тут ми пізніше додамо метод для центрування карти
                            console.log("Фокус на:", drone.id);
                        }}>
                            <ListItemIcon>
                                <RadarIcon color={drone.isLost ? "error" : "success"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={drone.id}
                                secondary={`Напрям: ${drone.direction.toFixed(0)}°`}
                            />
                            {drone.isLost && <Chip label="Lost" size="small" color="error" variant="outlined" />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});

export default LiveFeed;