// LOADS THE KEYS
require('dotenv').config()

// MTA DATA
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');

const key = process.env.MTA_KEY
const url = new Map()

// SET ALL URL POINTS
url.set([1,2,3,4,5,6,'s'], `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`)
url.set(['a', 'c', 'e'], `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=26`)

let endpoint = null
function getEndPoint(train) {
    url.forEach((val,key,map) => {
        if (key.includes(train)) {
            endpoint = val
        }
    })
}

getEndPoint(3)
console.log(endpoint)
var requestSettings = {
  method: 'GET',
  url: endpoint,
  encoding: null
};

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
});