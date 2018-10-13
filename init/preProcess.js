const data = require('./station_info.json');

let byGTFS = {};
let byStationName = {};

function preProcess() {
    for(let i = 0; i < data.length; i++) {
        let arr = data[i];
        let key = arr["GTFS Stop ID"]
        let val = arr["Stop Name"];
        GTFS_stations[key] = val; 
        byStationName[val] = key;
    }
}
preProcess();

module.exports = {
    byGTFS: byGTFS,
    byStationName
};

