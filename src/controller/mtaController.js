// LOADS THE KEYS
require('dotenv').config()
const stationsMapping = require('../../init/preProcess')();

// MTA DATA
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const axios = require('axios')
const key = process.env.MTA_KEY
const mta_url = 'http://datamine.mta.info/mta_esi.php?'

// SET ALL URL POINTS
const url = new Map()
url.set([1,2,3,4,5,6,'s'], `${mta_url}key=${key}&feed_id=1`)
url.set(['a', 'c', 'e'], `${mta_url}key=${key}&feed_id=26`)
url.set(['n', 'q', 'r', 'w'], `${mta_url}key=${key}&feed_id=16`)
url.set(['b', 'd', 'f', 'm'], `${mta_url}key=${key}&feed_id=21`)
url.set(['l'], `${mta_url}key=${key}&feed_id=2`)
url.set(['g'], `${mta_url}key=${key}&feed_id=31`)
url.set(['j', 'z'], `${mta_url}key=${key}&feed_id=36`)
url.set([7], `${mta_url}key=${key}&feed_id=51`)

class MTA {
    constructor() {
        this.url= ""
   }

    getEndPoint(train) {
        url.forEach((val,key,map) => {
            if (key.includes(train)) {
                this.url = val
            }
        })
    }

    async getData(train) {
        this.getEndPoint(train)

        const body = await axios.get(this.url, { responseType: 'arraybuffer'})
        const feed = GtfsRealtimeBindings.FeedMessage.decode(body.data);

        return feed.entity
    }
}

module.exports = new MTA()