const axios = require('axios');
const express = require('express');
const path = require('path');
const fs = require('fs');

// const data = require('./data.json');

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

app.get('/api/yelp', (req, res) => {
  axios(YelpReq).then((response) => {
    console.log(response.data);
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
