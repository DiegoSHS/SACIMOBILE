const fetchData = async () => {
    try {
        const response = fetch('https://creepy-pink-lingerie.cyclic.app/log/',{
            mode:"no-cors",
        })
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
        showData(results)
    }
}

const showData = (data) => {
    document.getElementById('tds').innerHTML = tds
    document.getElementById('co2').innerHTML = co2
    document.getElementById('intensLumina').innerHTML = intensLumina
}