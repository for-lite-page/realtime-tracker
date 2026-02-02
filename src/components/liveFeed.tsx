import { observer } from "mobx-react-lite";
import { useStores } from "../customHooks/useStores.ts";
import {
    List, ListItem, ListItemText, ListItemButton,
    ListItemIcon, Chip, Box, Typography
} from "@mui/material";
import RadarIcon from '@mui/icons-material/Radar';

const LiveFeed = observer(() => {
    const { mainStore } = useStores()

    const drones = Array.from(mainStore.objects.values())

    return (
        <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: "#424242", border: "1px solid gray"}}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Об'єкти ({drones.length})</Typography>
            </Box>

            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {drones.map((drone) => (
                    <ListItem key={drone.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <RadarIcon color={drone.isLost ? "error" : "success"} />
                            </ListItemIcon>
                            <ListItemText sx={{fontWeight: 500,}}
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