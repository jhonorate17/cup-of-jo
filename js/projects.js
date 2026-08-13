// projects.js
// Three.js 3D model hover + modal system for Cup of Jo projects page

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

// ---------------------------------------------------------------
// CONFIG — add a model to any card by adding an entry here.
// The key matches the data-model attribute on the card in HTML.
// ---------------------------------------------------------------
const MODEL_CONFIG = {
  './models/bc9.glb': { autoRotateSpeed: 0.003 },
  './models/bc8.glb': { autoRotateSpeed: 0.003 },
  './models/bc7.glb': { autoRotateSpeed: 0.003 },
  './models/bc6.glb': { autoRotateSpeed: 0.003 },
  './models/bc5.glb': { autoRotateSpeed: 0.003 },
  './models/bc4.glb': { autoRotateSpeed: 0.003 },
  './models/bc3.glb': { autoRotateSpeed: 0.003 },
  './models/bc2.glb': { autoRotateSpeed: 0.003 },
  './models/bc1.glb': { autoRotateSpeed: 0.003 },
  './models/jo.glb': { autoRotateSpeed: 0.003 },
};

// ---------------------------------------------------------------
// HDRI CACHE
// We load the .hdr file once and reuse the processed texture
// across all scenes (card viewers + modal) to avoid re-loading
// ---------------------------------------------------------------
let cachedEnvMap = null;

function getEnvMap(renderer) {
  // If already loaded, return immediately
  if (cachedEnvMap) return Promise.resolve(cachedEnvMap);

  return new Promise((resolve) => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

new EXRLoader().load('/images/studio.exr', (hdr) => {
      cachedEnvMap = pmrem.fromEquirectangular(hdr).texture;
      hdr.dispose();
      pmrem.dispose();
      resolve(cachedEnvMap);
    },
    undefined,
    (err) => {
      // HDRI failed to load — log it but don't break anything.
      // Models will still render, just without metallic reflections.
      console.warn('HDRI failed to load:', err);
      resolve(null);
    });
  });
}

// ---------------------------------------------------------------
// TOUCH DETECTION
// Checks if the device has no hover (i.e. touchscreen)
// This is more reliable than checking userAgent
// ---------------------------------------------------------------
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

// ---------------------------------------------------------------
// SHARED LOADER — one GLTFLoader reused for all models
// ---------------------------------------------------------------
const loader = new GLTFLoader();

// Cache so we don't re-fetch the same .glb twice
const modelCache = {};

function loadModel(path) {
  if (modelCache[path]) return modelCache[path];
  modelCache[path] = new Promise((resolve, reject) => {
    loader.load(path, resolve, undefined, reject);
  });
  return modelCache[path];
}

// ---------------------------------------------------------------
// SCENE HELPERS — reusable setup for any Three.js canvas
// ---------------------------------------------------------------

// buildScene now takes the renderer so it can set up the HDRI env map.
// envMap is applied async — the scene looks fine while it loads.
function buildScene(renderer) {
  const scene = new THREE.Scene();

  // Lighting — ambient + two directionals so colors read well
  scene.add(new THREE.AmbientLight(0xffffff, 1.0));

  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(5, 8, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-5, 2, -5);
  scene.add(fill);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 0.6));

  // ← NEW: load HDRI and assign to scene.environment
  // This gives metallic/glossy materials a proper environment to reflect.
  // scene.background is NOT set here — card viewers use null (transparent)
  // and the modal sets its own background color separately.
  getEnvMap(renderer).then((envMap) => {
    if (envMap) scene.environment = envMap;
  });

  return scene;
}

function buildRenderer(canvas, width, height) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); // cap at 2x for perf
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

// Centers + scales any loaded model to fit a 2-unit bounding box
function fitModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;
  model.scale.setScalar(scale);
  model.position.sub(center.multiplyScalar(scale));
}

