(function (global) {
  "use strict";
  var Goya = (function () {

    var canvas = global.document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      hud = global.document.getElementById("hud"),
      fps = global.document.body.appendChild(global.document.createElement("p")),
      W,
      H,
      gradient,
      oldTime = new Date().getTime(),
      newTime = 0,
      i,
      loadingNum = 0,
      config = {
        floorHeight: 0,
        floorColour: "#215",
        backgroundColour: "rgba(0, 0, 0, 0.01)"
      },
      resize = function () {
        W = global.window.innerWidth;
        H = global.window.innerHeight;
        canvas.width = W;
        canvas.height = H;
      },
      draw = function () {
        //drawstuffs
        requestAnimationFrame(draw, canvas);
        newTime = new Date().getTime() - oldTime;
        oldTime = new Date().getTime();
        fps.innerText = "Milliseconds: " + newTime;

        if(mouse.buttons === 1) {
          ctx.clearRect(0, 0, W, H);
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, loadingNum % Math.PI*2-1, loadingNum % Math.PI*2, false);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#000";
        ctx.stroke();

        loadingNum += newTime / 200;

      },
      step = function () {
        //stepstuffs
      },
      preventer = function (e) {
        e.preventDefault();
      }


    return {
      init: function () {

        canvas.classList.remove("loading");

        resize();
        global.addEventListener("resize", resize, false);
        global.addEventListener("mousedown", preventer, false);
        global.addEventListener("mouseup", preventer, false);
        ctx.globalAlpha = 0.5
        return requestAnimationFrame(draw, canvas);
      },
      getConfig: function () {
        return config;
      },
      setConfig: function (configItem, configVar) {
        if (config[configItem]) {
          config[configItem] = configVar;
        }
      },
      config: config
    };

  }());

  // Vector position, Vector velocity, Colour colour, Number life
  function Particle(properties) {
    this.position = new Vector(properties.position.x || 0, properties.position.y || 0);
    this.velocity = new Vector(properties.velocity.x || 0, properties.velocity.y || 0);
    this.colour = properties.colour || new Colour();
    this.currentLife = properties.life;
    this.startingLife = properties.life;
  }
  Particle.prototype.move = function () {
    this.position = this.position.add(this.velocity);
    this.currentLife -= 1
  };


  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  Vector.prototype.add = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  };
  Vector.prototype.each = function (func) {
    func(this.x);
    func(this.y);
  };


  function Colour(red, green, blue, alpha) {
    if(!this instanceof Colour) {
      return new Colour(red, green, blue, alpha);
    }
    this.r = red || Math.floor(Math.random()*255);
    this.g = green || Math.floor(Math.random()*255);
    this.b = blue || Math.floor(Math.random()*255);
    this.a = alpha || 1;
    
  }
  Colour.prototype.alpha = function (newAlpha) {
    this.a = newAlpha || 1;
    return this;
  };
  Colour.prototype.red = function (newRed) {
    this.r = newRed || Math.floor(Math.random()*255);
    return this;
  };
  Colour.prototype.green = function (newGreen) {
    this.g = newGreen || Math.floor(Math.random()*255);
    return this;
  };
  Colour.prototype.blue = function (newBlue) {
    this.b = newBlue || Math.floor(Math.random()*255);
    return this;
  };
  Colour.prototype.mix = function (newColour) {
    this.r = (this.r + newColour.r) / 2;
    this.g = (this.g + newColour.g) / 2;
    this.b = (this.b + newColour.b) / 2;
    this.a = (this.a + newColour.a) / 2;
  }
  Colour.prototype.toString = function () {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  };

  global.Goya = Goya;
  global.Particle = Particle;
  global.Colour = Colour;
}(this));