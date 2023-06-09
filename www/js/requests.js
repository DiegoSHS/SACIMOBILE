/**
 * @fileoverview This file contains the functions to make requests to the API
 */

/**
 * @constant API_URL The URL of the SACI API
 */
const API_URL = 'https://sacionweb.up.railway.app/api/'

/**
 * Get the summary of the logs from the API
 * @returns Returns a promise with the data of the logs
 */
export const getSummary = async () => {
    const { data } = await axios.get(`${API_URL}saci/logs/summary`)
    return data
}
/**
 * Simulates the useState hook from React
 * @param {*} initialState initial value
 * @returns Returns a function to get a stateful value, and a function to update it
 */
export const useState = (initialState) => {
    let state = initialState
    const getState = () => state
    const setState = (newState) => {
        state = newState
    }
    return [getState, setState]
}
/**
 * Get the actuators from the API
 * @returns Returns a promise with the data of the sensors
 */
export const getActuators = async () => {
    const { data } = await axios.get(`${API_URL}saci/sensor/actuators`)
    return data
}
/**
 * Changes the state of an actuator
 * @param {String} id The id of the actuator
 * @param {Boolean} enable The new state of the actuator
 * @returns 
 */
export const enableSensor = async (id, enable) => {
    try {
        await axios.post(
            `${API_URL}saci/sensor/${id}/enable`,
            { enable },
            { headers: { 'Content-Type': 'text/plain' } }
        )
        return true
    } catch (error) {
        return
    }
}
