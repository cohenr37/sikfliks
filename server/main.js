const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const port = 5000;
const distDir = path.join(__dirname + '/../dist/sikfliks/');

const YelpReq = {
  'method': 'GET',
  'url': 'https://api.yelp.com/v3/businesses/search',
  'headers': {
    'Authorization': 'Bearer IH8NIayvkJYfQzJvE9t_sBm-w-gKFPxHVZt-h92YFqSmMPiOiAWf6-UTKSOWikfRYpjYVq6SV9OBhMQvcDA2uJ6VWuWXtSXVQ8jeuZtVLKhNg7aIJBldjL_p-6VMXnYx'
  }, 'params': {
    'term': 'delis',
    'latitude': '37.786882',
    'longitude': '-122.399972'
  }
}

const connection = mysql.createConnection({
  host : "localhost",
  port : "3306",
  user : "chletsosa2",
  password : "purplescarf",
  database : "sikfliks",
});

const sql = "INSERT INTO delis (store, rating) VALUES ?";

app.get('/api/yelp', (req, res) => {
  axios(YelpReq).then((response) => {
    console.log(response.data);
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('Connected to local Database!');

      var values =  [];

      for(var i=1; i< response.data.businesses.length; i++) {
        values.push([response.data.businesses[i].name,YelpData.businesses[i].rating]);
      }
      console.log(response.data.busineseslength);
      connection.query(sql, [values], function(err, result) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log("Success");
      });
    });

    fs.writeFileSync('data.json',JSON.stringify(response.data, null, 2));
    res.json(response.data);
  }).catch((error) => {
    console.error(error);
    next(error);
  });

  //res.json(data);

});

app.use(express.static(distDir));

app.listen(port, () => console.log(`Listening on port ${port}`));
