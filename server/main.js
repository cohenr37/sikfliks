const express = require('express');

const app = express();

const port = 5000;

const data = [
  {
    id: 1,
    firstName: "Amy",
    lastName: "Taylor",
    phone: "617-564-3254",
    picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg"
  },
  {
    id: 2,
    firstName: "Anup",
    lastName: "Gupta",
    phone: "617-564-1258",
    picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/anup_gupta.jpg"
  }
];

app.get('/api/employees', (req, res) => {
  res.json(data);
});

app.get('*', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
