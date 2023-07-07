
/**
 * Generates the html of a sensor card
 * @param {*} param0 the sensor object
 * @returns {String} the html of the sensor card
 */
const SensorCard = ({ name, state, description, module }) => {
    return (
        `<div class="ui card">
            <div class="content">
                <div class="header">${name}</div>
                <div class="description">${description}</div>
                <div class="ui labels">
                    <button class="ui mini ${state ? 'green' : 'red'} active button">Estado:${state ? 'encendido' : 'apagado'}</button>
                    <div class="ui label">Modulo:${module}</div>
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
/**
 * Generates the html of a sensor card
 * @param {*} param0 actuator object
 * @returns {String} the html of the actuator card
 */
const ActuatorCard = ({ name, description, state }) => {
    return (
        `<div class="ui item card">
            <div class="content">
                <div class="ui header">
                    ${name}
                </div>
                <div class="description">
                    <p class="justify">
                        ${description}
                    </p>
                </div>
                <div class="extra">
                    <button class="ui button ${state ? 'green' : 'red'} circular enable" id="${name}">
                        <i aria-hidden="true"
                            id="act_${name}"
                            class="fi fi-sr-power icon"
                            ></i>
                        ${state ? 'Encendido' : 'Apagado'}
                    </button>
                </div>
            </div>
        </div>`
    )
}
/**
 * Creates the html of the actuator cards
 * @param {Array} actuators an array of actuator objects
 * @returns {String} the html of the actuator cards
 */
export const ActuatorCards = (actuators) => {
    return (
        `<div class="ui relaxed divided list">
            ${actuators.map(actuator => ActuatorCard(actuator)).join('')}
        </div>`
    )
}