import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 })

let drones = Array.from({ length: 50 }).map((_, index) => ({
    id: `drone-${index}`,
    lat: 50.4501 + (Math.random() - 0.5) * 0.1,
    lng: 30.5234 + (Math.random() - 0.5) * 0.1,
    direction: Math.floor(Math.random() * 360),
    speed: 0.0001 + Math.random() * 0.0002
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