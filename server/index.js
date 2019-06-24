const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const app = module.exports = express();
const config = require('./config.js');

app.use(bodyParser.json());

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

const mapLocations = require("./mapLocations.js");

app.get('/api/getLocations', mapLocations.getLocations);
app.post('/api/addLocation', mapLocations.addLocation);




app.listen(config.port, console.log("you are now connected on " + config.port));
