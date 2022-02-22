



let scene, camera, render, cube, controls; 


function init() {
    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000); 
    render = new THREE.WebGLRenderer({antialias:true}); 
    render.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(render.domElement); 
    const geometry = new THREE.BoxGeometry(2,2,2); 
    //const material = new THREE.MeshBasicMaterial({color:0x0000ff});
    const texture = new THREE.TextureLoader()
    const texMap = texture.load("textures/crate.gif"); 
    const material = new THREE.MeshStandardMaterial({map:texMap});
    cube = new THREE.Mesh(geometry,material); 
    scene.add(cube); 
    camera.position.z = 5; 

    const pointLight = new THREE.PointLight(0xffffff,80); 
    pointLight.position.set(5,5,5); 
    scene.add(pointLight); 

   // controls = new THREE.OrbitControls(camera, render.domElement); 
}


function animate() {
    requestAnimationFrame(animate); 
    render.render(scene, camera); 
    cube.rotation.x +=0.01; 
    cube.rotation.y+=0.01; 

   // controls.update(); 
    //cube.rotation.z +=0.01; 
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); 
    render.setSize(window.innerWidth, window.innerHeight); 

}


window.addEventListener('resize', onWindowResize,false); 

init(); 
animate(); 