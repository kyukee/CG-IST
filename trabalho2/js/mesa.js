/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var clock;

var sphereCount = 10;

var sphere = [];

function randFloat(low, high) {

	return low + Math.random() * ( high - low );

}

////////////////////////////////////////////////
//////              BALLS                 //////
////////////////////////////////////////////////


function addSphere(obj, x, y, z){
    'use strict'

    geometry = new THREE.SphereGeometry(4, 50, 30, 0, Math.PI * 2, 0, Math.PI * 2);

    for(var i = 0; i < sphereCount; i++){
    sphere[i] = new THREE.Mesh(geometry, material);
    sphere[i].position.set(x, y, z);
    obj.add(sphere[i]);
    }
}

function createSphere(x, y, z){
    'use strict'

    sphere = new THREE.Object3D();

    //sphere.userData = {acceleration: randFloat(0, 20), maxSpeed: randFloat(0, 30)};


    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
    for (var i = 0; i < sphereCount; i++){
    addSphere(sphere, randFloat(-50, 50), 5, randFloat(-50, 50));

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    //sphere.direction = {x: Math.random(), z: Math.random()}

    sphere[i].add(new THREE.AxisHelper(10));

    scene.add(sphere);


    }
}



////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );

    scene.add(new THREE.AxisHelper(10));

    createSphere(0, 0, 0);




}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    
    cameraFront = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraFront.position.set(0,50,50);
    cameraFront.lookAt(new THREE.Vector3(0,50,0));

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraTop.position.set(0,50,0);
    cameraTop.lookAt(scene.position);

    cameraSide = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraSide.position.set(50,50,0);
    cameraSide.lookAt(new THREE.Vector3(0,50,0));

    camera = cameraTop;
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.sphere) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 49: //1
        camera = cameraFront;
        break;
    case 50: //2
        camera = cameraSide;
        break;
    case 51: //3
        camera = cameraTop;
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {

    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    /*controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;*/

    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();
    //createSphere();


    clock = new THREE.Clock(true);

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    //controls.update();

   /* for (var i = 0; i < sphereCount; i++){
        sphere.position.x += sphere.direction.x;
        sphere.position.z += sphere.direction.z;

        if (sphere[i].position.x < -window.innerWidth || sphere[i].position.x > window.innerWidth){
            sphere[i].direction.x = -sphere[i].direction.x;
        }

        if (sphere[i].position.z < -window.innerHeight || sphere[i].position.z > window.innerHeight){
            sphere[i].direction.z = -sphere[i].direction.z;
        }
    }*/

    var timeElapsed = clock.getDelta();

    var attrition = 0.4;

    render();
    
    requestAnimationFrame(animate);
}
