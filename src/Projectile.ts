import { Scene, PointerEventTypes, Vector3, MeshBuilder, Animation, IAnimationKey } from "babylonjs";

export class Projectile {

    private _scene : Scene;

    constructor(scene : Scene, origin : Vector3) {
        this._scene = scene;
        let ground;
        this._scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP) {
                if (pointerInfo.pickInfo?.pickedMesh == ground) {
                    let projectile = MeshBuilder.CreateSphere("projectile", { diameter : 0.2}, this._scene);
                    let dest = new Vector3(pointerInfo.pickInfo?.pickedPoint?.x, 1, pointerInfo.pickInfo?.pickedPoint?.z);
                    let keys = new Array<IAnimationKey>();
                    keys.push({
                        frame : 0,
                        value : new Vector3(0,1,0)
                    });
                    keys.push({
                        frame : 100,
                        value : dest
                    });
                    let animation = new Animation("projectileAnimation", "position", 100, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
                    animation.setKeys(keys);
                    scene.beginDirectAnimation(projectile, [animation], 0, 100, false);
                }
            }
        });
    }
}