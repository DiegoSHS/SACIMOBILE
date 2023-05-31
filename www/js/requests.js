export const getSummary = async() => {
    const result = await fetch('https://saci-indol.vercel.app/api/saci/logs/summary')
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
