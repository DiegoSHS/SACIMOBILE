const SensorCard = (sensor) => {
    return (
        `<div class="ui card">
            <div class="content">
                <div class="header">${sensor.name}</div>
                <div class="description">${sensor.description}</div>
                <div class="ui labels">
                    <button class="ui mini active button">Estado:${sensor.state ? 'encendido' : 'apagado'}<button/>
                    <div class="ui label">Modulo:${sensor.type}</div>
                </div>
            </div>
        </div>
        `
    )
}

export const SensorCards = (sensors) => {
    return sensors.map(sensor => SensorCard(sensor)).join('')
}