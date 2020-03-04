import {
  ActionManager,
  Action,
  IncrementValueAction,
  Mesh,
  MeshBuilder,
  Vector3,
  Scene
} from "babylonjs";

import { 
  HexCellCoordinates 
} from "./HexCellCoordinates";

class HexCell {
  private _mesh: Mesh;
  private _coordinates : HexCellCoordinates = new HexCellCoordinates(0,0,0);
  private _outerRadius: number;
  private _innerRadius: number;
  private _elevationLevel: number = 1;
  private _neighbors: Object = {
      "NW": HexCell,
      "NE": HexCell,
      "SW": HexCell,
      "SE": HexCell,
      "W" : HexCell,
      "E" : HexCell
  };

  constructor(radius: number, scene: Scene) {
    this._outerRadius = radius;
    this._innerRadius = radius * (Math.sqrt(3) / 2);
    this._mesh = MeshBuilder.CreatePolygon(
      "hexCell",
      {
        shape: [
          new Vector3(this._outerRadius, 0, 0),
          new Vector3(this._outerRadius / 2, 0, this._innerRadius),
          new Vector3(-this._outerRadius / 2, 0, this._innerRadius),
          new Vector3(-this._outerRadius, 0, 0),
          new Vector3(-this._outerRadius / 2, 0, -this._innerRadius),
          new Vector3(this._outerRadius / 2, 0, -this._innerRadius)
        ],
        depth: this._elevationLevel
      },
      scene
    );
    this._mesh.position.y = this._elevationLevel;
    this._mesh.enableEdgesRendering();
    this._mesh.edgesWidth = 4.0;
    this._mesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
    //this.configureCellBehaviour(scene);
  }

  public get mesh(): Mesh {
    return this._mesh;
  }

  public get neighbors(): Object {
    return this._neighbors;
  }

  public getNeighborAt(direction : string) : HexCell{
      if (this.neighbors.hasOwnProperty(direction)) {
          return this.neighbors[direction];
      }
  }

  public setNeighborAt(direction : string, neighbor : HexCell){
    if (this.neighbors.hasOwnProperty(direction)) {
        this.neighbors[direction] = neighbor;
    }
  }

  public set neighbors(v: Object) {
    this._neighbors = v;
  }

  public updatePosition(x: number, y: number, z: number) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  public updatePositionVector(position : Vector3) {
    this.mesh.position = position;
  }

  private configureCellBehaviour(scene: Scene) {
    this.mesh.actionManager = new ActionManager(scene);
    this.mesh.actionManager.registerAction(this.increaseHeight(this._mesh));
    this.mesh.actionManager.registerAction(this.increaseDepth(this._mesh));
    this.mesh.actionManager.registerAction(this.decreaseHeight(this._mesh));
    this.mesh.actionManager.registerAction(this.decreaseDepth(this._mesh));
  }

  private increaseHeight(mesh: Mesh): Action {
    return new IncrementValueAction(
      ActionManager.OnLeftPickTrigger,
      mesh,
      "position.y",
      1
    );
  }

  private increaseDepth(mesh: Mesh): Action {
    return new IncrementValueAction(
      ActionManager.OnLeftPickTrigger,
      mesh,
      "scaling.y",
      1
    );
  }

  private decreaseHeight(mesh: Mesh): Action {
    return new IncrementValueAction(
      ActionManager.OnRightPickTrigger,
      mesh,
      "position.y",
      -1
    );
  }

  private decreaseDepth(mesh: Mesh): Action {
    return new IncrementValueAction(
      ActionManager.OnRightPickTrigger,
      mesh,
      "scaling.y",
      -1
    );
  }

  public get coordinates() : HexCellCoordinates { return this._coordinates; }
  public set coordinates(v : HexCellCoordinates) { this._coordinates = v; }

  /**
   * distanceTo
   *
   * @returns the distance to another given HexCell (in HexCell steps)
   */
  public distanceTo(hexCell: HexCell): number {
    let disX: number = Math.abs(this.x - hexCell.x);
    let disY: number = Math.abs(this.y - hexCell.y);
    let disZ: number = Math.abs(this.z - hexCell.z);
    return (disX + disY + disZ) / 2;
  }
}

export { HexCell };
