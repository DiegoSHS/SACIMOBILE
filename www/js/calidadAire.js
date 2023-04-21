const fetchData = async () => {
    try {
        const response = fetch('https://glorious-lime-termite.cyclic.app/log/aguaAire/')
        const results = await response.json()
        return results
    } catch (error) {
        return
    }
}

const splitData = async () => {
    const results = await fetchData()
    if (results) {
        showData(results)
    }
}

const showData = (data) => {
    const { conductividad, tds, co2, intensLumina } = data
    document.getElementById('conductividad').innerHTML = conductividad
    document.getElementById('tds').innerHTML = tds
    document.getElementById('co2').innerHTML = co2
    document.getElementById('intensLumina').innerHTML = intensLumina
}