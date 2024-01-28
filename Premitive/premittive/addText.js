import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {addObject,createMaterial} from './addObject'
    const loader = new FontLoader();
    // promisify font loading
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }
   
    export async function doit(scene) {
        const font = await loadFont( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json' );
      const geometry = new TextGeometry('three.js', {
        font: font,
        size: 3.0,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: .3,
        bevelSegments: 5,
      });
      const mesh = new THREE.Mesh(geometry, createMaterial());
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
   
      const parent = new THREE.Object3D();
      parent.add(mesh);
   
      addObject(-1, -1, parent,scene);
    }
    
  