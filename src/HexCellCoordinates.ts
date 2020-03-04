class HexCellCoordinates {

    private _x : number;
    private _y : number;
    private _z : number;

    constructor(x : number, y : number, z : number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get x() : number { return this._x; }
    public set x(v : number) { this._x = v; }
    public get y() : number { return this._y; }
    public set y(v : number) { this._y = v; }
    public get z() : number { return this._z; }
    public set z(v : number) { this._z = v; }
}

export { HexCellCoordinates };
