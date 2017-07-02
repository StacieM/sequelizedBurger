// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models');

// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables
sequelizeConnection.sync();

// Create routes
// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});


// Index Page-->render all burgers
router.get('/index', function (req, res) {
  // sequelize query find all burgers
  models.burgers.findAll({
    include: [{model: models.devourers}]
  }).then(function(data){
    // pass data into hbs object and render it
    var hbsObject = { burgers: data };
     res.render('index', hbsObject);
  })
});


// Create a New Burger
router.post('/burger/create', function (req, res) {
   // sequelize query to add burgers
  models.burgers.create({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(){
       res.redirect('/index');
  });
});


// Devour a Burger
router.post('/burger/eat/:id', function (req, res) {
  // create new burger devourer
  models.devourers.create({
    devourer_name: req.body.burgerEater,
    burgerID: req.params.id
    // select eaten burger by id
  }).then(function(newDevourer){
    models.burgers.findOne({where: {id: req.params.id} })
    // update burger's status
  }).then(function(eatenBurger){
      eatenBurger.update({
        devoured: true,
      })
      // page refresh when burger is devoured
  }).then(function(){
  })
    res.redirect('/index');
  });

// Export routes
module.exports = router;