const fetchData = async () => {
    try {
        const response = fetch('https://creepy-pink-lingerie.cyclic.app/log')
        const results = await response.json()
        return results
    } catch (error) {
        return
    }
}

const splitData = async () => {
    const results = await fetchData()
    if (results) {
        document.getElementById('tds').innerHTML = results[0]
    }
}

const showData = (data) => {
    const { tds, co2, intensLumina } = data
    document.getElementById('tds').innerHTML = tds
    document.getElementById('co2').innerHTML = co2
    document.getElementById('intensLumina').innerHTML = intensLumina
}