import * as THREE from "three"

console.log('hmm')
function main(){
  const canvas=document.querySelector("#can")

  const renderer=new THREE.WebGLRenderer({antialias:true,canvas})

  const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=2
const scene = new THREE.Scene()
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
// const material = new THREE.MeshBasicMaterial({color: 0x44aa88})
const cubes = [
  makeInstance(geometry, 0x44aa88,  0,scene),
  makeInstance(geometry, 0x8844aa, -2,scene),
  makeInstance(geometry, 0xaa8844,  2,scene),
];
// const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
// const cube=new THREE.Mesh(geometry,material)
// scene.add(cube);
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

renderer.render(scene, camera);
function render(time) {
  time *= 0.001;  // convert time to seconds

  cubes.forEach((cube, ndx) => {
    const speed = 1 
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
 
  renderer.render(scene, camera);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  // const canvas = renderer.domElement;
  // camera.aspect = canvas.clientWidth / canvas.clientHeight;
  // camera.updateProjectionMatrix();
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