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
  this.content = message;
};

Obsidian.modelSystemPrompt = {
  "cuny-faq": "You’re an assistant for a student of a City University of New York, that will answer questions.",
  "mental-health" : "You’re an assistant for a student of a City University of New York, that will answer questions.",
  "activities" : "You’re an assistant for a student of a City University of New York, that will answer questions.",
  "summarization" : "You are a summarization expert, you will provide the summary to the texts you receive."
}

/**
 * @class Obsidian
 * @method test - a function to test the message
 * @param {Obsidian.Message} message - // body: JSON.stringify({ username: "example" }),
 */
Obsidian.test = function(message, callback){
  
  console.log("Obsidian.test:: Testing message to the backend");
  
  Obsidian.currentModel = Obsidian.modelIds[0];
  
  console.log("Obsidian.test:: Set the current model to " + Obsidian.currentModel);
  
  
  console.log("Obsidian.test:: Sending message to server");
  
  Obsidian.send(message, (data)=>{
    
    console.log("Obsidian.test:: Received message to server");
    
    console.log(data);
    
    callback(data);
    
  });
  
};

/**
 * @class Obsidian
 * @property {String} dummyServerText - sample text for dummy server test 
 */
Obsidian.dummyServerText = "Hello world, from fake server.";

/**
 * @class Obsidian
 * @method sendMessage - a function to send the message
 * @param {Obsidian.Message} message - // body: JSON.stringify({ username: "example" }),
 */
Obsidian.send = async function(message, callback) {
  
  if (!Obsidian.messages[Obsidian.currentModel]) {
    
    Obsidian.messages[Obsidian.currentModel] = [];
    // if there's no model data, it creates it
    
    Obsidian.messages[Obsidian.currentModel].push(new Obsidian.Message("system", Obsidian.modelSystemPrompt[Obsidian.currentModel]));
    // adds it to the model
  }

  Obsidian.messages[Obsidian.currentModel].push(new Obsidian.Message("user", message));
  
  var data = {};
  
  if (!location.href.startsWith("file://")) {
    
    const response = await fetch('http://localhost:8000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        messages: Obsidian.messages[Obsidian.currentModel]
      })
    });
    data = await response.json();
    console.log(data);
    console.log(data.status);
    
  } else {
    
    data = Obsidian.dummyServerText;
    
  }
  
  
  Obsidian.messages[Obsidian.currentModel].push(new Obsidian.Message("assistant", data));
  // adds it to the model
  
  
  callback(data);
  
};
