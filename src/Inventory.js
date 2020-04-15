"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InventoryUI_1 = require("./InventoryUI");
var Inventory = /** @class */ (function () {
    function Inventory() {
        this._items = new Array();
        this._itemCapacity = 20;
        this._itemCount = 0;
        this._ui = new InventoryUI_1.InventoryUI();
    }
    Inventory.prototype.addItem = function (item) {
        if (this._itemCount < this._itemCapacity) {
            this._items.push(item);
            this._itemCount++;
            // maybe add item 'weight' to determinte slots used
        }
        else {
            throw new Error("ERROR: Inventory is full!");
        }
    };
    Inventory.prototype.removeItem = function (item) {
        var _this = this;
        this._items.forEach(function (itemInInventory, index) {
            if (_this._items[index] == itemInInventory)
                _this._items.pop();
        });
    };
    Inventory.prototype.increaseItemCapacityTo = function (capacity) {
        if (this._itemCapacity < capacity)
            this._itemCapacity = capacity;
        // update ui
    };
    Inventory.prototype.decreaseItemCapacityTo = function (capacity) {
        if (capacity < this._itemCapacity) {
            if (this._itemCount < capacity) {
                this._itemCapacity = capacity;
                // update ui
            }
            else {
                throw new Error("ERROR: Reducing inventory capacity below item count!");
            }
        }
    };
    Object.defineProperty(Inventory.prototype, "items", {
        get: function () { return this._items; },
        set: function (v) { this._items = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "itemCapacity", {
        get: function () { return this._itemCapacity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "itemCount", {
        get: function () { return this._itemCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "ui", {
        get: function () { return this._ui; },
        set: function (v) { this._ui = v; },
        enumerable: true,
        configurable: true
    });
    return Inventory;
}());
exports.Inventory = Inventory;
