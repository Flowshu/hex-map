import { Item } from "./gameObjects/Item";
import { InventoryUI } from "./InventoryUI";

export class Inventory {

    private _items : Array<Item>;   // list of all items currently in the inventory 
    private _itemCapacity : number; // number of items the inventory can currently hold
    private _itemCount : number;    // number of items that are currently in the inventory
    private _ui : InventoryUI;      // the GUI representation of the inventory
    
    constructor() {
        this._items = new Array<Item>();
        this._itemCapacity = 20;
        this._itemCount = 0;
        this._ui = new InventoryUI();
    }

    public addItem(item : Item) : void {
        if (this._itemCount < this._itemCapacity) {
            this._items.push(item);
            this._itemCount ++;
            // maybe add item 'weight' to determinte slots used
        }
        else {
            throw new Error("ERROR: Inventory is full!");
        }
    }

    public removeItem(item : Item) : void {
        this._items.forEach((itemInInventory, index) => {
            if (this._items[index] == itemInInventory) this._items.pop();
        });
    }

    public increaseItemCapacityTo(capacity : number) {
        if (this._itemCapacity < capacity) this._itemCapacity = capacity;
        // update ui
    }

    public decreaseItemCapacityTo(capacity : number) {
        if (capacity < this._itemCapacity) {
            if (this._itemCount < capacity) {
                this._itemCapacity = capacity
                // update ui
            }
            else {
                throw new Error("ERROR: Reducing inventory capacity below item count!");    
            }
        }
    }
    public get items() : Array<Item> { return this._items; }
    public set items(v : Array<Item>) { this._items = v; }
    public get itemCapacity() : number { return this._itemCapacity; }
    public get itemCount() : number { return this._itemCount; }
    public get ui() : InventoryUI { return this._ui; }
    public set ui(v : InventoryUI) { this._ui = v; }
}
