/**
 * @fileoverview This file contains the functions to make requests to the API
 */

/**
 * @constant API_URL The URL of the saci API
 */
const API_URL = 'https://saci-indol.vercel.app/api/'

/**
 * 
 * @returns Returns a promise with the data of the logs
 */
export const getSummary = async() => {
    const result = await fetch(`${API_URL}saci/logs/summary`)
    const data = await result.json()
    return data
}

/**
 * 
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

export const getActuators = async() => {
    const result = await fetch(`${API_URL}saci/sensor/actuators`)
    const data = await result.json()
    return data
}
