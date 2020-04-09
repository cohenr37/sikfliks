/*-------------------------------import libraries-------------------------------*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const port = 5000;
const distDir = path.join(__dirname + '/../dist/sikfliks/');

/*-------------------------------assign connection to database-------------------------------*/
const connection = mysql.createConnection({
  host : "localhost",
  port : "3306",
  user : "chletsosa2",
  password : "purplescarf",
  database : "sikfliks",
});

/*-------------------------------Parses JSON data-------------------------------*/
app.use(bodyParser.json());

/*-------------------------------Takes in user location data and returns relevant JSON data on near by movie theaters-------------------------------*/
async function makeTheaterRequest({ movie, lat, lon, radius }) {
  const yelpReq = { //initialize yelp request object
    'method': 'GET',
    'url': 'https://api.yelp.com/v3/businesses/search',
    'headers': {
      'Authorization': 'Bearer IH8NIayvkJYfQzJvE9t_sBm-w-gKFPxHVZt-h92YFqSmMPiOiAWf6-UTKSOWikfRYpjYVq6SV9OBhMQvcDA2uJ6VWuWXtSXVQ8jeuZtVLKhNg7aIJBldjL_p-6VMXnYx'
    }, 'params': {
      'term': 'Movie Theater',
      'latitude': lat,
      'longitude': lon,
      'radius': Math.floor(radius * 1609)
    }
  };

  const googleReq = { //initialize google request object
    'url': `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${Math.floor(radius * 1609)}&keyword=movie+theater&key=AIzaSyDTJKFijibXnktIxup9p2LX3COiifcTYL8`
  };

  const googleRes = await axios(googleReq); //Makes request to imdb API and assigns it to response object

  const yelpRes = await axios(yelpReq); //Makes request to imdb API and assigns it to response object

  const sql = "INSERT INTO theaters (name, address, rating) VALUES ?";

    var values = [];

    for(business of yelpRes.data.businesses) { //iterates through yelp JSON data
      for(result of googleRes.data.results) { //iterates through google JSON data
        if( business.name == result.name) { //checks if both names are equal
          values.push([ business.name, result.vicinity, business.rating ]); //pushes name and rating from yelp data, and address from google data into array
        }
      }
    }

    console.log(values);

    connection.query(sql, [values], function(err, result) { //stores data from array into MySQL Database
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log("Success");
    });

    //TODO: make query to select data from MySQL database and store it in JSON data

  return yelpRes.data; //returns JSON data
}

/*-------------------------------Takes in movie name and returns relevant JSON data-------------------------------*/
async function makeMovieRequest({ movie, lat, lon, radius }) {
  const imdbReq = { //initialize imbd request object
    'url': `http://www.omdbapi.com/?apikey=5e37af8f&t=${movie}`
  };

  const imbdRes = await axios(imdbReq); //Makes request to imdb API and assigns it to response object

  const sql = "INSERT INTO movies (title, imdbRating, released, rated, genre) VALUES ?";

  connection.connect(function(err) { //Creates connection to MySQL database
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('Connected to local Database!');

    var values = [];

    values.push([imbdRes.data.Title, imbdRes.data.imdbRating, imbdRes.data.Released, imbdRes.data.Rated, imbdRes.data.Genre]); //stores JSON data in array

    console.log(values);

    connection.query(sql, [values], function(err, result) { //stores data from array into MySQL Database
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log("Success");
    });

  });

  //TODO: make query to select data from MySQL database and store it in JSON data

  return imbdRes.data; //returns JSON data
}

/*-------------------------------Takes in request from client and posts relevant JSON data------------------------------*/
app.post('/api/theater', async (req, res) => {
  res.json(await makeTheaterRequest(req.body));
});

/*-------------------------------Takes in request from client and posts relevant JSON data------------------------------*/
app.post('/api/movie', async (req,res) => {
  res.json(await makeMovieRequest(req.body));
});

/*-------------------------------Tells server where the client is-------------------------------*/
app.use(express.static(distDir));

/*-------------------------------Runs server-------------------------------*/
app.listen(port, () => console.log(`Listening on port ${port}`));
