
/**
 * 
 * @param {Object} sensor the sensor object
 * @returns {String} the html of the sensor card
 */
const SensorCard = (sensor) => {
    return (
        `<div class="ui card">
            <div class="content">
                <div class="header">${sensor.name}</div>
                <div class="description">${sensor.description}</div>
                <div class="ui labels">
                    <button class="ui mini ${sensor.state ? 'green':'red'} active button">Estado:${sensor.state ? 'encendido' : 'apagado'}</button>
                    <div class="ui label">Modulo:${sensor.module}</div>
                </div>
            </div>
        </div>
        `
    )
}
/**
 * 
 * @param {Array} sensors an array of sensor objects
 * @returns {String} the html of the sensor cards
 */
export const SensorCards = (sensors) => {
    return (
        `<div class="ui centered cards">
            ${sensors.map(sensor => SensorCard(sensor)).join('')}
        </div>`
    )
}