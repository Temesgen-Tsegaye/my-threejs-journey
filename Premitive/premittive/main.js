import * as THREE from "three"
import {addSolidGeometry,objects} from "./addObject"
import {doit} from "./addText"
console.log('hmm')
async function main(){
  const canvas=document.querySelector("#can")

  const renderer=new THREE.WebGLRenderer({antialias:true,canvas})

  const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=100
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xAAAAAA);
doit(scene)

// scene.add(cube);
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
{
  const width = 10;
  const height = 8;
  const depth = 8;
  addSolidGeometry(-2, -2, new THREE.BoxGeometry(width, height, depth),scene);
}

renderer.render(scene, camera);
function render(time) {
  time *= 0.001;  // convert time to seconds

 
  renderer.render(scene, camera);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  objects.forEach( ( obj, ndx ) => {

    const speed = .5 + ndx * .05;
    const rot = time * speed;
    obj.rotation.x = rot;
    obj.rotation.y = rot;

  } );
 
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
}
main()


function makeInstance(geometry, color, x,scene) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}