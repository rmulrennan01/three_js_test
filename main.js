



import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'; 
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
let scene, camera, render, cube, controls, container, loader; 

/*
To Run:
From the terminal, navigate to the project directory. Use command [py -m http.server]
to fire up the local server
Then open webpage http://localhost:8000/ from a brower.

*/

function init() {
    container = document.getElementById("3d_image"); 

    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000); 
    
    //camera = new THREE.PerspectiveCamera(75, container.innerWidth/container.innerHeight, 0.1,1000); 
    render = new THREE.WebGLRenderer({antialias:true}); 
    render.setSize(window.innerWidth, window.innerHeight); 
    //render.setSize(container.innerWidth, container.innerHeight); 
    //render.setClearColor(0xffffff, 0);

    //shadows
    render.shadowMap.enabled = true; 
    render.shadowMap.type = THREE.PCFSoftShadowMap; 
    

    document.body.appendChild(render.domElement); 
   // container.appendChild(render.domElement);
    
    //3d object I designed
    loader = new GLTFLoader(); 
    loader.load(
        '/objects/dresser.gltf',
        function (gltf) {
		scene.add( gltf.scene );
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object   
        },
        	// called while loading is progressing
	    function ( xhr ) {
		    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            console.log( 'An error happened' );
    
        }
    );
        


   //Cube
   /*
    const geometry = new THREE.BoxGeometry(2,2,2); 
    const texture = new THREE.TextureLoader()
    const texMap = texture.load("/textures/crate.gif"); 
    //const material = new THREE.MeshStandardMaterial({map:texMap});
    const material = new THREE.MeshBasicMaterial({color:0x0000ff});
    cube = new THREE.Mesh(geometry,material); 
    cube.castShadow = true; //default is false
    cube.receiveShadow = false; //default
    scene.add(cube); 

    */ 

    const pointLight = new THREE.PointLight(0xffffff,80); 


    
    camera.position.z = 5; 
    pointLight.position.set(5,5,5);    
    camera.add(pointLight); 
    scene.add(camera); 

        /*
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;
    scene.add( plane );
 */
    

    controls = new OrbitControls(camera, render.domElement); 
    controls.enableZoom;
    controls.keys = {
        LEFT: 'ArrowLeft', //left arrow
        UP: 'ArrowUp', // up arrow
        RIGHT: 'ArrowRight', // right arrow
        BOTTOM: 'ArrowDown' // down arrow
    } 
}


function animate() {
    requestAnimationFrame(animate); 
    render.render(scene, camera); 
   // cube.rotation.x +=0.01; 
    //cube.rotation.y+=0.01; 
    document.getElementById("dist").innerHTML= "test"
    controls.update(); 
    //cube.rotation.z +=0.01; 
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(camera.aspect); 
    render.setSize(window.innerWidth, window.innerHeight); 

}


window.addEventListener('resize', onWindowResize,false); 

init(); 
animate(); 