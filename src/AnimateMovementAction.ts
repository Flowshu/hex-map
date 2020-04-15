import { Scene, Mesh, PointerInfo, PointerEventTypes, ExecuteCodeAction, ActionManager, Animation } from "babylonjs";
/*
class AnimateMovementAction {
    constructor(parameters) {
        
    }
    private configureBehaviour(scene: Scene, ground: Mesh) {
        scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERUP) {
                if (pointerInfo.pickInfo?.pickedPoint && pointerInfo.pickInfo.pickedMesh == ground) {
                    let keys = new Array<IAnimationKey>();
                    let currentPosition = this.mesh.position;
                    let targetPosition = pointerInfo.pickInfo.pickedPoint;
                    let interpolationVector = currentPosition.add(targetPosition);
                    for (let frameNum = 0; frameNum <= 100; frameNum++) {
                        let keyframe = {
                            frame: frameNum,
                            value: currentPosition.add(interpolationVector.scale(frameNum/100))
                        };
                        keys.push(keyframe);
                    }
                    let animation = new Animation("InterpolatePositionAnim", "position", 100, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
                    animation.setKeys(keys);
                    console.log(keys);
                    scene.beginDirectAnimation(this.mesh, [animation], 0, 100, false);
                    }
                }
            }
        });
    }
    
    private calculateAndPlayAnimation(pointerInfo: PointerInfo, scene: Scene) {
    let keys = new Array<IAnimationKey>();
    let currentPosition = this.mesh.position;
    let targetPosition = pointerInfo.pickInfo.pickedPoint;
    let interpolationVector = currentPosition.add(targetPosition);
    for (let frameNum = 0; frameNum <= 100; frameNum++) {
        let keyframe = {
            frame: frameNum,
            value: currentPosition.add(interpolationVector.scale(frameNum/100))
        };
        keys.push(keyframe);
    }
    let animation = new Animation("InterpolatePositionAnim", "position", 100, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
    animation.setKeys(keys);
    console.log(keys);
    scene.beginDirectAnimation(this.mesh, [animation], 0, 100, false);
    }
}*/