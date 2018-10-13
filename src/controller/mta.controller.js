// LOADS THE KEYS
require('dotenv').config()
//create the mappings from the real time station id to the name of the station
const {stationsMapping, findStationByName } = require('../../init/preProcess')();

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

    getStationId(station, train) {
        const stations = stationsMapping[station]

        for(let i = 0; i < stations.length; i++) {
            if(String(stations[i].trains).indexOf(train) != -1) {
                return stations[i].id
            }
        }
    }

    getTimesForStation(station, train) {
        const stationID = this.getStationId(station, train)

        this.filter(train)
        .then(data => {
            console.log(data)
            //data.map(.trip_update.stop_time_update.filter(location => location.stop_id === stationID))
        })
        .catch(err => console.log(err))
    }

    async filter(train) {
        let d = await this.getData(train);
        let allData = [];
        for(let i = 0; i < d.length; i++) {
            if(d[i].trip_update && d[i].trip_update.stop_time_update[0]) {
                let currData = d[i].trip_update.stop_time_update[0].stop_id
                let currTrain = currData[0];
                let station = currData.substring(0,3);

                if(currTrain == train) {
                    allData.push(d[i]);
                }
            }
        }
        return allData;
    }

    async getTrainData(train) {
        let data = await this.filter(train); 
    }

}

module.exports = new MTA()

