// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models')

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
// app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var router = require('./controllers/burgers_controllers.js');
app.use('/', router);

// Open Server
var PORT = process.env.NODE_ENV || 3000;
db.sequelize.sync().then(function() {
app.listen(PORT, function() {
    console.log("listening on port %s", PORT);
});
});