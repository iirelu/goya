(function (global) {
  "use strict";
  var
    Load = function (resources, callback) {
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
            if (!loadedElements[resources[name][res]]) {
              parsed[name][res] = createElement(name, resources[name][res]);
              loadedElements[resources[name][res]] = parsed[name][res];
            } else {
              parsed[name][res] = loadedElements[resources[name][res]];
              global.console.log(loadedElements[resources[name][res]]);
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
      element.onload = loaded;
      element.onerror = currentCallbacks.failure;
      global.document.head.appendChild(element);
      global.console.log(element);
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