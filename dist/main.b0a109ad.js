// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
exports.CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  },
  IMAGE: {
    LOGO: "logo.png",
    OPTIONS: "options_button.png",
    PLAY: "play_button.png",
    TITLE: "title_bg.jpg"
  },
  MOSSY: {
    BACKGROUND_DECOR: "Mossy - BackgroundDecoration.png",
    DECOR_HAZARDS: "Mossy - Decorations&Hazards.png",
    FLOATING_PLATFORMS: "Mossy - FloatingPlatforms.png",
    HANGLING_PLANTS: "Mossy - Hanging Plants.png",
    MOSSY_HILLS: "Mossy - MossyHills.png",
    TILESET: "Mossy - TileSet.png",
    BACKGROUND: 'theme.jpeg'
  },
  AUDIO: {
    TITLE: "shuinvy-childhood.mp3"
  },
  SPRITE: {
    CAT: "cat.png",
    BLUEWIZARD: {
      IDLE: "idle",
      JUMP: "jump",
      // DASH: "dasheffect",
      WALK: "walk"
    }
  }
};
},{}],"src/scenes/LoadScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;
var Constant_1 = require("../Constant");
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);
  var _super = _createSuper(LoadScene);
  function LoadScene() {
    _classCallCheck(this, LoadScene);
    return _super.call(this, Constant_1.CST.SCENES.LOAD);
  }
  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      this.load.setPath("./assets/image");
      for (var prop in Constant_1.CST.IMAGE) {
        //@ts-ignore
        this.load.image(Constant_1.CST.IMAGE[prop], Constant_1.CST.IMAGE[prop]);
      }
    }
  }, {
    key: "loadAudios",
    value: function loadAudios() {
      this.load.setPath("./assets/audio");
      for (var prop in Constant_1.CST.AUDIO) {
        //@ts-ignore
        this.load.audio(Constant_1.CST.AUDIO[prop], Constant_1.CST.AUDIO[prop]);
      }
    }
  }, {
    key: "loadMossyImages",
    value: function loadMossyImages() {
      this.load.setPath("./assets/maps/Mossy Assets/Mossy Tileset");
      for (var prop in Constant_1.CST.MOSSY) {
        //@ts-ignore
        this.load.image(Constant_1.CST.MOSSY[prop], Constant_1.CST.MOSSY[prop]);
      }
    }
  }, {
    key: "loadBlueWizard",
    value: function loadBlueWizard() {
      this.load.setPath("./assets/sprite/BlueWizard Animations");
      for (var prop in Constant_1.CST.SPRITE.BLUEWIZARD) {
        //@ts-ignore
        this.load.atlas(Constant_1.CST.SPRITE.BLUEWIZARD[prop], Constant_1.CST.SPRITE.BLUEWIZARD[prop] + ".png", Constant_1.CST.SPRITE.BLUEWIZARD[prop] + ".json");
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;
      //change screen resolution to: 800x600
      //load atlases
      //load image, spritesheet, sound, tiles, tiledmap,..
      this.loadImages();
      this.loadAudios();
      this.load.setPath("./assets/sprite");
      this.load.spritesheet(Constant_1.CST.SPRITE.CAT, Constant_1.CST.SPRITE.CAT, {
        frameWidth: 32,
        frameHeight: 32
      });
      this.loadBlueWizard();
      //load tiled images
      this.loadMossyImages();
      //load tiled map
      this.load.setPath("./");
      this.load.tilemapTiledJSON({
        key: "map",
        url: "./assets/maps/map.json"
      });
      // Create a loading bar
      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff
        }
      });
      /*
      Loader Events:
          complete - when done loading everything
          progress - loader number progress in decimal
      */
      this.load.on("progress", function (precent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * precent, 50);
        console.log(precent);
      });
      this.load.on("complete", function () {
        // this.scene.start
      });
      this.load.on("load", function (file) {
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      console.log("loaded");
      this.scene.start(Constant_1.CST.SCENES.MENU);
    }
  }]);
  return LoadScene;
}(Phaser.Scene);
exports.LoadScene = LoadScene;
},{"../Constant":"src/Constant.ts"}],"src/scenes/MenuScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;
var Constant_1 = require("../Constant");
var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);
  var _super = _createSuper(MenuScene);
  function MenuScene() {
    _classCallCheck(this, MenuScene);
    return _super.call(this, Constant_1.CST.SCENES.MENU);
  }
  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      //create images(z order)
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, Constant_1.CST.IMAGE.LOGO).setDepth(1);
      this.add.image(0, 0, Constant_1.CST.IMAGE.TITLE).setOrigin(0);
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.5, Constant_1.CST.IMAGE.PLAY).setDepth(2);
      var optionButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, Constant_1.CST.IMAGE.OPTIONS).setDepth(2);
      //create sprites
      var hoverSprite = this.add.sprite(128, 128, Constant_1.CST.SPRITE.CAT);
      hoverSprite.setScale(2);
      hoverSprite.setVisible(false);
      //create animtion
      this.anims.create({
        key: "walk-cat",
        frameRate: 4,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(Constant_1.CST.SPRITE.CAT, {
          frames: [0, 1, 2, 3]
        })
      });
      //create audio
      this.sound.pauseOnBlur = false;
      this.sound.play(Constant_1.CST.AUDIO.TITLE, {
        loop: true
      });
      //make image buttons Interactive
      playButton.setInteractive();
      playButton.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk-cat");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton.y;
        // console.log("over");
      });

      playButton.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      playButton.on("pointerup", function () {
        // console.log("play");
        _this.scene.start(Constant_1.CST.SCENES.PLAY);
      });
      optionButton.setInteractive();
      optionButton.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk-cat");
        hoverSprite.x = optionButton.x - optionButton.width;
        hoverSprite.y = optionButton.y;
      });
      optionButton.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      optionButton.on("pointerup", function () {
        // console.log("option");
        // this.scene.launch();
      });
    }
  }]);
  return MenuScene;
}(Phaser.Scene);
exports.MenuScene = MenuScene;
},{"../Constant":"src/Constant.ts"}],"src/scenes/PlayScene.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;
var Constant_1 = require("../Constant");
var PlayScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);
  var _super = _createSuper(PlayScene);
  function PlayScene() {
    _classCallCheck(this, PlayScene);
    return _super.call(this, Constant_1.CST.SCENES.PLAY);
  }
  _createClass(PlayScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {
      this.anims.create({
        key: Constant_1.CST.SPRITE.BLUEWIZARD.IDLE,
        duration: 5,
        frameRate: 30,
        frames: this.anims.generateFrameNames(Constant_1.CST.SPRITE.BLUEWIZARD.IDLE, {
          prefix: 'Chara - BlueIdle',
          suffix: '.png',
          start: 0,
          end: 19,
          zeroPad: 5
        }),
        repeat: -1
      });
      this.anims.create({
        key: Constant_1.CST.SPRITE.BLUEWIZARD.WALK,
        // duration: 5,
        frameRate: 30,
        frames: this.anims.generateFrameNames(Constant_1.CST.SPRITE.BLUEWIZARD.WALK, {
          prefix: 'Chara_BlueWalk',
          suffix: '.png',
          start: 0,
          end: 18,
          zeroPad: 5
        }),
        repeat: -1
      });
      this.anims.create({
        key: Constant_1.CST.SPRITE.BLUEWIZARD.JUMP,
        // duration: 5,
        frameRate: 30,
        frames: this.anims.generateFrameNames(Constant_1.CST.SPRITE.BLUEWIZARD.JUMP, {
          prefix: 'CharaWizardJump_',
          suffix: '.png',
          start: 0,
          end: 7,
          zeroPad: 5
        }),
        repeat: -1
      });
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      var _a, _b, _c, _d, _e;
      var map = this.make.tilemap({
        key: 'map'
      });
      var tiles = map.addTilesetImage('Mossy - TileSet', Constant_1.CST.MOSSY.TILESET);
      var floatingPlatforms = map.addTilesetImage('FloatingPlatforms', Constant_1.CST.MOSSY.FLOATING_PLATFORMS);
      var hills = map.addTilesetImage('Mossy - MossyHills', Constant_1.CST.MOSSY.MOSSY_HILLS);
      var decord_hazard = map.addTilesetImage('Decorations&Hazards', Constant_1.CST.MOSSY.DECOR_HAZARDS);
      var theme = map.addTilesetImage('theme', Constant_1.CST.MOSSY.BACKGROUND);
      var bg = (_a = map.createLayer("bg", [theme], 0, 0)) === null || _a === void 0 ? void 0 : _a.setScale(0.3).setDepth(-1);
      var plateau = (_b = map.createLayer("Plateau", [floatingPlatforms, tiles, hills], 0, 0)) === null || _b === void 0 ? void 0 : _b.setScale(0.3);
      var base = (_c = map.createLayer("Base", [tiles, floatingPlatforms], 0, 0)) === null || _c === void 0 ? void 0 : _c.setScale(0.3);
      this.cameras.main.setBounds(0, 0, base === null || base === void 0 ? void 0 : base.width, base === null || base === void 0 ? void 0 : base.height);
      //input
      this.cursors = (_d = this.input.keyboard) === null || _d === void 0 ? void 0 : _d.createCursorKeys();
      this.keyboard = (_e = this.input.keyboard) === null || _e === void 0 ? void 0 : _e.addKeys('SPACE');
      //player
      this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, Constant_1.CST.SPRITE.BLUEWIZARD.IDLE);
      this.player.setSize(100, 120);
      this.jumped = false;
      //  Camera controls
      this.cameras.main.startFollow(this.player);
      // map collisions
      base === null || base === void 0 ? void 0 : base.setCollisionByProperty({
        collides: true
      });
      plateau === null || plateau === void 0 ? void 0 : plateau.setCollisionByProperty({
        collides: true
      });
      this.physics.add.collider(this.player, base, function () {
        _this.jumped = true;
      });
      this.physics.add.collider(this.player, plateau, function () {
        _this.jumped = true;
      });
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      var _a, _b;
      if (this.player) {
        if ((_a = this.cursors) === null || _a === void 0 ? void 0 : _a.left.isDown) {
          this.player.setVelocityX(-300);
          this.player.setFlipX(true);
          this.player.anims.play(Constant_1.CST.SPRITE.BLUEWIZARD.WALK, true);
        } else if ((_b = this.cursors) === null || _b === void 0 ? void 0 : _b.right.isDown) {
          this.player.setVelocityX(300);
          this.player.setFlipX(false);
          this.player.anims.play(Constant_1.CST.SPRITE.BLUEWIZARD.WALK, true);
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play(Constant_1.CST.SPRITE.BLUEWIZARD.IDLE, true);
        }
        if (this.keyboard.SPACE.isDown) {
          if (this.jumped) {
            this.jumped = false;
            this.player.setVelocityY(-256 * 2);
            this.player.anims.play(Constant_1.CST.SPRITE.BLUEWIZARD.JUMP, true);
          }
        }
      }
    }
  }]);
  return PlayScene;
}(Phaser.Scene);
exports.PlayScene = PlayScene;
},{"../Constant":"src/Constant.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

/**@type {import("../typings/phaser")} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var LoadScene_1 = require("./scenes/LoadScene");
var MenuScene_1 = require("./scenes/MenuScene");
var PlayScene_1 = require("./scenes/PlayScene");
var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, PlayScene_1.PlayScene],
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  }
};
var game = new Phaser.Game(config);
},{"./scenes/LoadScene":"src/scenes/LoadScene.ts","./scenes/MenuScene":"src/scenes/MenuScene.ts","./scenes/PlayScene":"src/scenes/PlayScene.ts"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61657" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map