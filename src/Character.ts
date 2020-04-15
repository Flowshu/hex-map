import { Animation, GroundMesh, Mesh, Scene, SceneLoader, Nullable, Skeleton, Tags, AnimationRange, Vector3, IAnimationKey, RecastJSPlugin } from "babylonjs";
import { IsometricMouseCharacterController } from "./IsometricMouseCharacterController";
import { IsometricCharacterController } from "./IsometricCharacterController";
import { Vector3WithInfo } from "babylonjs-gui";

export class Character {

    private _mesh!: Mesh;
    private _skeleton!: Skeleton;

    private _controller: IsometricCharacterController;
    private _scene: Scene;
    private _isMoving: boolean = false;

    private _idleRange!: Nullable<AnimationRange>;
    private _walkRange!: Nullable<AnimationRange>;
    private _runRange!: Nullable<AnimationRange>;

    constructor(scene: Scene, ground: GroundMesh, cb: (char: Character) => void) {
        this._scene = scene;
        this._controller = new IsometricMouseCharacterController(scene)
        SceneLoader.ImportMesh("", "./assets/", "dummy3.babylon", scene, (newMeshes, _particleSystems, skeletons) => {
            this._skeleton = skeletons[0];

            this._skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            this._skeleton.animationPropertiesOverride.enableBlending = true;
            this._skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
            this._skeleton.animationPropertiesOverride.loopMode = 1;

            // hack to convert AbstractMesh to Mesh
            let tag: string = "tag";
            Tags.AddTagsTo(newMeshes[0], tag);
            this._mesh = scene.getMeshesByTags(tag)[0];
            Tags.RemoveTagsFrom(this._mesh, tag);
            this._runRange = this._skeleton.getAnimationRange("YBot_Run");
            this._walkRange = this._skeleton.getAnimationRange("YBot_Walk");
            this._idleRange = this._skeleton.getAnimationRange("YBot_Idle");
            this.playRunAnimation();
            this.configureBehaviour();
            cb(this);
        });
    }

    public moveTo(target: Vector3, plugin: RecastJSPlugin, cb: () => void) {
        let pathPoints = plugin.computePath(this.mesh.position, plugin.getClosestPoint(target));
        let keys = new Array<IAnimationKey>();
        let dists = new Array<number>();
        if (pathPoints.length > 0) {
            dists.push(Vector3.Distance(this.mesh.position, pathPoints[0]));
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
            this._scene.stopAnimation(this.mesh, "InterpolatePositionAnim");
            let animation = new Animation("InterpolatePositionAnim", "position", 5, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
            animation.setKeys(keys);
            if (!this.isMoving) {
                //character.playRunAnimation();
                //character.isMoving = true;
            }
            this._scene.beginDirectAnimation(this.mesh, [animation], 0, currentFrame, false, 1, () => {
                //character.playIdleAnimation();
                //character.isMoving = false;
                cb();
            });
            this._scene.onBeforeRenderObservable.add(() => {
                if (pathPoints.length > 0) {
                    for (let point = 0; point < pathPoints.length - 1 ; point++) {
                        if (Vector3.Distance(this.mesh.position, pathPoints[point]) < 0.2) {
                           this.mesh.lookAt(pathPoints[point + 1]);
                        }
                    }
                }
            });
        }
        
    }

    public isInProximityOf(target: Vector3): boolean {
        let treshhold: number = 1;
        return (Vector3.Distance(this._mesh.position, target) <= treshhold)
    }

    public playIdleAnimation() {
        if (this._idleRange) this._scene.beginAnimation(this._skeleton, this._idleRange.from, this._idleRange.to, true);
    }

    public playWalkAnimation() {
        if (this._walkRange) this._scene.beginAnimation(this._skeleton, this._walkRange.from, this._walkRange.to, true);
    }

    public playRunAnimation() {
        if (this._runRange) this._scene.beginAnimation(this._skeleton, this._runRange.from, this._runRange.to, true);
    }

    private configureBehaviour() {
        /*
        scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP) {
                if (pointerInfo.pickInfo?.pickedPoint && pointerInfo.pickInfo.pickedMesh == ground) {
                    let keys = new Array<IAnimationKey>();
                    let currentPosition = this.mesh.position;
                    let targetPosition = pointerInfo.pickInfo.pickedPoint;
                    let interpolationVector = targetPosition.subtract(currentPosition);
                    for (let frameNum = 0; frameNum <= 100; frameNum++) {
                        let directConnection = currentPosition.add(interpolationVector.scale(frameNum / 100));
                        let v = new Vector3(directConnection.x, ground.getHeightAtCoordinates(directConnection.x, directConnection.z) + 1, directConnection.z);
                        let keyframe = {
                            frame: frameNum,
                            value: v
                        };
                        keys.push(keyframe);
                    }
                    let animation = new Animation("InterpolatePositionAnim", "position", 100, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
                    animation.setKeys(keys);
                    console.log(keys);
                    scene.beginDirectAnimation(this.mesh, [animation], 0, 100, false);
                }
            }
        });
        */
    }

    public get mesh() : Mesh { return this._mesh; }
    public set mesh(v : Mesh) { this._mesh = v; }
    public get controller() : IsometricCharacterController { return this._controller; }
    public set controller(v : IsometricCharacterController) { this._controller = v; }
    public get runRange() : Nullable<AnimationRange> { return this._runRange; }
    public set runRange(v : Nullable<AnimationRange>) { this._runRange = v; }
    public get idleRange() : Nullable<AnimationRange> { return this._idleRange; }
    public set idleRange(v : Nullable<AnimationRange>) { this._idleRange = v; }
    public get walkRange() : Nullable<AnimationRange> { return this._walkRange; }
    public set walkRange(v : Nullable<AnimationRange>) { this._walkRange = v; }
    public get skeleton() : Skeleton { return this._skeleton; }
    public set skeleton(v : Skeleton) { this._skeleton = v; }
    public get isMoving() : boolean { return this._isMoving; }
    public set isMoving(v : boolean) { this._isMoving = v; }

}
