async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

const getDashboardData = async (query) => {
    try {
        const destinationPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
        const weatherPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
        const airportPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

        const [destinations, weathers, airports] = await Promise.all([destinationPromise, weatherPromise, airportPromise])

        const destination = destinations[0]
        const weather = weathers[0]
        const airport = airports[0]

        return {
            city: destination ? destination.name : null,
            country: destination ? destination.country : null,
            temperature: weather ? weather.temperature : null,
            weather: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null
        }
    } catch (error) {
        throw new Error(`Errore nel recupero dei dati: ${error.message}`)
    }
}

getDashboardData('vienna')
    .then(data => {
        console.log('Dashboard data:', data)
        let sentence = ''
        if(data.city !== null && data.country !== null){
            sentence += `${data.city} is in ${data.country}.\n`
        }
        if(data.temperature !== null && data.weather !== null){
            sentence += `Today there are ${data.temperature} degrees and the weather is ${data.weather}\n`
        }
        if(data.airport !== null) {
            sentence += `The main airport is ${data.airport}`
        }
        console.log(sentence)
    })
    .catch(error => console.error(error))
