// main.js

/**
 * @object Obsidian - The object that maintains the entire frontend of the website
 */
var Obsidian = {};

/**
 * @static Obsidian
 * @property {[String]} modelIds - the ids of all the models
 */
Obsidian.modelIds = [
  "mental-health",
  "summarization",
  "cuny-faq",
  "activities"
];

/**
 * @static Obsidian
 * @enum MessageType - the message type that is being sent
 */
Obsidian.MessageType = {
  AI: "assistant",
  User: "user"
};


/**
 * @static Obsidian
 * @property {String} currentModel
 */
Obsidian.currentModel = "mental-health";

/**
 * @static Obsidian
 * @property {String: [Obsidian.Message]} messages - a hashtable containing all the messages
 */
Obsidian.messages = {};

/**
 * @class Obsidian.Message - the messaging class for the server
 */
Obsidian.Message = function(role, message){
  this.role = role;
  this.message = message;
};

/**
 * @class Obsidian
 * @method sendMessage - a function to send the message
 * @param {Obsidian.Message} message - // body: JSON.stringify({ username: "example" }),
 */
Obsidian.send = async function(message, callback) {
  
  if (!Obsidian.messages[Obsidian.currentModel]) Obsidian.messages[Obsidian.currentModel] = [];
  // if there's no model data, it creates it
  
  Obsidian.messages[Obsidian.currentModel].push(new Obsidian.Message("user", message));
  // adds it to the model
  
  // const message = document.getElementById('input').value;
  
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      model: Obsidian.currentModel,
      messages: Obsidian.messages[Obsidian.currentModel]
    
    })
  });
  const data = await response.json();
  console.log(data);
  // document.getElementById('message').innerText = "Received!";
  console.log(data.status);
  
  
  Obsidian.messages[Obsidian.currentModel].push(new Obsidian.Message("assistant", data.message));
  // adds it to the model
  
  
  callback(data);
  
  
};

/*async function getMessage() {
  
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
*/
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
