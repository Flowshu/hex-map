"use strict";
//import { Mesh, MeshBuilder, Scene } from "babylonjs";
Object.defineProperty(exports, "__esModule", { value: true });
var TYPES = ["HELMET", "EXOSUIT", "LSU", "BOOTS", "GLOVES", "NEUROMOD"];
var RARITY = ["COMMON", "COMMON", "COMMON", "COMMON", "RARE", "RARE", "RARE", "EPIC", "EPIC", "LEGENDARY"];
var Rarity;
(function (Rarity) {
    Rarity["Common"] = "COMMON";
    //Uncommon = "UNCOMMON",
    Rarity["Rare"] = "RARE";
    Rarity["Epic"] = "EPIC";
    //Exotic = "EXOTIC",
    Rarity["Legendary"] = "LEGENDARY";
})(Rarity = exports.Rarity || (exports.Rarity = {}));
var Item = /** @class */ (function () {
    function Item(level, rarity, type) {
        /*  public get type() : string {
              return this._type;
          }
          public set type(v : string) {
              this._type = v;
          }
          */
        this._space = "EARTH";
        this._time = "2020";
        this._level = level;
        this._rarity = rarity;
        this._type = type;
        //this._mesh = MeshBuilder.CreateBox("item", {}, scene);
        //const seed: number = Math.random();
    }
    Item.generate = function (level) {
        var rarity = RARITY[Math.floor(Math.random() * 10)];
        var type = TYPES[Math.floor(Math.random() * 6)];
        return new Item(level, Rarity.Legendary, type);
    };
    Item.prototype.log = function () {
        console.log(this._level);
        console.log(this._rarity);
        console.log(this._type);
    };
    Object.defineProperty(Item.prototype, "rarity", {
        //public get level() : number { return this._level; }
        //public set level(v : number) { this._level = v; }
        get: function () { return this._rarity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "space", {
        //public set rarity(v : string) { this._rarity = v; }
        //public get mesh() : Mesh { return this._mesh; }
        //public set mesh(v : Mesh) { this._mesh = v; }
        get: function () { return this._space; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "time", {
        //public set space(v : string) { this._space = v; }
        get: function () { return this._time; },
        enumerable: true,
        configurable: true
    });
    return Item;
}());
exports.Item = Item;
