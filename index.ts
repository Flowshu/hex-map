import { Engine, HemisphericLight, Scene, Vector3, PointerInfo, PointerEventTypes, ActionManager, InterpolateValueAction, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Tags, RecastJSPlugin, Color3, IAnimationKey, Animation, TargetCamera, FreeCamera, Texture, GlowLayer, KeyboardEventTypes } from "babylonjs";
import { IsometricCamera } from "./src/IsometricCamera";
import { Character } from "./src/Character";
import 'babylonjs-loaders';
import 'babylonjs-gui';
import 'babylonjs-materials'

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    engine.enableOfflineSupport = false;
    Animation.AllowMatricesInterpolation = true;
    const scene: Scene = new Scene(engine);
//    let camera = new IsometricCamera(scene, true);
    //let camera = new TargetCamera("cam", new Vector3(5,10,5), scene);
    let camera = new FreeCamera("cam", new Vector3(50,50,50), scene);
    camera.attachControl(canvas, true);
    let light = new HemisphericLight("light", new Vector3(0, 0, 1), scene);
    light.intensity = 0.7;

    let navigationPlugin = new RecastJSPlugin();
    var parameters = {
        cs: 0.2,
        ch: 0.2,
        walkableSlopeAngle: 35,
        walkableHeight: 0,
        walkableClimb: 1,
        walkableRadius: 1,
        maxEdgeLen: 12.,
        maxSimplificationError: 1.3,
        minRegionArea: 8,
        mergeRegionArea: 20,
        maxVertsPerPoly: 6,
        detailSampleDist: 6,
        detailSampleMaxError: 1,
        };
    //var ground = MeshBuilder.CreateGroundFromHeightMap("gdhm", "assets/ground.jpg", {width:50, height :50, subdivisions: 200, maxHeight: 2}, scene);
