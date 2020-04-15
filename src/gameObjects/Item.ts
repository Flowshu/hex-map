//import { Mesh, MeshBuilder, Scene } from "babylonjs";

const TYPES = ["HELMET","EXOSUIT","LSU","BOOTS","GLOVES","NEUROMOD"];
const RARITY = ["COMMON","COMMON","COMMON","COMMON","RARE","RARE","RARE","EPIC","EPIC","LEGENDARY"];

export enum Rarity {
    Common = "COMMON",
    //Uncommon = "UNCOMMON",
    Rare = "RARE",
    Epic = "EPIC",
    //Exotic = "EXOTIC",
    Legendary = "LEGENDARY"
}

export class Item {
    
    private _level : number;
    private _rarity : Rarity;
    //private _mesh! : Mesh;    
    
    private _type : string;
  /*  public get type() : string {
        return this._type;
    }
    public set type(v : string) {
        this._type = v;
    }
    */
    
    private _space : string = "EARTH";
    private _time : string = "2020";

    public constructor(
        level: number,
        rarity: Rarity,
        type: string) {
        
        this._level = level;
        this._rarity =  rarity;
        this._type = type;
        //this._mesh = MeshBuilder.CreateBox("item", {}, scene);
        //const seed: number = Math.random();
    }

    public static generate(level: number) : Item {
        const rarity: string = RARITY[Math.floor(Math.random() * 10)];
        const type: string = TYPES[Math.floor(Math.random() * 6)];
        return new Item(level, Rarity.Legendary, type);
    }

    public log() : void {
        console.log(this._level);
        console.log(this._rarity);
        console.log(this._type);
    }

    //public get level() : number { return this._level; }
    //public set level(v : number) { this._level = v; }
    public get rarity() : Rarity { return this._rarity; }
    //public set rarity(v : string) { this._rarity = v; }
    //public get mesh() : Mesh { return this._mesh; }
    //public set mesh(v : Mesh) { this._mesh = v; }
    public get space() : string { return this._space; }
    //public set space(v : string) { this._space = v; }
    public get time() : string { return this._time; }
    //public set time(v : string) { this._time = v; }
}
