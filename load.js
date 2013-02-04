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
        i, name;

      for (i = 0; i < resources.length; i++) {
        name = resources[i].match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        if (name in extensions) {
          name = extensions[name.toLowerCase()];
        } else {
          throw new Error("Unrecognised filetype: " + name);
        }
        

        toLoad += 1;
        parsed[resources[i]] = createElement(name, resources[i]);
      }
      return parsed;
    },
    createElement = function (name, src) {
      if (loadedElements[src]) {
        return loadedElements[src];
      }
      var element = global.document.createElement(name);
      element.src = src;
      element.onload = loaded;
      element.onerror = currentCallbacks.failure;
      global.document.head.appendChild(element);
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
    currentCallbacks,
    extensions = {"js": "script", "png": "img", "jpg": "img", "jpeg": "img"};

  global.Load = Load;
}(this));