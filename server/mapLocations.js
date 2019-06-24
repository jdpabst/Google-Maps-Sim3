var app = require('./index.js');

function getLocations(req, res){
 let db = req.app.get('db');

 db.query('select * from locations', function(err, req){
  console.log(err);
  console.log(req);
}).then((location) => {
   console.log(location);
   res.status(200).send(location);
 })
}

function addLocation(req, res){
  let db = req.app.get('db');
  let { lat, lng, accuracy, title } = req.body;

  return db.locations.insert({lat, lng, accuracy, title})
  .then((location) => {
      res.status(200).send(location);
  })
}


module.exports = {
  getLocations,
  addLocation
};
