/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront, cameraPerspective, ballCamera;

var geometry, material, mesh, lightTestCube;

var plane, floor;

var helper, light, light2, light3, light4, ambientLight, pointLight, directionalLight;


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
    geometry.faces.push(new THREE.Face3(0, 2, 3));
    geometry.computeFaceNormals();
}

function createPlane(x, y, z) {
    'use strict'

    var vertices;
    plane = new THREE.Object3D();
    plane.userData = {pitchLeft:false, pitchRight:false, yawUp:false, yawDown:false}

    var vertex_array = [    // (x, y, z)
        // nose
        new THREE.Vector3(5.5, 0.0, 0.0),                                                //0

        // octagon front          Math.tan(Math.PI/8) = 0.414
        new THREE.Vector3(3.5, -Math.tan(Math.PI/8), -1.0),                              //1
        new THREE.Vector3(3.5, Math.tan(Math.PI/8), -1.0),
        new THREE.Vector3(3.5, 1.0, -Math.tan(Math.PI/8)),
        new THREE.Vector3(3.5, 1.0, Math.tan(Math.PI/8)),
        new THREE.Vector3(3.5, Math.tan(Math.PI/8), 1.0),
        new THREE.Vector3(3.5, -Math.tan(Math.PI/8), 1.0),
        new THREE.Vector3(3.5, -1.0, Math.tan(Math.PI/8)),
        new THREE.Vector3(3.5, -1.0, -Math.tan(Math.PI/8)),                              //8

        // octagon back
        new THREE.Vector3(-7, -Math.tan(Math.PI/8)*0.4, -0.4),                           //9
        new THREE.Vector3(-7, Math.tan(Math.PI/8)*0.4, -0.4),
        new THREE.Vector3(-7, 0.4, -Math.tan(Math.PI/8)*0.4),
        new THREE.Vector3(-7, 0.4, Math.tan(Math.PI/8)*0.4),
        new THREE.Vector3(-7, Math.tan(Math.PI/8)*0.4, 0.4),
        new THREE.Vector3(-7, -Math.tan(Math.PI/8)*0.4, 0.4),
        new THREE.Vector3(-7, -0.4, Math.tan(Math.PI/8)*0.4),
        new THREE.Vector3(-7, -0.4, -Math.tan(Math.PI/8)*0.4),
        new THREE.Vector3(-6, 0.0, 0.0),                                                //17

        // wing right
        new THREE.Vector3(2.5, -0.3, 1 - 1/10),                                         //18
        new THREE.Vector3(2.5, 0.3, 1 - 1/10),
        new THREE.Vector3(2.5, 0.0, 7.5),
        new THREE.Vector3(-1.0, 0.0, 1 - 4.5/10),
        new THREE.Vector3(-1.0, 0.0, 3.5),                                              //22

        // wing left
        new THREE.Vector3(2.5, -0.3, -(1 - 1/10)),                                      //23
        new THREE.Vector3(2.5, 0.3, -(1 - 1/10)),
        new THREE.Vector3(2.5, 0.0, -7.5),
        new THREE.Vector3(-1.0, 0.0, -(1 - 4.5/10)),
        new THREE.Vector3(-1.0, 0.0, -3.5),                                             //27

        // cockpit
        new THREE.Vector3(1.5, (1 - 2/10), 0.0),                                        //28
        new THREE.Vector3(0.0, (1 - 3.5/10), 0.4),
        new THREE.Vector3(-4.0, (1 - 7.5/10), 0.0),
        new THREE.Vector3(0.0, (1 - 3.5/10), -0.4),
        new THREE.Vector3(0.0, 1.6, 0.0),                                               //32

        // back fin right
        new THREE.Vector3(-5.4, 0.0, (1 - 8.4/15)),                                     //33
        new THREE.Vector3(-6.5, 0.15, (1 - 9.5/15)),
        new THREE.Vector3(-7, 0.0, 0.4),
        new THREE.Vector3(-6.5, -0.15, (1 - 9.5/15)),
        new THREE.Vector3(-6.5, 0.0, 3.0),                                              //37

        // back fin left
        new THREE.Vector3(-5.4, 0.0, -(1 - 8.4/15)),                                    //38
        new THREE.Vector3(-6.5, 0.15, -(1 - 9.5/15)),
        new THREE.Vector3(-7, 0.0, -0.4),
        new THREE.Vector3(-6.5, -0.15, -(1 - 9.5/15)),
        new THREE.Vector3(-6.5, 0.0, -3.0),                                             //42

        // back fin top
        new THREE.Vector3(-5.4, (1 - 8.4/15), 0.0),                                     //43
        new THREE.Vector3(-6.5, (1 - 9.5/15), -0.15),
        new THREE.Vector3(-7, 0.4, 0.0 ),
        new THREE.Vector3(-6.5, (1 - 9.5/15), 0.15),
        new THREE.Vector3(-6.5, 2, 0.0),                                                //47

    ];


    // nose color
    material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })

    //*********
    vertices = [
        vertex_array[0],
        vertex_array[1],
        vertex_array[2]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[2],
        vertex_array[3]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[3],
        vertex_array[4]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[4],
        vertex_array[5]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[5],
        vertex_array[6]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[6],
        vertex_array[7]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[7],
        vertex_array[8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[8],
        vertex_array[1]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );


    // fuselage color
    material =     new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x01f0f3
    })


    //*********
    vertices = [
        vertex_array[2],
        vertex_array[1],
        vertex_array[1+8],
        vertex_array[2+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[3],
        vertex_array[2],
        vertex_array[2+8],
        vertex_array[3+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[4],
        vertex_array[3],
        vertex_array[3+8],
        vertex_array[4+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[5],
        vertex_array[4],
        vertex_array[4+8],
        vertex_array[5+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[6],
        vertex_array[5],
        vertex_array[5+8],
        vertex_array[6+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[7],
        vertex_array[6],
        vertex_array[6+8],
        vertex_array[7+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[8],
        vertex_array[7],
        vertex_array[7+8],
        vertex_array[8+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[1],
        vertex_array[8],
        vertex_array[8+8],
        vertex_array[1+8]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );


    // jet engine color
    material =     new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xFF8C00
    })


    //*********
    vertices = [
        vertex_array[17],
        vertex_array[2+8],
        vertex_array[1+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[3+8],
        vertex_array[2+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[4+8],
        vertex_array[3+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[5+8],
        vertex_array[4+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[6+8],
        vertex_array[5+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[7+8],
        vertex_array[6+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[8+8],
        vertex_array[7+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[1+8],
        vertex_array[8+8]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );


    // wing color
    material =     new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })


    //*********
    vertices = [
        vertex_array[18],
        vertex_array[19],
        vertex_array[20]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[21],
        vertex_array[22],
        vertex_array[20],
        vertex_array[19]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[20],
        vertex_array[22],
        vertex_array[21],
        vertex_array[18]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[25],
        vertex_array[24],
        vertex_array[23]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[25],
        vertex_array[27],
        vertex_array[26],
        vertex_array[24]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[26],
        vertex_array[27],
        vertex_array[25],
        vertex_array[23]
    ];
    drawSquareFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );


    // cockpit color
    material =     new THREE.MeshPhongMaterial({
        color: 0x87CEEB,
        emissive: 0x00FFFF
    })

    //*********
    vertices = [
        vertex_array[32],
        vertex_array[29],
        vertex_array[28]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[30],
        vertex_array[29]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[31],
        vertex_array[30]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[28],
        vertex_array[31]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********


    // back fins color
    material =     new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })


    vertices = [
        vertex_array[37],
        vertex_array[36],
        vertex_array[33]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[35],
        vertex_array[36]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[34],
        vertex_array[35]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[33],
        vertex_array[34]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[39],
        vertex_array[38]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[38],
        vertex_array[41]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[41],
        vertex_array[40]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[40],
        vertex_array[39]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[43],
        vertex_array[44]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[44],
        vertex_array[45]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[45],
        vertex_array[46]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[46],
        vertex_array[43]
    ];
    drawTriangleFace(vertices);
    mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true;
    plane.add( mesh );
    //*********

    plane.scale.set(8, 8, 8);
    plane.castShadow = true;   

    scene.add(plane);

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
}

////////////////////////////////////////////////
//////               FLOOR                //////
////////////////////////////////////////////////

function createFloor(x, y, z) {
    'use strict';
    geometry = new THREE.PlaneGeometry(300, 300, 32, 32);
    material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});
    floor = new THREE.Mesh(geometry, material);
    floor.rotation.x -= Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );
    scene.add(new THREE.AxisHelper(10));

    createPlane(0, 40, 0);
    createFloor(0, 0, 0);


}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    
    var camFactor = 14;

    cameraFront = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraFront.position.set(0,50,80);
    cameraFront.lookAt(new THREE.Vector3(0,50,0));

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraTop.position.set(0,100,0);
    cameraTop.lookAt(scene.position);

    cameraSide = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraSide.position.set(80,50,0);
    cameraSide.lookAt(new THREE.Vector3(0,50,0));

    cameraPerspective = new THREE.PerspectiveCamera(70, (window.innerWidth / - camFactor) / (window.innerHeight / - camFactor), 1, 1000); 
    cameraPerspective.position.set(150,150,150);
    cameraPerspective.lookAt(plane.position);

    camera = cameraPerspective;
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

    cameraPerspective.aspect = (window.innerWidth / - camFactor) / (window.innerHeight / - camFactor);
    cameraPerspective.updateProjectionMatrix(); 
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
        if(light.intensity > 0) {
            light.intensity = 0.0;
        } else {
            light.intensity = 1;
        }
        break;
    case 50: //2
        if(light2.intensity > 0) {
            light2.intensity = 0.0;
        } else {
            light2.intensity = 1;
        }
        break;
    case 51: //3
        if(light3.intensity > 0) {
            light3.intensity = 0.0;
        } else {
            light3.intensity = 1;
        }
        break;

    case 52: //4
        if(light4.intensity > 0) {
            light4.intensity = 0.0;
        } else {
            light4.intensity = 1;
        }
        break;

    case 78: //N
    case 110: //n
        if(directionalLight.intensity > 0) {
            directionalLight.intensity = 0.0;
        } else {
            directionalLight.intensity = 1.1;
        }
        break;

    case 76: //L
    case 108: //l

        break;

    case 71: //G
    case 103: //g

        break;

    case 37: //left arrow
        plane.userData.pitchLeft = true;
        break;
    case 38: //up arrow
        plane.userData.yawUp = true;
        break;
    case 39: //right arrow
        plane.userData.pitchRight = true;
        break;
    case 40: //down arrow
        plane.userData.yawDown = true;
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //left arrow
        plane.userData.pitchLeft = false;
        break;
    case 38: //up arrow
        plane.userData.yawUp = false;
        break;
    case 39: //right arrow
        plane.userData.pitchRight = false;
        break;
    case 40: //down arrow
        plane.userData.yawDown = false;
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


    //////////////////// //////////////////////
    ////////////// TESTING //////////////////// 
    //////////////////// ////////////////////// 
    geometry = new THREE.CubeGeometry(10, 10, 10);
    material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false }); 
    lightTestCube = new THREE.Mesh(geometry, material);
    lightTestCube.position.set(50, 20, 50);
    lightTestCube.castShadow = true;
    scene.add(lightTestCube);

    light = new THREE.SpotLight(0xffffff, 1, 2000, 0.25, 0.2);
    light.position.set(150,150,-150);
    light.target = plane;
    light.castShadow = true;
    scene.add(light);

    light2 = new THREE.SpotLight(0xffffff, 1, 2000, 0.25, 0.2);
    light2.position.set(150,150,150);
    light2.target = plane;
    light2.castShadow = true;
    scene.add(light2);

    light3 = new THREE.SpotLight(0xffffff, 1, 2000, 0.25, 0.2);
    light3.position.set(-150,150,150);
    light3.target = plane;
    light3.castShadow = true;
    scene.add(light3);

    light4 = new THREE.SpotLight(0xffffff, 1, 2000, 0.25, 0.2);
    light4.position.set(-150,150,-150);
    light4.target = plane;
    light4.castShadow = true;
    scene.add(light4);

    // pointLight = new THREE.PointLight(0xffffff, 2.0, 100);
    // scene.add(pointLight);

    // pointLight.position.set(0, plane.position.y+20, 0);

    // ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(60, 120, 60);
    directionalLight.target = floor;
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.5;
    scene.add(directionalLight);

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = cameraPerspective.far;
    directionalLight.shadowCameraLeft = -60;
    directionalLight.shadowCameraRight = 60;
    directionalLight.shadowCameraTop = 60;
    directionalLight.shadowCameraBottom = -60;

    helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(helper);

////////////////////////////////////////////////
//////               CONE                 //////
////////////////////////////////////////////////

    geometry = new THREE.ConeGeometry( 5, 10, 32 );
    material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var cone = new THREE.Mesh(geometry, material);
    var cone2 = new THREE.Mesh(geometry, material);
    var cone3 = new THREE.Mesh(geometry, material);
    var cone4 = new THREE.Mesh(geometry, material);



    cone.position.set(-100,100,-100);
    cone.rotation.x -= Math.PI / 4;
    cone.rotation.z += Math.PI / 5;

    cone2.position.set(100,100,-100);
    cone2.rotation.x -= Math.PI / 4;
    cone2.rotation.z -= Math.PI / 5;


    cone3.position.set(-100,100,100);
    cone3.rotation.x += Math.PI / 4;
    cone3.rotation.z += Math.PI / 5;


    cone4.position.set(100,100,100);
    cone4.rotation.x += Math.PI / 4;
    cone4.rotation.z -= Math.PI / 5;



    scene.add(cone);
    scene.add(cone2);
    scene.add(cone3);
    scene.add(cone4);




    renderer.shadowMap.enabled = true;                  
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;           

    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = 5;
    renderer.shadowCameraFov = 50;


    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';   

    var rotValue = Math.PI / 60;

    if(plane.userData.pitchLeft == true && plane.userData.pitchRight == false){
        plane.rotation.y += rotValue;
    }
    
    if(plane.userData.pitchLeft == false && plane.userData.pitchRight == true){
        plane.rotation.y -= rotValue;
    }

    if(plane.userData.yawUp == true && plane.userData.yawDown == false){
        plane.rotation.z += rotValue;
    }
    
    if(plane.userData.yawUp == false && plane.userData.yawDown == true){
        plane.rotation.z -= rotValue;
    }


    render();
    requestAnimationFrame(animate);
}
