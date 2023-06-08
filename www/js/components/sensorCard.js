
/**
 * Generates the html of a sensor card
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
 * Generates the html of the sensor cards
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

const ActuatorCard = (actuator) => {
    return (
        `<div class="ui item">
            <div class="content">
                <div class="ui big circular fluid icon left labeled button">
                    <i aria-hidden="true" class="fi fi-sr-air-freshener icon blue"></i>
                    ${actuator.name}
                </div>
                <div class="description">
                    <p class="justify">
                        ${actuator.description}
                    </p>
                </div>
                <div class="extra">
                    <button class="ui button circular enable" id="${actuator.name}">
                        <i aria-hidden="true"
                            id="act_${actuator.name}"
                            class="fi fi-sr-power icon ${actuator.state ? 'green' : 'red'}
                            "></i>
                        ${actuator.state ? 'Encendido' : 'Apagado'}
                    </button>
                </div>
            </div>
        </div>`
    )
}
//ui items
export const ActuatorCards = (actuators) => {
    return (
        `<div class="ui relaxed divided list">
            ${actuators.map(actuator => ActuatorCard(actuator)).join('')}
        </div>`
    )
}