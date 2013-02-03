(function (global) {
  "use strict";
  var Load = function (callback, resources) {
    if (arguments.length === 0) {
      throw new Error("Not enough arguments to Load()");
    }
    global.console.log("hey! im still here!");
  }

  global.Load = Load;
}(this));