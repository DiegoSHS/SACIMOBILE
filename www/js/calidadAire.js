const fetchData = async () => {
    try {
<<<<<<< HEAD
        const response = fetch('https://creepy-pink-lingerie.cyclic.app/log')
=======
        const response = fetch('https://creepy-pink-lingerie.cyclic.app/log/',{
            mode:"no-cors",
        })
>>>>>>> 29c50843238a3871d9149e2761650440b7119416
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
<<<<<<< HEAD
    const { tds, co2, intensLumina } = data
=======
>>>>>>> 29c50843238a3871d9149e2761650440b7119416
    document.getElementById('tds').innerHTML = tds
    document.getElementById('co2').innerHTML = co2
    document.getElementById('intensLumina').innerHTML = intensLumina
}