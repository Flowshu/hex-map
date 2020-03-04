import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "babylonjs";
import { HexCell } from "./src/HexCell";
import { HexGrid } from "./src/HexGrid";

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    const scene: Scene = new Scene(engine);

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var map: HexGrid = new HexGrid(20, 10, 2, scene);

    return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
