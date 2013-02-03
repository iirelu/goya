(function (global) {
  "use strict";
  var
    Load = function (resources, callback) {
      debugger;
      if (arguments.length === 0) {
        throw new Error("Not enough arguments to Load()");
      }
      currentLoaded = 0;
      toLoad = 0;
      currentCallbacks = callback;
      currentElements = parseResources(resources);
    },
    parseResources = function (resources) {
      var parsed = {},
        name, res, currentRes;

      for (name in resources) {
        if (resources.hasOwnProperty(name)) {
          parsed[name] = [];
          for (res = 0; res < resources[name].length; res += 1) {
            if (!loadedElements[res]) {
              parsed[name][res] = createElement(name, resources[name][res]);
              loadedElements[res] = parsed[name][res];
            } else {
              parsed[name][res] = loadedElements[res];
            }
            toLoad += 1;
          }
        }
      }
      return parsed;
    },
    createElement = function (name, src) {
      var element = global.document.createElement(name);
      element.src = src;
      element.addEventListener("load", loaded, false);
      element.addEventListener("error", currentCallbacks.failed, false);
      return element;
    },
    loaded = function () {
      currentLoaded += 1;
      if (toLoad === currentLoaded) {
        currentCallbacks.success(currentElements);
      }
    },
    loadedElements = {},
    currentElements,
    toLoad,
    currentLoaded,
    currentCallbacks;

  global.Load = Load;
}(this));