// ---------------------------------------------------------------
// CARD HOVER VIEWERS
// Desktop: model fades in on hover, out on leave
// Mobile: card tap goes straight to modal, skips the hover preview
//         since touchscreens have no hover state
// ---------------------------------------------------------------
function initCardViewers() {
  const cards = document.querySelectorAll('.has-model');

  cards.forEach(card => {
    const modelPath = card.dataset.model;
    if (!modelPath) return;

    // --- MOBILE: skip hover setup, tap opens modal directly ---
    if (isTouchDevice()) {
      card.addEventListener('click', () => openModal(card));
      return; // nothing else needed for touch
    }

    // --- DESKTOP: hover to preview, click to open modal ---

    // Create a canvas inside the card's image wrap
    const wrap = card.querySelector('.model-hover-canvas');
    const canvas = document.createElement('canvas');
    canvas.classList.add('card-canvas');
    wrap.appendChild(canvas);

    const w = wrap.offsetWidth || 300;
    const h = wrap.offsetHeight || 180;

    const renderer = buildRenderer(canvas, w, h);
    const scene = buildScene(renderer); // ← pass renderer so HDRI can init
    scene.background = null; // transparent so CSS bg shows through

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.01, 100);
    camera.position.set(0, 0.5, 3);

    let model = null;
    let animId = null;
    let loaded = false;

    // Animation loop — only runs while hovered
    function animate() {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    function startViewer() {
      if (!loaded) {
        loaded = true;
        // Load and cache the model
        loadModel(modelPath).then(gltf => {
          // Clone so the same model can appear in both card + modal
          model = gltf.scene.clone(true);
          fitModel(model);
          scene.add(model);
        });
      }
      animate();
    }

    function stopViewer() {
      cancelAnimationFrame(animId);
      animId = null;
      if (model) model.rotation.y = 0;
      renderer.clear(); // wipe canvas so image shows cleanly underneath
    }

    card.addEventListener('mouseenter', startViewer);
    card.addEventListener('mouseleave', stopViewer);
    card.addEventListener('click', () => openModal(card));
  });
}

// ---------------------------------------------------------------
// MODAL VIEWER
// Full-size viewer that opens when you click a model card
// Has OrbitControls so the user can freely rotate/zoom
// Works with both mouse (desktop) and touch (mobile) natively
// ---------------------------------------------------------------
const modal = document.getElementById('model-modal');
const modalCanvasWrap = document.getElementById('modal-canvas-wrap');
const modalTitle = document.getElementById('modal-title');
const modalLink = document.getElementById('modal-link');
const modalClose = document.querySelector('.modal-close');
const backdrop = document.querySelector('.modal-backdrop');

let modalRenderer = null;
let modalAnimId = null;

function openModal(card) {
  const modelPath = card.dataset.model;
  const title = card.dataset.title || '';
  const href = card.dataset.href || '#';

  // Set title + link
  modalTitle.textContent = title;
  modalLink.href = href;

  // Clear any previous canvas
  modalCanvasWrap.innerHTML = '';
  modalCanvasWrap.classList.remove('loaded');
  cancelAnimationFrame(modalAnimId);
  if (modalRenderer) {
    modalRenderer.dispose();
    modalRenderer = null;
  }

  const w = modalCanvasWrap.offsetWidth;
  const h = modalCanvasWrap.offsetHeight;

  const canvas = document.createElement('canvas');
  modalCanvasWrap.appendChild(canvas);

  modalRenderer = buildRenderer(canvas, w, h);

  // Build modal scene — pass renderer for HDRI
  const scene = buildScene(modalRenderer);
  scene.background = new THREE.Color(0x1a1a1a);

  const camera = new THREE.PerspectiveCamera(50, w / h, 0.01, 100);
  camera.position.set(0, 0.5, 3);

  // OrbitControls — supports both mouse drag and touch drag natively
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false; // no panning, just rotate + zoom
  controls.minDistance = 1;
  controls.maxDistance = 8;

  let autoRotate = true;
  // Once user touches/drags the model, stop auto-rotating
  controls.addEventListener('start', () => { autoRotate = false; });

  loadModel(modelPath).then(gltf => {
    const model = gltf.scene.clone(true);
    fitModel(model);
    scene.add(model);
    modalCanvasWrap.classList.add('loaded');

    function animate() {
      modalAnimId = requestAnimationFrame(animate);
      if (autoRotate) model.rotation.y += 0.004;
      controls.update();
      modalRenderer.render(scene, camera);
    }
    animate();
  });

  // Show the modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent page scroll behind modal
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  cancelAnimationFrame(modalAnimId);
  if (modalRenderer) {
    modalRenderer.dispose();
    modalRenderer = null;
  }
  modalCanvasWrap.innerHTML = '';
}

// ---------------------------------------------------------------
// EVENT WIRING — modal close buttons only
// Card click events are handled inside initCardViewers above
// ---------------------------------------------------------------
function initModalEvents() {
  // Close button
  modalClose.addEventListener('click', closeModal);

  // Click the dark backdrop behind the modal
  backdrop.addEventListener('click', closeModal);

  // Escape key (desktop)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---------------------------------------------------------------
// INIT — runs once the page is ready
// ---------------------------------------------------------------
initCardViewers();
initModalEvents();