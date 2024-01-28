import * as THREE from "three"
export const objects = [];
const spread = 15;
 
export function addObject(x, y, obj,scene) {
  obj.position.x = x * spread;
  obj.position.y = y * spread;
 
  scene.add(obj);
  objects.push(obj);
}

export function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });
   
    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);
   
    return material;
  }
  export function addSolidGeometry(x, y, geometry,scene) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh,scene);
  }

  