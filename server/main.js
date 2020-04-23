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

const SQLConnection = require('./sql');//calls sql file to use sql functionality

/*-------------------------------assign connection to database-------------------------------*/
const connection = new SQLConnection({
  host : "localhost",
  port : "3306",
  user : "chletsosa2",
  password : "purplescarf",
  database : "sikfliks",
});

/*-------------------------------Parses JSON data-------------------------------*/
app.use(bodyParser.json());
app.use(express.static(distDir));

/*-------------------------------Takes in user location data and returns relevant JSON data on near by movie theaters-------------------------------*/
async function makeTheaterRequest({ lat, lon, radius }) {

  await connection.query("TRUNCATE TABLE theaters");

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

  let theaterRes;

  const values = [];

  for(business of yelpRes.data.businesses) { //iterates through yelp JSON data
    for(result of googleRes.data.results) { //iterates through google JSON data
      if( business.name == result.name) { //checks if both names are equal
        values.push([ business.name, result.vicinity, business.rating ]); //pushes name and rating from yelp data, and address from google data into array
      }
    }
  }

  await connection.query("INSERT INTO theaters (name, address, rating) VALUES ?", [values]);//inserts json data into database
  theaterData = await connection.query("SELECT * FROM theaters");//takes data out of database

  return theaterData;//returns data taken from database
}

/*-------------------------------Takes in movie name and returns relevant JSON data-------------------------------*/
async function makeMovieDetailsRequest(movieID, moviePoster) {

  const imdbReq = { //initialize imbd request object
    'url': `http://www.omdbapi.com/?apikey=5e37af8f&i=${movieID}`
  };

  const imbdRes = await axios(imdbReq); //Makes request to imdb API and assigns it to response object

  const values = [];

  values.push([imbdRes.data.Title, imbdRes.data.imdbRating, imbdRes.data.Released, imbdRes.data.Rated, imbdRes.data.Genre, moviePoster, `https://www.imdb.com/title/${movieID}`]); //stores JSON data in array

  await connection.query("INSERT INTO movies (title, imdbrating, released, rated, genre, poster, imdbID) VALUES ?", [values]);//inserts JSON data into database
}

async function makeMovieListRequest({ movie }) {

  await connection.query("TRUNCATE TABLE movies");

  const imdbReq = { //initialize imbd request object
    'url': `http://www.omdbapi.com/?apikey=5e37af8f&s=${movie}`
  };

  const imbdRes = await axios(imdbReq); //Makes request to imdb API and assigns it to response object

  for(movie of imbdRes.data.Search) { // iterates through json data
    await makeMovieDetailsRequest(movie.imdbID, movie.Poster); // sends imdbID to get specific movie details
  }

  movieData = await connection.query("SELECT * FROM movies");//takes data out of database

  return movieData;//returns data taken from database
}

/*-------------------------------Takes user form data from client and returns JSON------------------------------*/
app.post('/api/userForm', async (req, res) => {
  const [theatreData, movieData] = await Promise.all([ makeTheaterRequest(req.body), makeMovieListRequest(req.body) ]);
  res.json({ businesses: theatreData, movies: movieData });
});

connection.init().then(() => {//Connects to MySQL database
  app.listen(port, () => console.log(`Listening on port ${port}`));//Runs Express server
});
