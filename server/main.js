const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const port = 5000;
const distDir = path.join(__dirname + '/../dist/sikfliks/');

const connection = mysql.createConnection({
  host : "localhost",
  port : "3306",
  user : "chletsosa2",
  password : "purplescarf",
  database : "sikfliks",
});

const sql = "INSERT INTO delis (store, rating) VALUES ?";

async function makeYelpRequest({ movie, lat, lon, radius }) {
  const yelpReq = {
    'method': 'GET',
    'url': 'https://api.yelp.com/v3/businesses/search',
    'headers': {
      'Authorization': 'Bearer IH8NIayvkJYfQzJvE9t_sBm-w-gKFPxHVZt-h92YFqSmMPiOiAWf6-UTKSOWikfRYpjYVq6SV9OBhMQvcDA2uJ6VWuWXtSXVQ8jeuZtVLKhNg7aIJBldjL_p-6VMXnYx'
    }, 'params': {
      'term': 'Movie Theaters',
      'latitude': lat,
      'longitude': lon,
      'radius': Math.floor(radius * 1609)
    }
  };

  const yelpRes = await axios(yelpReq);

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('Connected to local Database!');

    var values = [];

    for(business of yelpRes.data.businesses) {
      values.push([ business.name, business.rating ]);
    }

    console.log(values);

    connection.query(sql, [values], function(err, result) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log("Success");
    });
  });

  return yelpRes.data;
}

app.use(bodyParser.json());

app.post('/api/movie', async (req, res) => {
  res.json(await makeYelpRequest(req.body));
});

app.use(express.static(distDir));

app.listen(port, () => console.log(`Listening on port ${port}`));
