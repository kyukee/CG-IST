/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer, controls;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var ball;

function addTableLegRound(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(1, 1, 36, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 18, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';

    // width, height, depth
    geometry = new THREE.CubeGeometry(50, 1, 30); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createBall(x, y, z) {
    'use strict';
    
    ball = new THREE.Object3D();
    ball.userData = { vX: 0, vZ: 0, accX: 0, accZ: 0, maxSpeed: 1 };

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    
    ball.add(mesh);
    ball.position.set(x, y, z);
    
    scene.add(ball);
}


function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   
    addTableTop(table, 0, 0, 0);
    addTableLegRound(table, -22, -1, -12);
    addTableLegRound(table, -22, -1, 12);
    addTableLegRound(table, 22, -1, 12);
    addTableLegRound(table, 22, -1, -12);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function addLampPole(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(1, 1, 70, 12);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addLampBase(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(8, 8, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y -1 , z);
    obj.add(mesh);
}

function addLampCover(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(8, 12, 12, 16, 6, true);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addLampFrameSupportBottom(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(2.5, 2.5, 1, 12);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampFrameSupportTop(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.TorusGeometry(7.5, .5, 14, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    mesh.rotation.x = Math.PI / 2;

    obj.add(mesh);
}

function addLampFrameBar(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(.5, 12, .5);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 5.6, z);

    mesh.rotation.x = Math.PI / 8 * Math.sign(z);
    mesh.rotation.z = Math.PI / 8 * -Math.sign(x) ;
    
    obj.add(mesh);
}

function addLampFrame(obj, x, y, z) {
    'use strict';

    addLampFrameSupportBottom(obj, x, y, z);
    addLampFrameSupportTop(obj, x, y + 11, z);
    addLampFrameBar(obj, x-3.4, y, z-3.4);
    addLampFrameBar(obj, x-3.4, y, z+3.4);
    addLampFrameBar(obj, x+3.4, y, z-3.4);
    addLampFrameBar(obj, x+3.4, y, z+3.4);
}

function addLampLightbulb(obj, x, y, z) {
    'use strict';

    geometry = new THREE.SphereGeometry(2, 15, 15);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 1.8, z);
    obj.add(mesh);
}

function createLamp(x, y, z) {
    'use strict';
    
    var lamp = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });

    addLampPole(lamp, 0, 0, 0);
    addLampBase(lamp, 0, -35, 0); // FIXME: wireframe nao funciona por causa disto
    addLampCover(lamp, 0, 35, 0);
    addLampFrame(lamp, 0, 30, 0);
    addLampLightbulb(lamp, 0, 35, 0);

    scene.add(lamp);
    
    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 37, 0);
    createLamp(40,37,5);
    createBall(10,0,10);
}

function createCamera() {
    'use strict';
    //camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,  1,    1000);

    // camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 );

    // camera.position.x = 50;
    // camera.position.y = 50;
    // camera.position.z = 50;
    //camera.lookAt(scene.position);
    

    
    cameraFront = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 );
    cameraFront.position.set(0,50,50);
    // cameraFront.lookAt(new THREE.Vector3(0,50,50));

    cameraSide = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 );
    cameraSide.position.set(50,50,0);
    cameraSide.lookAt(0,50,0);
    cameraSide.rotation.y = 90 * Math.PI / 180;

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 );
    cameraTop.position.set(50,50,50);
    cameraTop.lookAt(scene.position);

    camera = cameraTop;


}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

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
        ball.userData.accX = -0.01;
        break;
    case 38: //up arrow
        ball.userData.accZ = -0.01;
        break;
    case 39: //right arrow
        ball.userData.accX = 0.01;
        break;
    case 40: //down arrow
        ball.userData.accZ = 0.01;
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //left arrow
        ball.userData.accX = 0;
        break;
    case 38: //up arrow
        ball.userData.accZ = 0;
        break;
    case 39: //right arrow
        ball.userData.accX = 0;
        break;
    case 40: //down arrow
        ball.userData.accZ = 0;
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

    // controls = new THREE.OrbitControls( camera, renderer.domElement );  
    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.25;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 100;
    // controls.maxDistance = 500;
    // controls.maxPolarAngle = Math.PI / 2;

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    
    if(Math.abs(ball.userData.vX) < ball.userData.maxSpeed)
        ball.userData.vX += ball.userData.accX;
	
	if(Math.abs(ball.userData.vX) > 0 && ball.userData.accX==0)
        ball.userData.vX =0;

    if(Math.abs(ball.userData.vZ) < ball.userData.maxSpeed)
        ball.userData.vZ += ball.userData.accZ;
	
	if(Math.abs(ball.userData.vZ) > 0 && ball.userData.accZ==0)
        ball.userData.vZ =0;

    ball.position.x += ball.userData.vX;
    ball.position.z += ball.userData.vZ;


    render();
    
    requestAnimationFrame(animate);

    // controls.update();
}

