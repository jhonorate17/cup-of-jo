// logo3d.js — 3D spinning logo for nav
// Requires the importmap in <head> to resolve 'three'
//
// Root page:    data-model="./models/jo.glb"
// Subfolder:    data-model="../models/jo.glb"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('logo-canvas');
if (!canvas) console.error('[logo3d] Cannot find #logo-canvas');

const MODEL_PATH = canvas.dataset.model ?? './models/jo.glb';
const SIZE = window.matchMedia('(max-width: 768px)').matches ? 90 : 180;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(SIZE, SIZE);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = null;

scene.add(new THREE.AmbientLight(0xffffff, 1.5));
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(5, 8, 5);
scene.add(key);
scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 0.8));

const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
camera.position.set(0, 2.5, 4);
camera.lookAt(0, 0, 0);

new GLTFLoader().load(MODEL_PATH, (gltf) => {
  const model = gltf.scene;

  const box    = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size3  = box.getSize(new THREE.Vector3());
  const scale  = 2 / Math.max(size3.x, size3.y, size3.z);
  model.scale.setScalar(scale);
  model.position.sub(center.multiplyScalar(scale));
  scene.add(model);

  const baseX = model.position.x;
  const baseY = model.position.y;

  let hovered   = false;
  let shakeTime = 0;

  const trigger = canvas.closest('a') ?? canvas;
  trigger.addEventListener('mouseenter', () => { hovered = true;  shakeTime = 0; });
  trigger.addEventListener('mouseleave', () => { hovered = false; });

  (function animate() {
    requestAnimationFrame(animate);

    model.rotation.y += 0.008;

    if (hovered) {
      // Very slow, very small — like a gentle breathing wobble
      shakeTime += 0.06;
      const intensity = 0.06;
      model.position.x = baseX + Math.sin(shakeTime * 2.1) * intensity;
      model.position.y = baseY + Math.sin(shakeTime * 1.5) * intensity * 0.5;
    } else {
      // Ease back to resting position
      model.position.x += (baseX - model.position.x) * 0.08;
      model.position.y += (baseY - model.position.y) * 0.08;
    }

    renderer.render(scene, camera);
  })();

}, undefined, (err) => {
  console.warn('[logo3d] Model failed to load:', err);
});