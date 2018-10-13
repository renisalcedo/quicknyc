const axios = require('axios')

const mta = require('./mta.controller')
const distanceKey = process.env.DISTANCE_KEY

class Transit {
    getTime(unixtime) {
        const date = new Date(unix_timestamp*1000)
        const hours = date.getHours()
        const minutes = "0" + date.getMinutes

        return `${hours}:${minutes.substr(-2)}`
    }

    async getDuration(to, from) {
        const apiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?"
        const distanceUrl = `${apiUrl}origins=${from}&destinations=${to}&transit_mode=subway&language=en-EN&key=${distanceKey}`
    }
}