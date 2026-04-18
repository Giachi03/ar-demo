import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/webxr/ARButton.js';

let camera, scene, renderer;
let controller;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // ❗ Nessun hit-test richiesto
  document.body.appendChild(ARButton.createButton(renderer));

  // Controller per il tap
  controller = renderer.xr.getController(0);
  controller.addEventListener('select', onSelect);
  scene.add(controller);
}

function onSelect() {
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);

  // Posiziona il cubo davanti alla camera
  cube.position.set(0, 0, -0.5).applyMatrix4(controller.matrixWorld);

  scene.add(cube);
}

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
