import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loadingManager = new THREE.LoadingManager();

const gltfLoader = new GLTFLoader(loadingManager);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.y = 1.5;
camera.position.z = 5;

//add dark mist
const darkFogColor = new THREE.Color(0x111111);
const darkFogNear = 0.1;
scene.fog = new THREE.FogExp2(darkFogColor, darkFogNear);

//add light
const light = new THREE.PointLight(0xffffff, 1, 1);
light.position.set(0, 1, 0);
scene.add(light);

const planeTexture = new TextureLoader().load('textures/cobble.jpg');

planeTexture.wrapS = THREE.RepeatWrapping;
planeTexture.wrapT = THREE.RepeatWrapping;
planeTexture.repeat.set(5, 100);

const planeGeometry = new THREE.PlaneGeometry(20, 300);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, map: planeTexture });

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = Math.PI / 2;
plane.rotation.y = Math.PI / 1;
scene.add(plane);

//add floor for house
const floorTexture = new TextureLoader().load('textures/concrete.jpg');

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);

const floorGeometry = new THREE.PlaneGeometry(5, 5);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, map: floorTexture });

const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x = Math.PI / 2;
floor.rotation.y = Math.PI / 1;
floor.position.y = 0.01;
floor.position.x = -5;

scene.add(floor);

//add house
const houseTexture = new TextureLoader().load('textures/brick.jpg');

houseTexture.wrapS = THREE.RepeatWrapping;
houseTexture.wrapT = THREE.RepeatWrapping;  
houseTexture.repeat.set(1, 1);

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, map: houseTexture });

const xWallGeometry = new THREE.BoxGeometry(5, 2, 0.1);
const yWallGeometry = new THREE.BoxGeometry(0.1, 2, 5);
const segmentedWallGeometry1 = new THREE.BoxGeometry(0.1, 2, 2.5);
const segmentedWallGeometry2 = new THREE.BoxGeometry(0.1, 2, 2.5);
segmentedWallGeometry1.translate(0, 0, 1);
segmentedWallGeometry2.translate(0, 0, -1);

const xWall1 = new THREE.Mesh(xWallGeometry, wallMaterial);
const xWall2 = new THREE.Mesh(xWallGeometry, wallMaterial);
const yWall1 = new THREE.Mesh(yWallGeometry, wallMaterial);
const segmentedWall1 = new THREE.Mesh(segmentedWallGeometry1, wallMaterial);
const segmentedWall2 = new THREE.Mesh(segmentedWallGeometry2, wallMaterial);

//position walls
xWall1.position.z = 2.5;
xWall2.position.z = -2.5;
yWall1.position.x = -2.5;

segmentedWall1.position.x = 2.5;
segmentedWall1.position.z = -2.25;

segmentedWall2.position.x = 2.5;
segmentedWall2.position.z = 2.25;

const roofTexture = new TextureLoader().load('textures/roof.jpg');
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(10, 1);
const roof = new THREE.ConeGeometry(3.5, 2, 4);
const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, map: roofTexture });
const roofMesh = new THREE.Mesh(roof, roofMaterial);

roofMesh.rotation.y = Math.PI / 4;
roofMesh.position.y = 2;

//make tv
const video = document.getElementById('video');
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

const tvGeo = new THREE.PlaneGeometry(2, 1.5); // Adjust the size as needed
const tvMat = new THREE.MeshBasicMaterial({ map: videoTexture });
const tv = new THREE.Mesh(tvGeo, tvMat);

//move up the video texture on the tv
tv.position.y = 0;
tv.position.x = -2;

tv.rotation.y = Math.PI / 2;

//new house group
const house = new THREE.Group();

//add x walls to house
house.add(xWall1);
house.add(xWall2);
//add y walls to house
house.add(yWall1);
house.add(segmentedWall1);
house.add(segmentedWall2);
//add roof to house
house.add(roofMesh);
//add tv to house
house.add(tv);

house.position.x = -5;
house.position.y = 1;

//add house to scene
scene.add(house);


//add stairs
const stairsTexture = new TextureLoader().load('textures/concrete.jpg');

stairsTexture.wrapS = THREE.RepeatWrapping;
stairsTexture.wrapT = THREE.RepeatWrapping;
stairsTexture.repeat.set(1, 0.1);

const stairsGeometry = new THREE.BoxGeometry(10, 1, 1);
const stairsMaterial = new THREE.MeshBasicMaterial({ color: 0x777777, map: stairsTexture });

const stair1 = new THREE.Mesh(stairsGeometry, stairsMaterial);
const stair2 = new THREE.Mesh(stairsGeometry, stairsMaterial);
const stair3 = new THREE.Mesh(stairsGeometry, stairsMaterial);
const stair4 = new THREE.Mesh(stairsGeometry, stairsMaterial);

stair1.position.y = 0.5;
stair2.position.y = 1.5;
stair3.position.y = 2.5;
stair4.position.y = 3.5;

stair1.position.z = -0;
stair2.position.z = -1;
stair3.position.z = -2;
stair4.position.z = -3;

const stairs = new THREE.Group();

stairs.add(stair1);
stairs.add(stair2);
stairs.add(stair3);
stairs.add(stair4);

stairs.position.y = 0;
stairs.position.x = 0;
stairs.position.z = -10;

scene.add(stairs);

//big platform
const platformTexture = new TextureLoader().load('textures/concrete.jpg');

platformTexture.wrapS = THREE.RepeatWrapping;
platformTexture.wrapT = THREE.RepeatWrapping;
platformTexture.repeat.set(1, 1);

const platformGeometry = new THREE.BoxGeometry(10, 5, 10);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, map: platformTexture });

const platform = new THREE.Mesh(platformGeometry, platformMaterial);

platform.position.y = 2.5;
platform.position.x = 0;
platform.position.z = -18.5;

scene.add(platform);

//add portal gltf model
gltfLoader.load('public/models/portal.gltf', (gltf) => {
    let portal = gltf.scene;
    portal.position.y = 4;
    portal.position.x = 0;
    portal.position.z = -18.5;
    portal.scale.set(0.5, 0.5, 0.5);
    scene.add(portal);

}, undefined, function (error) {
    console.error(error);
}
);

//add light to portal
const portalLight = new THREE.PointLight(0xffffff, 10000, 100);
portalLight.position.set(0, 6, -18.5);
scene.add(portalLight);

//open and close the doors continously using a sin
gsap.to(segmentedWall1.rotation, {y: -Math.PI / 2, duration: 3, delay: 2, ease: "power2.inOut", repeat: -1, yoyo: true});
gsap.to(segmentedWall2.rotation, {y: Math.PI / 2, duration: 3, delay: 2, ease: "power2.inOut", repeat: -1, yoyo: true});

//let portallight flicker on and off
gsap.to(portalLight, {intensity: 0, duration: 0.5, delay: 2, ease: "power2.inOut", repeat: -1, yoyo: true});


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();