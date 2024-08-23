// ui.js

(function(){

var inputBox = document.getElementById("chatbot-page-textarea-container");


var sendButton = document.getElementById("chatbot-page-send");
var inputTextEl = document.getElementById("chatbot-page-input");

var resEl = document.getElementById("chatbot-page-result-container");


var buttons = document.getElementsByClassName("home-button");

function onClick(e){
  Obsidian.currentModel = (this.getAttribute("model-type"));
  
  var messages = Obsidian.messages[Obsidian.currentModel];
  // gets the messages
  
  //console.log(messages, Obsidian.messages, Obsidian.currentModel);
  
  resEl.children.remove();
  
  if (messages) {
    for (var message of messages) {
      
      //console.log(message);
      
      var oldEl = document.createElement("div");
      oldEl.setAttribute("class", "chatbot-page-result-item" + (message.role == "user" ? " " : " chatbot-page-result-item-robot"));
      oldEl.setAttribute("style", "width: calc(100% - 38px); opacity: 1; margin: 8px;");
      oldEl.innerText = message.message;
      resEl.appendChild(oldEl);
      
      
    }
  }
  
  document.getElementById("chatbot-page-title").innerText = this.getElementsByClassName("bold-text")[0].innerText;
  
  document.getElementById("page-container").style.left = "-100%";
  document.getElementById("header-return-button").style.width = "24px";
  
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = onClick;
}


var isLoading = false;


document.getElementById("header-return-button").onclick = function(){
  
  if (isLoading) return;
  
  document.getElementById("page-container").style.left = "0";
  document.getElementById("header-return-button").style.width = "0";
  
};



/*

<div class="chatbot-page-result-item" style="width: calc(100% - 38px); opacity: 1; margin: 8px;">Can you give me a summary of 911</div><div class="chatbot-page-result-item chatbot-page-result-item-robot" style="width: calc(100% - 38px); opacity: 1; margin: 8px;">Hello Geek. This Message is From Server</div>

*/

sendButton.onclick = function(){
  
  if (isLoading || inputTextEl.value.trim() == "") return;
  // don't run if it's loading
  
  isLoading = true;
  
  var inputText = inputTextEl.value;
  
  console.log("print")
  
  var newEl = document.createElement("div");
  newEl.setAttribute("class", "chatbot-page-result-item");
  newEl.innerText = inputTextEl.value;
  newEl.innerHTML += `<div id="chatbot-page-result-item-loader" class="chatbot-page-result-item-loader">
    <div class="chatbot-page-result-item-inner chatbot-page-result-item-one"></div>
    <div class="chatbot-page-result-item-inner chatbot-page-result-item-two"></div>
    <div class="chatbot-page-result-item-inner chatbot-page-result-item-three"></div>
  </div>`;
  
  inputBox.style.opacity = "0.8";
  
  
  inputTextEl.value = "";
  
  resEl.appendChild(newEl);
  
  
  setTimeout(function(){
    
    newEl.style.width = "calc(100% - 38px)";
    newEl.style.opacity = "1";
    newEl.style.borderSize = "1";
    newEl.style.margin = "8px";
    
    
    setTimeout(function(){
      
      Obsidian.send(inputText, function(data){
        
        document.getElementById("chatbot-page-result-item-loader").style.opacity = 0;
        // removes the element
        
        
        var newOutEl = document.createElement("div");
        newOutEl.setAttribute("class", "chatbot-page-result-item chatbot-page-result-item-robot");
        newOutEl.innerText = data;
        
        
        
        resEl.appendChild(newOutEl);
        
        setTimeout(function(){
          
          document.getElementById("chatbot-page-result-item-loader").remove();
          
          newOutEl.style.width = "calc(100% - 38px)";
          newOutEl.style.opacity = "1";
          newOutEl.style.borderSize = "1";
          newOutEl.style.margin = "8px";
          
        }, 200);
        
        isLoading = false;
        
      });
      
    }, 1000);
    
  }, 200);
  
  
  console.log("print")
  
};
  
})();
