/**
 * @fileoverview This file contains the functions to make requests to the API
 */

/**
 * @constant API_URL The URL of the SACI API
 */
const API_URL = 'https://saci-indol.vercel.app/api/'

/**
 * Get the summary of the logs from the API
 * @returns Returns a promise with the data of the logs
 */
export const getSummary = async() => {
    const result = await fetch(`${API_URL}saci/logs/summary`)
    const data = await result.json()
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
export const getActuators = async() => {
    const result = await fetch(`${API_URL}saci/sensor/actuators`)
    const data = await result.json()
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
        const res = await fetch(`${API_URL}saci/sensor/${id}/enable`,{
            method: 'PUT',
            body: JSON.stringify({ enable })
        })
        console.log(await res.json())
        return true
    } catch (error) {
        return
    }
}