import { HexCell } from "./HexCell";
import { Scene } from "babylonjs";

class HexGrid {
 
    readonly _width : number;
    readonly _heigth : number;
    private _cells : Array<HexCell> = [];
    
    constructor(gridWidth : number, gridHeigth : number, hexRadius : number, scene : Scene) {
        this._width = gridWidth;
        this._heigth = gridHeigth;
        for (let y = 0; y < this.heigth; y++) {
            for (let x = 0; x < this.width; x++) {
                let cell : HexCell = new HexCell(hexRadius, scene)
                if (y % 2 == 0) cell.mesh.position.x += 1.5 * hexRadius
                cell.mesh.position.x += hexRadius * 3 * x;
                cell.mesh.position.z = hexRadius * 0.866025404 * y;
                //cell.neighbors;
                cell.coordinates.x = y;
                cell.coordinates.y = x;
                this.cells.push(cell);
            }
        }
    }

    public get width() : number { return this._width; }
    
    public get heigth() : number { return this._heigth; }

    public get cells() : Array<HexCell> { return this._cells; }
}

export { HexGrid };
