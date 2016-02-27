var yelp = require("node-yelp");


var client = yelp.createClient({
  oauth: {
    "consumer_key": "N-4Hpfq-OIa4RmttwIYaog",
    "consumer_secret": "hEHjf0_KpqJGQkAj9bNvxlIIkBI",
    "token": "uvI_y-s_AtuMnsWC-OCtURKucZSwjjjK",
    "token_secret": "EoI-u9XGQ6HPH09t5s_fZYoNdIk"
  },

  // Optional settings:
  httpClient: {
    maxSockets: 25  // ~> Default is 10
  }
});


client.search({
  terms: "Brass Rail",
  location: "HOBOKEN",
  limit: 10
}).then(function (data) {
  console.log(data.businesses);
  var businesses = data.businesses;
  var location = data.region;

  // ...
});


/*client.business("THE BRASS RAIL", {
  cc: "US"
}).then(function (data) {
  // ...
});*/
