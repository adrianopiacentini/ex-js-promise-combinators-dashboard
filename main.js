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

        const [destination, weather, airport] = await Promise.all([destinationPromise, weatherPromise, airportPromise])
        return {
            city: destination[0].name,
            country: destination[0].country,
            temperature: weather[0].temperature,
            weather: weather[0].weather_description,
            airport: airport[0].name
        }
    } catch (error) {
        throw new Error('Errore nel recupero dei dati:', error.message)
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dashboard data:', data)
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}\n` +
            `The main airport is ${data.airport}`
        )
    })
    .catch(error => console.error(error))
