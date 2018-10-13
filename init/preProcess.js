const data = require('./station_info.json');
console.log(typeof data);
//const parsedJSON = JSON.parse(data);

const parsedJSON = data;

let GTFS_stations = {};
function preProcess() {
    for(let i = 0; i < parsedJSON.length; i++) {
        let arr = parsedJSON[i];
        console.log(arr);
        let key = arr["GTFS Stop ID"]
        console.log(key);
        let val = arr["Stop Name"];
        console.log(val);
        GTFS_stations[key] = val; 
    }
    console.log(GTFS_stations);
    return GTFS_stations;
}

module.exports = preProcess;

