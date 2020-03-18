import { Engine, HemisphericLight, Scene, Vector3} from "babylonjs";
import { HexGrid } from "./src/HexGrid";
import { IsometricCamera } from "./src/IsometricCamera";

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    const scene: Scene = new Scene(engine);

    let camera = new IsometricCamera(scene);

    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    let map: HexGrid = new HexGrid(5, 10, 2, scene);

    return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
