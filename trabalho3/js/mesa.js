/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront, cameraPerspective, ballCamera;

var geometry, material, mesh;

var plane;


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
    material =     new THREE.MeshLambertMaterial({
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
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[2],
        vertex_array[3]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[3],
        vertex_array[4]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[4],
        vertex_array[5]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[5],
        vertex_array[6]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[6],
        vertex_array[7]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[7],
        vertex_array[8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[0],
        vertex_array[8],
        vertex_array[1]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );


    // fuselage color
    material =     new THREE.MeshLambertMaterial({
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
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[3],
        vertex_array[2],
        vertex_array[2+8],
        vertex_array[3+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[4],
        vertex_array[3],
        vertex_array[3+8],
        vertex_array[4+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[5],
        vertex_array[4],
        vertex_array[4+8],
        vertex_array[5+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[6],
        vertex_array[5],
        vertex_array[5+8],
        vertex_array[6+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[7],
        vertex_array[6],
        vertex_array[6+8],
        vertex_array[7+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[8],
        vertex_array[7],
        vertex_array[7+8],
        vertex_array[8+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[1],
        vertex_array[8],
        vertex_array[8+8],
        vertex_array[1+8]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );


    // jet engine color
    material =     new THREE.MeshLambertMaterial({
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
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[3+8],
        vertex_array[2+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[4+8],
        vertex_array[3+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[5+8],
        vertex_array[4+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[6+8],
        vertex_array[5+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[7+8],
        vertex_array[6+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[8+8],
        vertex_array[7+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[17],
        vertex_array[1+8],
        vertex_array[8+8]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );


    // wing color
    material =     new THREE.MeshLambertMaterial({
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
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[21],
        vertex_array[22],
        vertex_array[20],
        vertex_array[19]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[20],
        vertex_array[22],
        vertex_array[21],
        vertex_array[18]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[25],
        vertex_array[24],
        vertex_array[23]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[25],
        vertex_array[27],
        vertex_array[26],
        vertex_array[24]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[26],
        vertex_array[27],
        vertex_array[25],
        vertex_array[23]
    ];
    drawSquareFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );


    // cockpit color
    material =     new THREE.MeshLambertMaterial({
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
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[30],
        vertex_array[29]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[31],
        vertex_array[30]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[32],
        vertex_array[28],
        vertex_array[31]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********


    // back fins color
    material =     new THREE.MeshLambertMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })


    vertices = [
        vertex_array[37],
        vertex_array[36],
        vertex_array[33]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[35],
        vertex_array[36]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[34],
        vertex_array[35]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[37],
        vertex_array[33],
        vertex_array[34]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[39],
        vertex_array[38]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[38],
        vertex_array[41]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[41],
        vertex_array[40]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[42],
        vertex_array[40],
        vertex_array[39]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[43],
        vertex_array[44]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[44],
        vertex_array[45]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[45],
        vertex_array[46]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********
    vertices = [
        vertex_array[47],
        vertex_array[46],
        vertex_array[43]
    ];
    drawTriangleFace(vertices);
    plane.add( new THREE.Mesh(geometry, material) );
    //*********

    plane.scale.set(8, 8, 8);

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

    createPlane(0, 40, 0);
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
