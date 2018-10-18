/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var clock;


////////////////////////////////////////////////
//////               ARENA                //////
////////////////////////////////////////////////

function addArenaBase(obj, x, y, z) {
    'use strict'
    // width, height, depth
    geometry = new THREE.CubeGeometry(200, 1, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addArenaShortWall(obj, x, y, z) {
    'use strict'
    // width, height, depth
    geometry = new THREE.CubeGeometry(1, 22.4, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addArenaLongWall(obj, x, y, z) {
    'use strict'
    // width, height, depth
    geometry = new THREE.CubeGeometry(200, 22.4, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createArena(x, y, z) {
    'use strict'

    var arena = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0x4d586a, wireframe: true});
    
    addArenaBase(arena, 0, 0, 0);
    addArenaShortWall(arena, 100.5, 11.7, 0);
    addArenaShortWall(arena, -100.5, 11.7, 0);
    addArenaLongWall(arena, 0, 11.7, 50.5);
    addArenaLongWall(arena, 0, 11.7, -50.5);

    scene.add(arena);

    arena.position.x = x;
    arena.position.y = y;
    arena.position.z = z;
}

function createBall(x, y, z) {
    'use strict'

    var ball = new THREE.Object3D();

    geometry = new THREE.SphereGeometry(11.2, 16, 16);
    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    ball.add(mesh);
    scene.add(ball);

    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    
    scene.add(new THREE.AxisHelper(10));
    
    createArena(0, .5, 0);

    var radius = 11.2;
    for (var i = 0; i < 10; i++) {

        var x = Math.random() * (99-radius - (-99+radius)) + (-99+radius);
        var z = Math.random() * (49-radius - (-49+radius)) + (-49+radius);

        createBall(x, 12.2, z);
    }

}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    
    var camFactor = 14;

    cameraFront = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraFront.position.set(0,50,50);
    cameraFront.lookAt(new THREE.Vector3(0,50,0));

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraTop.position.set(0,50,0);
    cameraTop.lookAt(scene.position);

    cameraSide = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraSide.position.set(50,50,0);
    cameraSide.lookAt(new THREE.Vector3(0,50,0));

    camera = cameraTop;
}

function onResize() {
    'use strict';

    var camFactor = 14;

    // notify the renderer of the size change
    renderer.setSize(window.innerWidth, window.innerHeight);

    // update the camera
    cameraFront.left = -window.innerWidth / camFactor;
    cameraFront.right = window.innerWidth / camFactor;
    cameraFront.top = window.innerHeight / camFactor;
    cameraFront.bottom = -window.innerHeight / camFactor;
    cameraFront.updateProjectionMatrix();

    // update the camera
    cameraTop.left = -window.innerWidth / camFactor;
    cameraTop.right = window.innerWidth / camFactor;
    cameraTop.top = window.innerHeight / camFactor;
    cameraTop.bottom = -window.innerHeight / camFactor;
    cameraTop.updateProjectionMatrix();

    // update the camera
    cameraSide.left = -window.innerWidth / camFactor;
    cameraSide.right = window.innerWidth / camFactor;
    cameraSide.top = window.innerHeight / camFactor;
    cameraSide.bottom = -window.innerHeight / camFactor;
    cameraSide.updateProjectionMatrix();

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 65: //A
    case 97: //a

        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
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
    case 37: //left arrow
        chair.userData.rotateLeft = true;
        break;
    case 38: //up arrow
        chair.userData.accFront = chair.userData.accelaration;
        break;
    case 39: //right arrow
        chair.userData.rotateRight = true;
        break;
    case 40: //down arrow
        chair.userData.accBack = chair.userData.accelaration;
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //left arrow
        chair.userData.rotateLeft = false;
        break;
    case 38: //up arrow
        chair.userData.accFront = 0;
        break;
    case 39: //right arrow
        chair.userData.rotateRight = false;
        break;
    case 40: //down arrow
        chair.userData.accBack = 0;
        break;
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
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();


    clock = new THREE.Clock(true);

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';	
	
    render();
    
    requestAnimationFrame(animate);
}
