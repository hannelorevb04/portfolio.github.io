// Import necessary libraries and modules
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as dat from "dat.gui";

const steps = [
  { name: "Inside", editableParts: "inside" },
  { name: "Laces", editableParts: "laces" },
  { name: "Outside Part 1", editableParts: "outside_1" },
  { name: "Outside Part 2", editableParts: "outside_2" },
  { name: "Outside Part 3", editableParts: "outside_3" },
  { name: "Sole Bottom", editableParts: "sole_bottom" },
  { name: "Sole Top", editableParts: "sole_top" },
];

let currentStep = 0;

// const selections = {};
const stepName = document.getElementById("current-step");
const prevStepBtn = document.getElementById("prev-step");
const nextStepBtn = document.getElementById("next-step");
const submitButton = document.getElementById("submit-product");

// Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.set(0, 5, 3);
controls.update();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 2, 0);
pointLight.castShadow = true;
scene.add(pointLight);
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Slightly increase ambient light
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Reduce directional light intensity
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.width = 1024;
// directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 50;
// scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5, 100); // Lower intensity for point light
// pointLight.position.set(0, 2, 0);
// pointLight.castShadow = true;
// scene.add(pointLight);

// GUI Controls
const gui = new dat.GUI();
const lightFolder = gui.addFolder("Light Settings");
lightFolder
  .add(directionalLight, "intensity", 0, 2, 0.1)
  .name("Directional Intensity");
lightFolder.add(pointLight, "intensity", 0, 2, 0.1).name("Point Intensity");
lightFolder.add(ambientLight, "intensity", 0, 2, 0.1).name("Ambient Intensity");
lightFolder.open();

// Texture Loaders
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./teufelsberg_inner_4k.hdr", (hdrTexture) => {
  hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = hdrTexture;
  scene.environment = hdrTexture;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const hdrMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

  hdrTexture.dispose();
  pmremGenerator.dispose();

  scene.environment = hdrMap;
  scene.environmentIntensity = 0.25; // Adjust environment intensity
});

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "Standard-Cube-Map/nx.png",
  "Standard-Cube-Map/ny.png",
  "Standard-Cube-Map/nz.png",
  "Standard-Cube-Map/px.png",
  "Standard-Cube-Map/py.png",
  "Standard-Cube-Map/pz.png",
]);
scene.environment = environmentMapTexture;

// Draco and GLTF Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
let shoeModel;
let currentPart = null;

// Load GLTF Model
// const gltfLoader = new GLTFLoader();
// let shoeModel = null;
// let currentPart = null;

gltfLoader.load("./Shoe_compressed.glb", (gltf) => {
  shoeModel = gltf.scene;
  shoeModel.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      if (steps.some((step) => step.editableParts === child.name)) {
        child.userData.editable = true;
      }
    }
  });
  scene.add(shoeModel);
  updateStep();
  shoeModel.scale.set(20, 20, 20);
  shoeModel.position.y = 1.5;
  shoeModel.rotation.x = Math.PI / 5;
  scene.add(shoeModel);
});

function spinModel() {
  if (shoeModel) {
    gsap.to(shoeModel.rotation, {
      y: shoeModel.rotation.y + Math.PI * 2, // Rotate 360 degrees
      duration: 1, // Animation duration in seconds
      ease: "power1.inOut", // Smooth easing
    });
  }
}

function updateStep() {
  const step = steps[currentStep];
  const stepNameElement = document.getElementById("current-step");
  const nextStepBtn = document.getElementById("next-step");
  const submitButton = document.getElementById("submit-product");

  stepNameElement.textContent = `Onderdeel: ${step.name}`;
  currentPart = shoeModel?.getObjectByName(step.editableParts);

  if (!currentPart) {
    console.error(`Onderdeel '${step.editableParts}' niet gevonden.`);
  }

  // Show or hide the "Next" and "Submit" buttons based on the step
  if (currentStep === steps.length - 1) {
    nextStepBtn.style.display = "none";
    submitButton.style.display = "block";
  } else {
    nextStepBtn.style.display = "inline-block";
    submitButton.style.display = "none";
  }

  // Trigger spin animation
  spinModel();
}

// function applyColorToActivePart(color) {
//   if (currentPart && currentPart.userData.editable) {
//     currentPart.material.color.set(color);
//     selections[currentPart.name] = selections[currentPart.name] || {};
//     selections[currentPart.name].color = color;
//     console.log(`Kleur toegepast op ${currentPart.name}: ${color}`);
//   } else {
//     console.error("Geen actief onderdeel geselecteerd of niet bewerkbaar.");
//   }
// }

