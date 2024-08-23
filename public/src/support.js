// support.js


Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

Element.prototype.toRect = function () {
  return this.getBoundingClientRect();
};

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

NodeList.prototype.removeIndex = HTMLCollection.prototype.removeIndex = function(index) {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) {
      if (i === index) {
        this[i].parentElement.removeChild(this[i]);
        break;
      }
    }
  }
};

NodeList.prototype.indexOf = HTMLCollection.prototype.indexOf = function(node) {
  for(var i = this.length - 1; i >= 0; i--) {
    if(this[i] == node) {
      return i;
    }
  }
};