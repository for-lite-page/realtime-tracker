

export default function Header({objectsCount}: {objectsCount: number}) {
    return <>
        <h1>GCS Monitoring</h1>
        <p>Objects in air: <strong>{objectsCount}</strong></p>
    </>
}