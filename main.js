



import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'; 
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
//import {PointLightHelper} from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/helpers/PointLightHelper.js';

let scene, camera, render, cube, controls, container, loader, plane, plane2; 

/*
To Run:
From the terminal, navigate to the project directory. Use command [py -m http.server]
to fire up the local server
Then open webpage http://localhost:8000/ from a brower.

*/

function init() {
    container = document.getElementById("item_01"); 

    scene = new THREE.Scene(); 
   
    
    //camera = new THREE.PerspectiveCamera(75, container.innerWidth/container.innerHeight, 0.1,1000); 
    render = new THREE.WebGLRenderer({antialias:true}); 
    //render.setSize(window.innerWidth, window.innerHeight); 
    render.setSize(container.offsetWidth, 400); 
    render.setSize(container.offsetWidth, container.offsetWidth*.6); 
    //render.setSize(200, 200); 
    console.log("Container width,height "+ container.offsetWidth + ", " + container.offsetHeight)
    //render.setPixelRatio(window.devicePixelRatio); 
    container.appendChild(render.domElement);


    //Camera
    camera = new THREE.PerspectiveCamera(75, 16/9, 0.1,1000); 
    camera.position.set(-1.17,1.03,-1.43); //set default camera position
    scene.add(camera); 
   
    
    render.setClearColor(0xffffff, 1);

    //shadows
    render.shadowMap.enabled = true; 
    render.shadowMap.type = THREE.PCFSoftShadowMap; 
    //render.setClearColor( 0xffffff, 0 ); //change to 1 for clear

    //lighting

    /*
    const pointLight = new THREE.PointLight(0xffffff,2); 
    pointLight.position.set(-4,4,-4);
   // pointLight.target.position.set(0,0,0); 
    pointLight.castShadow = true; 
    pointLight.shadow.mapSize.width = 5120; // default
    pointLight.shadow.mapSize.height = 5120; // default
    pointLight.shadow.camera.near = 0.5; // default 
    pointLight.shadow.camera.far = 600; // default
    scene.add(pointLight); 
    */

    /*
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 100, 1000, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add( spotLight );
    */

    //Create a DirectionalLight and turn on shadows for the light
    const spotLight = new THREE.DirectionalLight( 0xffffff, 0.5, 100 );
    spotLight.position.set( -5, 2, 0 ); //default; light shining from top
    spotLight.castShadow = true; // default false
    scene.add( spotLight );

    //Set up shadow properties for the spotlight
    spotLight.shadow.mapSize.width = 2000; // default
    spotLight.shadow.mapSize.height = 2000; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 20; // default
    //Spotlight helper
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( spotLight, sphereSize );
    scene.add( pointLightHelper );



    //global light
    const globalLight = new THREE.AmbientLight(0xffffff,0.6); 
    scene.add(globalLight);   
  


    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    


    const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera); 
    scene.add(cameraHelper);



   // document.body.appendChild(render.domElement); 
    

    //Plane
    const geometry = new THREE.BoxGeometry(20,0.1,20); 
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    plane = new THREE.Mesh(geometry,material); 
    plane.castShadow = false; //default is false
    plane.receiveShadow = true; //default
    //plane.material.emissive= {color:0xf3ffff}; 
    scene.add(plane); 


     /*
    const geometry = new THREE.PlaneGeometry(10,10,1,1); 
    const material = new THREE.MeshPhongMaterial({color:0x00ffff});
    plane = new THREE.Mesh(geometry,material); 
    plane.castShadow = false; //default is false
    plane.receiveShadow = true; //default
    plane.name="plane";
    plane.rotation.set(Math.PI/2,0,0); 
    scene.add(plane); 
    */

    //cube test
    /*
    const geometry2 = new THREE.BoxGeometry(1,1,1); 
    cube = new THREE.Mesh(geometry2,material); 
    cube.castShadow = true; //default is false
    cube.receiveShadow = false; //default
    cube.position.set(0,1,0);
   // scene.add(cube); 
   */



    //3d object I designed
    loader = new GLTFLoader(); 
    loader.load(
        '/objects/dresser.gltf',
        function (gltf) {
            const furniture = gltf.scene.children.find((child) => child.name === "Dresser");

            /*
            const texture = new THREE.TextureLoader()
            //const texMap = texture.load("/textures/walnut.jpg"); 
            const texMap = texture.load("/textures/white-oak.jpg"); 
            const material = new THREE.MeshStandardMaterial({map:texMap});
            furniture.material = material; 
            */ 

            const textureLoader = new THREE.TextureLoader(); 
            textureLoader.load(
                // resource URL
                '/textures/white-oak.jpg',
            
                // onLoad callback
                function ( texture ) {
                    // in this example we create the material when the texture is loaded
                    const material = new THREE.MeshStandardMaterial({color:0xffffff});

                   // const material = new THREE.MeshStandardMaterial( {map: texture} );
                    furniture.material = material; 
                },
            
                // onProgress callback currently not supported
                undefined,
            
                // onError callback
                function ( err ) {
                    console.error( 'An error happened. - Did Not load texture' );
                }
            );




            //furniture.material = new THREE.MeshBasicMaterial({color:0x34ebdb});
            furniture.castShadow = true; 
            furniture.receiveShadow = false; 

            addFurniture(furniture);
            console.log(furniture); 

           // gltf.animations; // Array<THREE.AnimationClip>
          //  gltf.scene; // THREE.Group
           // gltf.scenes; // Array<THREE.Group>
           // gltf.cameras; // Array<THREE.Camera>
           // gltf.asset; // Object   
        },
        	// called while loading is progressing
	    function ( xhr ) {
		    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            console.log( 'An error happened' );
    
        }
    );

    console.log(scene); 
    //changeMaterial("Dresser","/textures/walnut.jpg"); 



    //const light = new THREE.AmbientLight( 0x404040,10 ); // soft white light
    //scene.add( light );

    controls = new OrbitControls(camera, render.domElement); 
    controls.enableZoom;
    controls.keys = {
        LEFT: 'ArrowLeft', //left arrow
        UP: 'ArrowUp', // up arrow
        RIGHT: 'ArrowRight', // right arrow
        BOTTOM: 'ArrowDown' // down arrow
    } 
}


function addFurniture(item){
    scene.add(item); 
}

function changeMaterial(item_name, material_path){
    //const obj = scene.children.find((child) => child.name == item_name);
   
    //console.log(obj); 
    const texture = new THREE.TextureLoader()
    //const texMap = texture.load("/textures/walnut.jpg"); 
    const texMap = texture.load(material_path); 
    const material = new THREE.MeshStandardMaterial({map:texMap});
    scene.getObjectByName(item_name).material = material; 

}


function animate() {
    requestAnimationFrame(animate); 
    render.render(scene, camera); 
    //scene.children.find((child) => child.name == "Dresser").rotation.x +=0.01;
    scene.children.find((child) => child.name == "Dresser").rotation.y +=0.001;
    //scene.children.find((child) => child.name == "Dresser").rotation.z +=0.01;
   // cube.rotation.x +=0.01; 
    //cube.rotation.y+=0.01; 
    //document.getElementById("dist").innerHTML= "test"
    controls.update(); 
    //cube.rotation.z +=0.01; 
    console.log(camera.position.x + ", " + camera.position.y + ", " +camera.position.z);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(camera.aspect); 
    render.setSize(window.innerWidth, window.innerHeight); 

}


window.addEventListener('resize', onWindowResize,false); 

init(); 
animate(); 