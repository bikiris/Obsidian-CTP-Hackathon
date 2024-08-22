// main.js

/**
 * @object Obsidian - The object that maintains the entire frontend of the website
 */
var Obsidian = {};

/**
 * @static Obsidian
 * @property {[String]} modelIds - the ids of all the models
 */
Obsidian.modelIds = [];

/**
 * @static Obsidian
 * @enum MessageType - the message type that is being sent
 */
Obsidian.MessageType = {
  AI: "bot",
  User: "user"
};

/**
 * @static Obsidian
 * @property {String: [Obsidian.Message]} messages - a hashtable containing all the messages
 */
Obsidian.messages = {};

/**
 * @class Obsidian.Message - the messaging class for the server
 */
Obsidian.Message = function(model, message){
  this.model = model;
  this.message = message;
};

/**
 * @class Obsidian
 * @method sendMessage - a function to send the message
 * @param {Obsidian.Message} message - // body: JSON.stringify({ username: "example" }),
 */
Obsidian.send = function(message) {
  
  
  
};

async function getMessage() {
  
  const message = document.getElementById('input').value;
  
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message
    
    })
  });
  const data = await response.json();
  console.log(data);
  document.getElementById('message').innerText = "Received!";
  console.log(data.status);
}

/*function getMessage() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  fetch("/api/message", {
    method: "POST",
    body: { message: document.getElementById('input').value },
    header: myHeaders
    // ...
  }).then( e => {
    
    console.log(e);
    
    return e.json();
    
  }).then( e => {
  
      console.log(e);
      
      document.getElementById('message').innerText = "Received!";
  });

  
}*/
