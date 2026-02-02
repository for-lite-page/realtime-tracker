import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 })

const BASE_LAT = 28.2915;
const BASE_LNG = -16.6291;


let drones = Array.from({ length: 150 }).map((_, index) => ({
    id: `drone-${index}`,
    lat: BASE_LAT + (Math.random() - 0.5) * 3,
    lng: BASE_LNG + (Math.random() - 0.5) * 3,
    direction: Math.floor(Math.random() * 360),
    speed: 0.0008 + Math.random() * 0.0002
}))



console.log('🚀 Mock Server started on ws://localhost:8080')

wss.on('connection', (ws) => {
    console.log('📡 Client connected')

    const interval = setInterval(() => {
        drones = drones.map(d => {

            if (!d.isSimulatingLoss && Math.random() < 0.005) {
                d.isSimulatingLoss = true
            }

            const rad = (d.direction * Math.PI) / 180;

            return {
                ...d,
                lat: d.lat + Math.cos(rad) * d.speed,
                lng: d.lng + Math.sin(rad) * d.speed,

                direction: (d.direction + (Math.random() - 0.5) * 2) % 360
            }
        })
        let activeDrones = drones.filter(d => !d.isSimulatingLoss)

        ws.send(JSON.stringify(activeDrones))
    }, 1000)

    ws.on('close', () => {
        console.log('🔌 Client disconnected')
        clearInterval(interval)
    })
})