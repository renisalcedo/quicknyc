const data = require('./station_info.json');

let GTFS_stations = {};

// PREPROCESS BY NAME
function preProcess() {
    for(let i = 0; i < data.length; i++) {
        let arr = data[i];
        let key = arr["Stop Name"];
        let id = arr["GTFS Stop ID"]
        let trains = arr["Daytime Routes"]

        // INITIALIZES EMPTY ARRAY ON EMPTY KEY
        if(!GTFS_stations[key]) {
            GTFS_stations[key] = []
        }

        GTFS_stations[key].push({ id, trains })
    }
}
preProcess();

module.exports = {
    stationsMapping: byGTFS
};

