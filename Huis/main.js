import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import { cameraPosition } from 'three/webgpu';
import { CSG } from 'three-csg-ts';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  // Voeg deze regel toe voor GLTFLoader

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const objLoader = new OBJLoader();
const gltfLoader = new GLTFLoader();  

const renderer = new THREE.WebGLRenderer({
  //shadows
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//dat.gui
const gui = new dat.GUI();

//ambient light
const ambientLight = new THREE.AmbientLight( 0xffffff, 1.5 );
scene.add( ambientLight );

// directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 5, 5, 5 );
directionalLight.castShadow = true;
scene.add( directionalLight );

//point light
const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( 0, 2, 0 );
pointLight.castShadow = true;
scene.add( pointLight );

//point light helper
// const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
// scene.add( pointLightHelper );

//dat gui add position for pointlight
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add( pointLight.position, 'x').min(-10).max(10).step( 0.1 );
pointLightFolder.add( pointLight.position, 'y' ).min(-10).max(10).step( 0.1 );
pointLightFolder.add( pointLight.position, 'z' ).min(-10).max(10).step( 0.1 );
pointLightFolder.add( pointLight, "intensity" ).min(0).max(10).step( 0.01 );

//gsap point light z postion from 0 to -5 (infinite loop)
// gsap.to(pointLight.position, { duration: 1, z: -5, yoyo: true, repeat: -1});

//controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.update();

//axes helper
const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );

//add grid helper
// const gridHelper = new THREE.GridHelper( 50, 50 );
// gridHelper.position.z = -7;
// scene.add( gridHelper );

//texturen
const textureLoader = new THREE.TextureLoader();
const grasTexture = textureLoader.load('gras.jpg');
const zwembadTexture = textureLoader.load('pool.jpg'); 
const muurTexture = textureLoader.load('brick_wall_3.jpeg'); 
const front_windowTexture = textureLoader.load('window_10_1.jpg'); 
const back_windowTexture = textureLoader.load('window_back_1.jpg');
const doorTexture = textureLoader.load('front_door_3.jpg'); 
const vloerTexture = textureLoader.load('laminaat_1.jpg');

//grond
const grasGeometry = new THREE.PlaneGeometry(50, 50, 5 );
const grasMaterial = new THREE.MeshStandardMaterial({ 
    map: grasTexture, 
    side: THREE.DoubleSide 
});
const gras = new THREE.Mesh( grasGeometry, grasMaterial );
gras.rotation.x = -Math.PI / 2;
gras.position.z = -7;
gras.receiveShadow = true;
scene.add(gras);

//zwembad
const zwembadGeometry = new THREE.PlaneGeometry(5, 10, 5 );
const zwembadMaterial = new THREE.MeshStandardMaterial({ 
    map: zwembadTexture, 
    side: THREE.DoubleSide 
});
const zwembad = new THREE.Mesh( zwembadGeometry, zwembadMaterial );
zwembad.rotation.x = -Math.PI / 2;
zwembad.position.y = 0.1;
zwembad.position.x = 15;
zwembad.position.z = -3;
zwembad.receiveShadow = true;
scene.add(zwembad );

gltfLoader.load('pool-ring/pool_ring.gltf', function(gltf) {
    const poolRing = gltf.scene;
    poolRing.position.set(15, 0.5, -3); 
    poolRing.scale.set(0.5, 0.5, 0.5);
    scene.add(poolRing);

    gsap.to(poolRing.position, {
        y: '+=0.2', 
        duration: 1.5,
        yoyo: true,
        repeat: -1, 
        ease: "sine.inOut"
    });

    gsap.to(poolRing.rotation, {
        x: '+=0.05',
        z: '+=0.05',
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
});

const roofGeometry = new THREE.ConeGeometry(10.6, 5, 4); 
const roofMaterial = new THREE.MeshStandardMaterial({
  color: 0x26292B, 
  side: THREE.DoubleSide,
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);

roof.position.x = 0; 
roof.position.y = 9.5; 
roof.position.z = -2.40; 
roof.rotation.y = Math.PI / 4; 

roof.castShadow = true; 
scene.add(roof);


const muur_vooraanMaterial = new THREE.MeshStandardMaterial({ 
    map: muurTexture, 
    side: THREE.DoubleSide 
});

const muur_vooraanGeometry = new THREE.PlaneGeometry(15, 7, 10);
const muur_vooraan = new THREE.Mesh(muur_vooraanGeometry, muur_vooraanMaterial);
muur_vooraan.position.y = 3.5; 
muur_vooraan.position.x = 0;
muur_vooraan.position.z = 5; 
muur_vooraan.receiveShadow = true;

scene.add(muur_vooraan);


function front_window(x, y) {
  const front_windowGeometry = new THREE.BoxGeometry(1.5, 2, 0.1);
  const front_windowMaterial = new THREE.MeshStandardMaterial({ 
    map: front_windowTexture, 
    side: THREE.DoubleSide 
  });

  const front_window = new THREE.Mesh(front_windowGeometry, front_windowMaterial);
  front_window.position.set(x, y, 5); 
  front_window.material.transparent = true;

  scene.add(front_window);
}

front_window(-5.5, 5); 
front_window(-5.5, 2); 

front_window(-2.75, 5); 
front_window(-2.75, 2);

front_window(-0, 5);
// front_window(-0, 2);

front_window(2.75, 5);
front_window(2.75, 2);

front_window(5.5, 5);
front_window(5.5, 2);


const front_doorMaterial = new THREE.MeshStandardMaterial({ 
    map: doorTexture, 
    side: THREE.DoubleSide 
});

const front_doorGeometry = new THREE.BoxGeometry(1.5, 2.9, 0.1);
const front_door = new THREE.Mesh(front_doorGeometry, front_doorMaterial);
front_door.position.set(0, 1.6, 5); 
// muur_vooraan.receiveShadow = true;

scene.add(front_door);

const muur_achteraanMaterial = new THREE.MeshStandardMaterial({ 
    map: muurTexture, 
    side: THREE.DoubleSide 
});

const muur_achteraanGeometry = new THREE.PlaneGeometry(15, 7, 10);
const muur_achteraan = new THREE.Mesh(muur_achteraanGeometry, muur_achteraanMaterial);
muur_achteraan.position.y = 3.5; 
muur_achteraan.position.x = 0;
muur_achteraan.position.z = -10; 
muur_achteraan.receiveShadow = true;

scene.add(muur_achteraan);

function back_window(x, y) {
  const back_windowGeometry = new THREE.BoxGeometry(12, 6, 0.1);
  const back_windowMaterial = new THREE.MeshStandardMaterial({ 
    map: back_windowTexture, 
    side: THREE.DoubleSide 
  });

  const back_window = new THREE.Mesh(back_windowGeometry, back_windowMaterial);
  back_window.position.set(x, y, -10); 
  back_window.material.transparent = true;

  scene.add(back_window);
}

back_window(0, 3); 

const muur_rechtsMaterial = new THREE.MeshStandardMaterial({ 
    map: muurTexture, 
    side: THREE.DoubleSide 
});

const muur_rechtsGeometry = new THREE.PlaneGeometry(15, 7, 10);
const muur_rechts = new THREE.Mesh(muur_rechtsGeometry, muur_rechtsMaterial);
muur_rechts.position.y = 3.5; 
muur_rechts.position.x = 7.5; 
muur_rechts.position.z = -2.5; 
muur_rechts.rotation.y = Math.PI / 2; 
muur_rechts.receiveShadow = true;

scene.add(muur_rechts);

const muur_linksMaterial = new THREE.MeshStandardMaterial({ 
    map: muurTexture, 
    side: THREE.DoubleSide 
});

const muur_linksGeometry = new THREE.PlaneGeometry(15, 7, 10);
const muur_links = new THREE.Mesh(muur_linksGeometry, muur_linksMaterial);
muur_links.position.y = 3.5; 
muur_links.position.x = -7.5; 
muur_links.position.z = -2.5; 
muur_links.rotation.y = Math.PI / 2; 
muur_links.receiveShadow = true;

scene.add(muur_links);

//vloer
const vloerGeometry = new THREE.PlaneGeometry(15, 15, 5 );
const vloerMaterial = new THREE.MeshStandardMaterial({ 
    map: vloerTexture, 
    side: THREE.DoubleSide 
});
const vloer = new THREE.Mesh( vloerGeometry, vloerMaterial );
vloer.rotation.x = -Math.PI / 2;
vloer.position.y = 0.1;
vloer.position.z = -2.5;
vloer.receiveShadow = true;
scene.add(vloer);

gltfLoader.load(
  'minimalist_l-shaped_sofa/scene.gltf', 
  function (gltf) {
    const zetel = gltf.scene; 
    zetel.position.set(7.5, -1, -16); 
    zetel.scale.set(3, 3, 3);
    zetel.rotation.y = -Math.PI / 1;
    scene.add(zetel);
  }
);

gltfLoader.load(
  'banana_plant_with_pot/plant_1.gltf', 
  function (gltf) {
    const plant = gltf.scene; 
    plant.position.set(-6, 0, -8);
    plant.scale.set(1.5, 1.5, 1.5); 
    scene.add(plant); 
  }
);

// Canvas met naam
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 256;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = '#738996';
context.font = '60px Arial'; 
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText('Hannelore', canvas.width / 2, canvas.height / 2);

const textTexture = new THREE.CanvasTexture(canvas);
textTexture.flipX = false;

const nameMaterial = new THREE.MeshBasicMaterial({ map: textTexture, side: THREE.DoubleSide });
const nameGeometry = new THREE.PlaneGeometry(5, 2);
const name = new THREE.Mesh(nameGeometry, nameMaterial);

name.position.set(7, 4, -1.5);
name.rotation.y = -Math.PI / 2; 

scene.add(name);

scene.add(name);



//achtergrond
// const achtergrondTexture = textureLoader.load('beach.jpg'); 

// const achtergrondMaterial = new THREE.MeshStandardMaterial({ 
//     map: achtergrondTexture, 
//     side: THREE.DoubleSide 
// });

// const achtergrondGeometry = new THREE.PlaneGeometry(150, 50, 10);
// const achtergrond = new THREE.Mesh(achtergrondGeometry, achtergrondMaterial);
// achtergrond.position.y = 25; 
// achtergrond.position.x = 0;
// achtergrond.position.z = -22; 
// achtergrond.receiveShadow = true;

// const achtergrondGeometry = new THREE.PlaneGeometry(50, 30, 10);
// const achtergrond = new THREE.Mesh(achtergrondGeometry, achtergrondMaterial);
// achtergrond.position.y = 15; 
// achtergrond.position.x = 0;
// achtergrond.position.z = -22; 
// achtergrond.receiveShadow = true;

// scene.add(achtergrond);

gltfLoader.load(
  'pocket_shrek_donkey/scene.gltf', 
  function (gltf) {
    const donkey = gltf.scene; 
    donkey.position.set(-14, 0, -8);
    donkey.scale.set(0.3, 0.3, 0.3); 
    scene.add(donkey); 
  }
);




// camera.position.z = 20;
// camera.position.x= 0;
// camera.position.y= 0;
camera.position.set(-1, 5, 20);
camera.lookAt(0, 0, 0); 

function animate() {
	renderer.render( scene, camera );

}

// let angle = 0; // Beginhoek voor camera rotatie

// function animate() {
//     angle += 0.002; // Verhoog de rotatiehoek voor een langzame rotatie
//     camera.position.x = 20 * Math.cos(angle);  // Camera beweegt rond de X-as
//     camera.position.z = 20 * Math.sin(angle);  // Camera beweegt rond de Z-as
//     camera.position.y = 5; // Camera be
//     camera.lookAt(0, 0, 0);  // Zorg ervoor dat de camera altijd naar het huis kijkt

//     renderer.render(scene, camera);  // Render de scène opnieuw
// }



