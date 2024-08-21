// server.js

// You can add extra messages here to get it to work

/**
 * @object server - the server object
 */
var server = {};

/**
 * @static server
 * @method useApp - a function to get the app
 */
server.useApp = function(app){
  
  // this is the app from expressjs 
  // instead of modifying the app.js file you can just use the app here
  
  
};

/**
 * @static server
 * @method getMessage - gets the message
 */
server.getMessage = function(res, req) {
  
  res.json({ 
    message: "Hello world"
  });
  // sends a message to the frontend with hello world
  
};

// DO NOT TOUCH BELOW
module.exports = server;