// function applyMaterialToActivePart(material) {
//   if (currentPart && currentPart.userData.editable) {
//     selections[currentPart.name] = selections[currentPart.name] || {};
//     selections[currentPart.name].material = material;
//     console.log(`Materiaal toegepast op ${currentPart.name}: ${material}`);
//   } else {
//     console.error("Geen actief onderdeel geselecteerd of niet bewerkbaar.");
//   }
// }

function applyColorToActivePart(color) {
  if (currentPart && currentPart.userData.editable) {
    currentPart.material.color.set(color);
    selections[currentPart.name] = selections[currentPart.name] || {};
    selections[currentPart.name].color = color;

    console.log(`Kleur toegepast op ${currentPart.name}: ${color}`);
    console.log("Huidige configuratie:", selections);

    // Trigger spin animation
    spinModel();
  } else {
    console.error("Geen actief onderdeel geselecteerd of niet bewerkbaar.");
  }
}

function applyMaterialToActivePart(material) {
  if (currentPart && currentPart.userData.editable) {
    selections[currentPart.name] = selections[currentPart.name] || {};
    selections[currentPart.name].material = material;

    console.log(`Materiaal toegepast op ${currentPart.name}: ${material}`);
    console.log("Huidige configuratie:", selections); // Log configuratie
  }
}

const selections = {}; // Mock object for storing configurations

// Event listener for "Bestellen" button
// const submitButton = document.getElementById("submit-product");

submitButton.addEventListener("click", async () => {
  const productData = {
    model: "Swear Sneaker",
    startPrice: 139.99,
    size: 42,
    colors: {
      sole: selections.sole?.color || "#FFFFFF",
      laces: selections.laces?.color || "#000000",
      outside_1: selections.outside_1?.color || "#C0C0C0",
      outside_2: selections.outside_2?.color || "#F5DEB3",
    },
    materials: {
      sole: "Rubber",
      laces: "Textiel",
      outside_1: "Leer",
      outside_2: "Leer",
    },
  };

  try {
    const response = await fetch(
      "https://sneaker-configurator-api-ak6n.onrender.com/api/v1/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Fout bij het opslaan van het product.");
    }

    const result = await response.json();
    console.log("Product opgeslagen:", result); // Log het resultaat
    const createdProductId = result._id; // Controleer of _id bestaat

    // Navigeer naar de formulierpagina met het product-ID in de URL
    window.location.href = `/form.html?productId=${createdProductId}`;
  } catch (error) {
    console.error("Fout bij het opslaan van het product:", error);
    alert("Er is een fout opgetreden bij het plaatsen van uw bestelling.");
  }
});

document.getElementById("prev-step").addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateStep();
  }
});

document.getElementById("next-step").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStep();
  }
});

document.querySelectorAll(".color").forEach((button) => {
  button.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    applyColorToActivePart(color);
  });
});

document.querySelectorAll(".material-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const material = e.target.dataset.material;
    applyMaterialToActivePart(material);
  });
});

const apiUrl =
  "https://sneaker-configurator-api-ak6n.onrender.com/api/v1/products";

// const submitButton = document.getElementById("submit-product");

submitButton.addEventListener("click", () => {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selections }), // Voeg hier de configuratorkeuzes toe
  })
    .then((response) => response.json())
    .then((data) => alert("Bestelling opgeslagen!"))
    .catch((error) => console.error("Fout:", error));
});

// Raycaster and interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const editableObjects = [
  "inside",
  "laces",
  "outside_1",
  "outside_2",
  "outside_3",
  "sole_bottom",
  "sole_top",
];
let currentIntersect = null;

// Handle Mouse Clicks
window.addEventListener("click", (event) => {
  const { left, top, width, height } =
    renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - left) / width) * 2 - 1;
  mouse.y = -((event.clientY - top) / height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const firstIntersect = intersects[0];
    if (editableObjects.includes(firstIntersect.object.name)) {
      currentIntersect = firstIntersect;
    }
  }
});

// Change Color on Button Click
document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", (event) => {
    const colorValue = event.target.getAttribute("data-color");
    if (
      currentIntersect &&
      editableObjects.includes(currentIntersect.object.name)
    ) {
      const material = currentIntersect.object.material;
      if (material && material.color) {
        material.color.set(colorValue);
      }
    }
  });
});

// Camera Controls
// const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 8;
camera.position.y = 1;

// Animation Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