/*
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {         
            if (Math.random() < 0.66) {
                let mesh = MeshBuilder.CreateGround("ground", {
                    width: Math.floor(Math.random() * 10), 
                    height: Math.floor(Math.random() * 10)
                }, scene);
                mesh.position.x = x * 10;
                mesh.position.y = 5;
                mesh.position.z = y * 10;
            }   
        }
    }*/
    var redMat = new StandardMaterial("ground", scene);
    redMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat.emissiveColor = Color3.FromHexString("#FF0000");
    var tex = new Texture("./assets/textures/texture.png", scene)
    var texMat = new StandardMaterial("texture", scene);
    texMat.diffuseTexture = tex;
    let ground;
    let character: Character = new Character(scene, ground, (char) => {
        //camera.cameraTarget = mesh;
        camera.lockedTarget = char.mesh;
        scene.onBeforeRenderObservable.add(() => {
            camera.position = char.mesh.position.add(new Vector3(5,10,5));
        });
    });
    let enemy: Character = new Character(scene, ground, (char) => {
        char.mesh.position = new Vector3(1,0,-1);
        char.playIdleAnimation();
    });
    /*
    let ground = Mesh.CreateGround("ground", 50, 50, 1, scene);
    SceneLoader.ImportMesh("", "./assets/", "tree.gltf", scene, function (newMeshes) {
    var mesh = newMeshes[0];
    Tags.AddTagsTo(mesh, "tree");
    let meshes: Mesh[] = scene.getMeshesByTags("tree");
    let tree = meshes[0];
    Tags.RemoveTagsFrom(mesh, "tree");
    //tree.isVisible = false;
    tree.source?.setParent(null);
    for (var index = 0; index < 100; index++) {
        var newInstance = tree.createInstance("i" + index);
        newInstance.position.x = Math.random() * 25;
        newInstance.position.z = Math.random() * 25;
    }
});
    */
    SceneLoader.Append("assets/", "level.gltf", scene, (scene) => {
        Tags.AddTagsTo(scene.getMeshByName("Walls"), "walkable");
        Tags.AddTagsTo(scene.getMeshByName("Ground"), "walkable");
        Tags.AddTagsTo(scene.getMeshByName("Chest1"), "walkable");
        let meshes: Mesh[] = scene.getMeshesByTags("walkable");
        navigationPlugin.createNavMesh(meshes, parameters);
        let navmeshdebug = navigationPlugin.createDebugNavMesh(scene);
        var matdebug = new StandardMaterial('matdebug', scene);
        matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
        matdebug.alpha = 0.2;
        navmeshdebug.material = matdebug;
        let chest: Mesh;
        meshes.forEach(mesh => {
            if (mesh.name == "Walls") {
                mesh.material = redMat;
            }
            if (mesh.name == "Chest1") {
                chest = mesh;
            }
        });
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP) {
                if (pointerInfo.pickInfo?.pickedMesh == chest) {
                    console.log("Clicked chest!");
                }
            }
        });
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP && pointerInfo.event.button == 2) {
                if (pointerInfo.pickInfo?.pickedMesh == navmeshdebug) {
                    let projectile = MeshBuilder.CreateSphere("projectile", { diameter : 0.2}, scene);
                    projectile.material = redMat;
                    let dest = new Vector3(pointerInfo.pickInfo?.pickedPoint?.x, 1, pointerInfo.pickInfo?.pickedPoint?.z);
                    let keys = new Array<IAnimationKey>();
                    keys.push({
                        frame : 0,
                        value : character.mesh.position
                    });
                    keys.push({
                        frame : 100,
                        value : dest
                    });
                    let animation = new Animation("projectileAnimation", "position", 100, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
                    animation.setKeys(keys);
                    scene.beginDirectAnimation(projectile, [animation], 0, 100, false, 1, () => {
                        projectile.dispose();
                    });
                }
            }
        });
        /*var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var image = new BABYLON.GUI.Image("img", "assets/Inventory.JPG");
        advancedTexture.addControl(image);*/
        let pathPoints: Array<Vector3> = new Array<Vector3>();
        scene.onPointerObservable.add((pointerInfo) => {
            if (true || (pointerInfo.type == PointerEventTypes.POINTERUP  && pointerInfo.event.button == 0)) {
                if (pointerInfo.pickInfo?.pickedPoint && pointerInfo.pickInfo.pickedMesh == navmeshdebug) {
                    pathPoints = navigationPlugin.computePath(character.mesh.position, navigationPlugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint));
                    console.log(pathPoints);
                    let keys = new Array<IAnimationKey>();
                    let dists = new Array<number>();
                    if (pathPoints.length > 0) {
                        dists.push(Vector3.Distance(character.mesh.position, pathPoints[0]));
                        for (let point = 0; point < pathPoints.length - 1; point++) {
                                dists.push(Vector3.Distance(pathPoints[point], pathPoints[point + 1]));
                        }
                        let currentFrame: number = 0;
                        for (let dist = 0; dist < dists.length; dist++) {
                            currentFrame += dists[dist];
                            keys.push({
                                frame: currentFrame,
                                value: pathPoints[dist]
                            });
                        }
                        scene.stopAnimation(character.mesh, "InterpolatePositionAnim");
                        let animation = new Animation("InterpolatePositionAnim", "position", 5, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
                        animation.setKeys(keys);
                        if (!character.isMoving) {
                            //character.playRunAnimation();
                            //character.isMoving = true;
                        }
                        scene.beginDirectAnimation(character.mesh, [animation], 0, currentFrame, false, 1, () => {
                            //character.playIdleAnimation();
                            //character.isMoving = false;
                        });
                    }
                }
            }
        });
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP) {
                if (pointerInfo.pickInfo?.pickedPoint && pointerInfo.pickInfo.pickedMesh == chest) {
                    character.moveTo(new Vector3(8.039411544799805, -0.39500313997268677, 10.244003295898438), navigationPlugin, () => {
                        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                        var label = BABYLON.GUI.Button.CreateSimpleButton("but", "Item picked up!");
                        advancedTexture.addControl(label);
                        label.width = 0.2;
                        label.height = "40px";
                        label.color = "black";
                        label.background = "orange";
                        setTimeout(() => {
                            label.isVisible = false;
                        }, 2000);
                        //var image = new BABYLON.GUI.Image("img", "assets/Inventory.JPG");
                        //advancedTexture.addControl(image);
                    });     
                }
            }
        });
        scene.onBeforeRenderObservable.add(() => {
            if (pathPoints.length > 0) {
                for (let point = 0; point < pathPoints.length - 1 ; point++) {
                    if (Vector3.Distance(character.mesh.position, pathPoints[point]) < 0.2) {
                       character.mesh.lookAt(pathPoints[point + 1]);
                    }
                }
            }
        });
        scene.onKeyboardObservable.add((keyboardInfo) => {
            if (keyboardInfo.type == KeyboardEventTypes.KEYUP) {
                console.log(keyboardInfo.event.key);
            }
        });
    });
    var gl = new GlowLayer("glow", scene);

    return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
