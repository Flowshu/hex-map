import { ActionManager, ExecuteCodeAction, FollowCamera, Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

class IsometricCamera {

    private _camera : FollowCamera;
    private _cameraTarget : Mesh;

    constructor(scene: Scene) {
        this._cameraTarget = MeshBuilder.CreatePolygon("cameraTarget", { shape: [new Vector3(0,0,0), new Vector3(0,0,1)] }, scene);

        let inputMap = {};
        if (scene.actionManager == null) {
            scene.actionManager = new ActionManager(scene);
        }
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {								
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {								
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        scene.onBeforeRenderObservable.add(()=>{
            if(inputMap["ArrowUp"]){
                this.cameraTarget.position.z += 0.2
                this.cameraTarget.position.x += 0.2
            } 
            if(inputMap["ArrowLeft"]){
                this.cameraTarget.position.z -= 0.2
                this.cameraTarget.position.x += 0.2
            } 
            if(inputMap["ArrowDown"]){
                this.cameraTarget.position.z -= 0.2
                this.cameraTarget.position.x -= 0.2
            } 
            if(inputMap["ArrowRight"]){
                this.cameraTarget.position.z += 0.2
                this.cameraTarget.position.x -= 0.2
            }    
        })
    
        this._camera = new FollowCamera("IsometricCamera", new Vector3(0, 5, 10), scene, this.cameraTarget);
        this.camera.radius = 30;
        this.camera.heightOffset = 10;
        this.camera.rotationOffset = 45;
        this.camera.cameraAcceleration = 0.9;
        this.camera.maxCameraSpeed = 10;
    }

    public get cameraTarget() : Mesh { return this._cameraTarget; }
    public set cameraTarget(v : Mesh) { this._cameraTarget = v; }
    public get camera() : FollowCamera { return this._camera; }
    public set camera(v : FollowCamera) { this._camera = v; }
}

export { IsometricCamera };
