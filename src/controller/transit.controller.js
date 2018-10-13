const axios = require('axios')

const mta = require('./mta.controller')
const distanceKey = process.env.DISTANCE_KEY

class Transit {
    async getDuration(req, res) {
        const { train, station } = req.body
        const trainData = await mta.filter(train)
        res.status(200).send(trainData)

        //this.getDurationTime()
    }

    async getDurationTime(to, from) {
        const apiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?"
        to += ",NY"
        from += ",NY"
        const distanceUrl = `${apiUrl}origins=${from}&destinations=${to}&transit_mode=subway&language=en-EN&key=${distanceKey}`

        const data = await axios.get(distanceUrl)
        return data.rows.elements[0].duration.text
    }
}

module.exports = new Transit()