const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();

const port = 5000;
const distDir = path.join(__dirname + '/../dist/sikfliks/');

app.get('/api/insta', (req, res) => {
  axios({
    'method': 'GET',
    'url': 'https://instagram9.p.rapidapi.com/api/instagram',
    'headers': {
      'x-rapidapi-host': 'instagram9.p.rapidapi.com',
      'x-rapidapi-key': '54a294317fmshe35a8c50b0f82c2p100a2cjsn4d6d671f8a71'
    }, 'params': {
      'kullaniciadi': 'nasa',
      'lang': 'en'
    }
  }).then((response) => {
    console.log(response.data);
    res.json(response.data);
  }).catch((error) => {
    console.error(error);
    next(error);
  });
});

app.use(express.static(distDir));

app.listen(port, () => console.log(`Listening on port ${port}`));
