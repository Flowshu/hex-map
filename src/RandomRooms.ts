import { Scene, MeshBuilder } from "babylonjs";

export function generate(scene:Scene) {
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
    }
}
