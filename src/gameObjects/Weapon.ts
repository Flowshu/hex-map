import { Item } from "./Item";

export class Weapon extends Item {

    private _baseDamage : number = 10;
    private _attackSpeed : number = 1.2;

    constructor(level : number, rarity : any, type : string) {
        super(level, rarity, type);
    }

    public get attackSpeed() : number { return this._attackSpeed; }
    public set attackSpeed(v : number) { this._attackSpeed = v; }
    public get baseDamage() : number { return this._baseDamage; }
    public set baseDamage(v : number) { this._baseDamage = v; }
}
