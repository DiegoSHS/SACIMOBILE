const apilink = 'https://creepy-pink-lingerie.cyclic.app/api'
const fetchData = async () => {
    try {
        const response = fetch(`${apilink}/log/`)
        const results = await response.json()
        console.log(results)
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
    document.getElementById('tds').innerHTML = tds
    document.getElementById('co2').innerHTML = co2
    document.getElementById('intensLumina').innerHTML = intensLumina
}