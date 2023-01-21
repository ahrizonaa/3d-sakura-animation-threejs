import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { SkeletonUtils }
const model_glb = new URL('./assets/Sakura.glb', import.meta.url);

let sakuramodel = undefined;

const renderer = new three.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const boxgeo = new three.BoxGeometry();
// const boxmat = new three.MeshStandardMaterial({
// 	color: 0x00ff00,
// });
// const box = new three.Mesh(boxgeo, boxmat);
// scene.add(box);
// box.receiveShadow = true;
// box.castShadow = true;

const dlight = new three.DirectionalLight(0xeeeffee, 0.8);
dlight.position.set(-3, 10, 0);
dlight.castShadow = true;
dlight.shadow.camera.bottom = -12;
// const dlighthelper = new three.DirectionalLightHelper(dlight, 10);
// scene.add(dlighthelper);
scene.add(dlight);

// const spotlight = new three.SpotLight(0xffffff);
// spotlight.position.set(-100, 100, 0);
// spotlight.castShadow = true;
// spotlight.angle = 0.2;
// scene.add(spotlight);

// const axes = new three.AxesHelper(20);
// scene.add(axes);

const orbitcontrols = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 0);
orbitcontrols.update();

const loader = new GLTFLoader();
loader.load(
	model_glb.href,
	(gltf) => {
		sakuramodel = gltf.scene;
	},
	undefined,
	(error) => {
		console.log(error);
	}
);

// camera.rotation.x = (-60 * Math.PI) / 180;

renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

let sakura_clones = [];
let seconds_interval = -1;

function animate(time) {
	// box.rotation.x += 0.009;
	// box.rotation.y += 0.005;
	// console.log(time);

	if (sakuramodel != undefined) {
		if (Math.floor(time / 1000) > seconds_interval) {
			seconds_interval = Math.floor(time / 1000);
			const clone = sakuramodel.clone();
			sakura_clones.push(clone);
			scene.add(clone);
			let polarity = Math.random() < 0.5 ? -1 : 1;
			let x = Math.random() * 10 * polarity;
			let z = Math.random() * 10 * polarity;
			clone.position.set(x, 0, z);
		}
	}

	for (let i = 0; i < sakura_clones.length; i++) {
		if (sakura_clones[i].position.y > -200) {
			sakura_clones[i].rotation.x += 0.005;
			sakura_clones[i].rotation.y += 0.005;
			sakura_clones[i].position.y -= 0.02;
		} else {
			sakura_clones[i].removeFromParent();
			// if (sakura_clones[i].rotation.x > 0) {
			// 	sakura_clones[i].rotation.x -= 0.05;
			// }
			// if (sakura_clones[i].rotation.y > 0) {
			// 	sakura_clones[i].rotation.y -= 0.05;
			// }
			// sakura_clones[i].rotation.x = 0;
			// sakura_clones[i].rotation.y = 0;
			// sakura_clones[i].position.y = 0;
			// sakura_clones[i].children.forEach((child) => {
			// 	child.children.forEach((mesh) => {
			// 		if (mesh.type == 'Mesh') {
			// 			if (mesh.material.opacity > 0) {
			// 				mesh.material.opacity -= 0.001;
			// 			}
			// 		}
			// 	});
			// });
			sakura_clones[i];
		}
	}

	renderer.render(scene, camera);
}
