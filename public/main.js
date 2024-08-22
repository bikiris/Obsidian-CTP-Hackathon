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
Obsidian.send = function(message) {};

async function getMessage() {
  const response = await fetch('/api/message');
  const data = await response.json();
  document.getElementById('message').innerText = data.message;
}
