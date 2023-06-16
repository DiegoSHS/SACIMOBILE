
/**
 * Generates the html of a sensor card
 * @param {Object} sensor the sensor object
 * @returns {String} the html of the sensor card
 */
const SensorCard = ({name,state,description,module}) => {
    return (
        `<div class="ui card">
            <div class="content">
                <div class="header">${name}</div>
                <div class="description">${description}</div>
                <div class="ui labels">
                    <button class="ui mini ${state ? 'green':'red'} active button">Estado:${state ? 'encendido' : 'apagado'}</button>
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

const ActuatorCard = ({name,description,state}) => {
    return (
        `<div class="ui item">
            <div class="content">
                <div class="ui big circular fluid icon left labeled button">
                    <i aria-hidden="true" class="fi fi-sr-air-freshener icon blue"></i>
                    ${name}
                </div>
                <div class="description">
                    <p class="justify">
                        ${description}
                    </p>
                </div>
                <div class="extra">
                    <button class="ui button circular enable" id="${name}">
                        <i aria-hidden="true"
                            id="act_${name}"
                            class="fi fi-sr-power icon ${state ? 'green' : 'red'}
                            "></i>
                        ${state ? 'Encendido' : 'Apagado'}
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