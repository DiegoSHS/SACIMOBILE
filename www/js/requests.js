export const getSummary = async() => {
    const result = await fetch('https://saci-indol.vercel.app/api/saci/logs/summary',{
        mode: 'cors',
    })
    const data = await result.json()
    console.log(data)
}