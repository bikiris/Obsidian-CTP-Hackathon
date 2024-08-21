
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');
  
  
var server = require("./server/server.js");
// gets the server

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


server.useApp(app);


// For the backend if you want to add more go for it

// Defining a route for handling client communication
/*app.get('/api/message', (req, res) => {
  
  server.getMessage(req, res);
  
});*/
/**/

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
