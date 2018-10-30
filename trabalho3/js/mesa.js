/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront, cameraPerspective, ballCamera;

var geometry, material, mesh;


////////////////////////////////////////////////
//////              PLANE                 //////
////////////////////////////////////////////////

function drawTriangleFace(vertices) { 
    geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeFaceNormals();
}

function drawSquareFace(vertices) { 
    geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(1, 3, 2));
    geometry.computeFaceNormals();
}

function createPlane(x, y, z) {
    'use strict'

    var vertices;
    var plane = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0x4d586a, wireframe: false});

    //*********
    vertices = [
        new THREE.Vector3(10.0, -5.0, -10.0),
        new THREE.Vector3(-10.0, 5.0, -10.0),
        new THREE.Vector3(0.0, 0.0, 20.0)
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );

    //*********
    vertices = [
        new THREE.Vector3(-20.0, 0.0, 0.0),
        new THREE.Vector3(0.0, 0.0, 20.0),
        new THREE.Vector3(-10.0, 5.0, -10.0)
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );

    //*********
    vertices = [
        new THREE.Vector3(20.0, 0.0, 20.0),
        new THREE.Vector3(20.0, 0.0, -20.0),
        new THREE.Vector3(-20.0, 0.0, 20.0),
        new THREE.Vector3(-20.0, 0.0, -20.0)
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );

    //*********

    scene.add(plane);

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );
    scene.add(new THREE.AxisHelper(10));

    createPlane(0, .5, 0);
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
            if (node instanceof THREE.mesh) {
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
        camera = cameraSide;
        break;
    case 50: //2
        camera = cameraFront;
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
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();

    render();
    
    window.addEventListener("keydown", onKeyDown);
    // window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';	




    render();
    requestAnimationFrame(animate);
}
