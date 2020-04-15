import { FollowCamera, Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

export class IsometricCamera {

    public _camera: FollowCamera;
    private _cameraTarget: Mesh;

    public set cameraTarget(v : Mesh) {
        this._cameraTarget = v;
        this._camera.lockedTarget = v;
        console.log(this._cameraTarget);
        this._camera
    }
    
    public _phantomCameraTarget: Mesh;

    constructor(scene: Scene, attachControl: boolean) {
        this._phantomCameraTarget = MeshBuilder.CreatePolygon("phantomCameraTarget", { shape: [new Vector3(0, 0, 0), new Vector3(0, 0, 1)] }, scene);
        this._cameraTarget = this._phantomCameraTarget;
        this._camera = new FollowCamera("IsometricCamera", new Vector3(0, 5, 10), scene, this._cameraTarget);

        this._camera.radius = 25;
        this._camera.heightOffset = 15;
        this._camera.rotationOffset = 45;
        this._camera.cameraAcceleration = 0.9;
        this._camera.maxCameraSpeed = 10;
        this._camera.noRotationConstraint = false;
        if (attachControl) {
            this.attachControl(scene);
        }
    }

    private attachControl(scene: Scene): void {
        let LEFT: boolean;
        let RIGHT: boolean;
        let UP: boolean;
        let DOWN: boolean;
        let rotateMode: boolean;
        let width = scene.getEngine().getRenderWidth();
        let height = scene.getEngine().getRenderHeight();
        //let movementVector: Vector3;
        let cameraSpeed: number = 0.2;

        // update pointer information on pointer change
        scene.onPointerObservable.add((pointerInfo) => {
            LEFT = (pointerInfo.event.x < 20);
            RIGHT = (pointerInfo.event.x > (scene.getEngine().getRenderWidth() - 20));
            UP = (pointerInfo.event.y < 20);
            DOWN = (pointerInfo.event.y > (scene.getEngine().getRenderHeight() - 20));
            rotateMode = (pointerInfo.event.shiftKey);
            //console.log("x: " + pointerInfo.event.x);
            //console.log("y: " + pointerInfo.event.y);
        });

        // set camera position to current pointer information
        // before rendering each frame
        scene.onBeforeRenderObservable.add(() => {
            if (rotateMode) {
                if (RIGHT) {
                    this._camera.rotationOffset -= 0.5;
                }
                if (LEFT) {
                    this._camera.rotationOffset += 0.5;
                }
                if (UP) {
                    this._camera.radius -= 0.2;
                }
                if (DOWN) {
                    this._camera.radius += 0.2;
                }
            }
            else {
                //movementVector = this._camera.getFrontPosition(1);
                //movementVector.y = 0; // set y to 0 so the camera moves in the x-z-plane
                //movementVector = movementVector.normalize().scale(cameraSpeed);
                if (LEFT) {  
                    //movementVector = this.getOrthogonalVector(movementVector);
                    //this._cameraTarget.position = this._cameraTarget.position.add(movementVector);
                    this._phantomCameraTarget.position.x += cameraSpeed;
                    this._phantomCameraTarget.position.z -= cameraSpeed;
                }
                if (RIGHT) {
                    //movementVector = this.getOrthogonalVector(movementVector);
                    //this._cameraTarget.position = this._cameraTarget.position.subtract(movementVector);
                    this._phantomCameraTarget.position.z += cameraSpeed;
                    this._phantomCameraTarget.position.x -= cameraSpeed;
                }
                if (UP) {
                    //this._cameraTarget.position = this._cameraTarget.position.subtract(movementVector);
                    this._phantomCameraTarget.position.x -= cameraSpeed;
                    this._phantomCameraTarget.position.z -= cameraSpeed;
                }
                if (DOWN) {
                    //this._cameraTarget.position = this._cameraTarget.position.add(movementVector);
                    this._phantomCameraTarget.position.z += cameraSpeed;
                    this._phantomCameraTarget.position.x += cameraSpeed;
                }
            }
        });
    }

    private getOrthogonalVector(vec: Vector3) : Vector3 {
        return new Vector3(vec.x, 0, -vec.z);
    }
}
