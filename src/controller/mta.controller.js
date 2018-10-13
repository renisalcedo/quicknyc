// LOADS THE KEYS
require('dotenv').config()
//create the mappings from the real time station id to the name of the station
const {stationsMapping} = require('../../init/preProcess');

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

    async getTimesForStation(station, train, dir) {
        const stationID = this.getStationId(station, train)+dir

        const data = await this.filter(train)
        let stations = []
        for(let i = 0; i < data.length; i++) {
            stations.push(...data[i].trip_update.stop_time_update)
        }

        //console.log(times)
        const stationTimes = stations.filter(location => location.stop_id === stationID)

        return stationTimes.map(stationTimes => { 
            if(stationTimes.arrival != null) return this.timeFromNow(stationTimes.arrival.time.low);
        })
    }

    timeFromNow(time) {
        let later = new Date(time).getTime();
        let now = new Date().getTime();
        let diff = later - now;
        let diffMinutes = new Date(diff).getMinutes();
        return time;
    }


    getTime(unixtime) {
        const date = new Date(unixtime*1000)
        const hours = date.getHours()
        let minutes = date.getMinutes()
        if(String(minutes).length < 2) {
            minutes = "0" + minutes
        }

        return `${hours}:${minutes}`
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
let mta = new MTA();
let x = mta.getTimesForStation('Times Sq - 42 St', 1, 'N');
x.then(val => console.log(val));
//module.exports = new MTA()

