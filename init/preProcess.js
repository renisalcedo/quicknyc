const data = require('./station_info.json');

let GTFS_stations = {};

function preProcess() {
    for(let i = 0; i < data.length; i++) {
        let arr = data[i];
        let key = arr["GTFS Stop ID"]
        let val = arr["Stop Name"];
        GTFS_stations[key] = val; 
    }
    return GTFS_stations;
}

module.exports = preProcess;

