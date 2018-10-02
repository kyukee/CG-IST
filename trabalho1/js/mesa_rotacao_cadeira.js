/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer, controls;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var chair, chairTop;

var clock, deltaT, t, now;


////////////////////////////////////////////////
//////              TABLE                 //////
////////////////////////////////////////////////

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


////////////////////////////////////////////////
//////               LAMP                 //////
////////////////////////////////////////////////

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
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
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
    mesh.rotation.z = Math.PI / 8 * -Math.sign(x);
    
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


////////////////////////////////////////////////
//////               CHAIR                //////
////////////////////////////////////////////////

function addChairHeadSupport(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(10, 4, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);    
}

function addChairBackSupport(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(20, 16, 3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.add(new THREE.AxisHelper(10));
    obj.add(mesh);
}

function addChairSeat(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(20, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function addChairTop(obj, x, y, z) {
    'use strict'

    chairTop = new THREE.Object3D();

    chairTop.userData = { rLeft: 0, rRight: 0, sentido: 0, rRate: 1,  maxRot: 5 };

    addChairHeadSupport(chairTop, 0, 9.5, -8.5);
    addChairBackSupport(chairTop, 0, -0.5, -8.5);
    addChairSeat(chairTop, 0, -9.5, 0);

    obj.add(chairTop);
}

function addChairTube(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 8.5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLegWheelCenter(obj, x, y, z) {
    'use strict'

    var geometry = new THREE.CylinderGeometry(1, 1, 1, 10);

    //help distinguish legs components
    // material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;
    obj.add(mesh);
}

function addChairLegWheel(obj, x, y, z) {
    'use strict'

    var chairLegWheel = new THREE.Object3D();

    addChairLegWheelCenter(chairLegWheel, x, y, z);

    //help distinguish legs components
    // material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

    geometry = new THREE.TorusGeometry(1.5, 0.5, 5, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    chairLegWheel.add(mesh);
    obj.add(chairLegWheel);    
}

function addChairLegs(obj, x, y, z) {
    'use strict';

    var chairLeg, rotate;

    for(var i = 1; i < 4; i++) {
        rotate = (Math.PI / 3) * i;
        chairLeg = new THREE.Object3D();

        addChairLegWheel(chairLeg, x - 9, y - 3, z);
        addChairLegWheel(chairLeg, x + 9, y - 3, z);

        //help distinguish legs components
        // material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

        geometry = new THREE.CubeGeometry(20, 1.5, 1.5);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        chairLeg.add(mesh);

        chairLeg.rotation.y = rotate;

        obj.add(chairLeg);
    }
}

function createChair(x, y, z) {
    'use strict'

    chair = new THREE.Object3D();

    chair.userData = { vX: 0, vZ: 0, accX: 0, accZ: 0, maxSpeed: 20 };

    material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

    addChairTop(chair, 0, 4, -8);
    // addChairHeadSupport(chair, 0, 8.5, -8);
    // addChairBackSupport(chair, 0, -1.5, -8);
    // addChairSeat(chair, 0, -10, 0);
    addChairTube(chair, 0, -15, 0);
    addChairLegs(chair, 0, -20, 0);

    chair.scale.set(1.5, 1.5, 1.5);

    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 37, 0);
    createLamp(40,37,5);
    createChair(0, 37, -10);
}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    //camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,  1,    1000);

    // camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 );

    // camera.position.x = 50;
    // camera.position.y = 50;
    // camera.position.z = 50;
    //camera.lookAt(scene.position);
    

    
    cameraFront = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraFront.position.set(0,50,50);
    cameraFront.lookAt(new THREE.Vector3(0,50,0));

    cameraSide = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraSide.position.set(50,50,0);
    cameraSide.lookAt(new THREE.Vector3(0,50,0));

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - 14, window.innerWidth / 14, window.innerHeight / 14, window.innerHeight / - 14, 1, 1000 );
    cameraTop.position.set(0,50,0);
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
        chairTop.userData.sentido = 1;
        break;
    case 38: //up arrow
        chair.userData.accZ = -10;
        break;
    case 39: //right arrow
        chairTop.userData.sentido = -1;
        break;
    case 40: //down arrow
        chair.userData.accZ = 10;
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //left arrow
        chairTop.userData.sentido = 0;
        break;
    case 38: //up arrow
        chair.userData.accZ = 0;
        break;
    case 39: //right arrow
        chairTop.userData.sentido = 0;
        break;
    case 40: //down arrow
        chair.userData.accZ = 0;
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
    t = clock.getElapsedTime();

    

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
    
    now = clock.getElapsedTime();
    deltaT = now - t;
    t = now;

    var attrition = 0.1;

//////////////////////////////////////////////////////////////////////
//////////                  ROTAÇAO chairTop                //////////
//////////////////////////////////////////////////////////////////////

    var sentido = chairTop.userData.sentido;

    if(chairTop.userData.sentido > 0) {
        if(chairTop.userData.rRate < chairTop.userData.maxRot) {
            chairTop.userData.rRate += deltaT; 
            chairTop.userData.rLeft += sentido * chairTop.userData.rRate;
        } else {
            chairTop.userData.rRate = chairTop.userData.maxRot;
            chairTop.userData.rLeft += sentido * chairTop.userData.rRate;
        }
    }

    if(chairTop.userData.sentido < 0) {
        if(chairTop.userData.rRate < chairTop.userData.maxRot) {
            chairTop.userData.rRate += deltaT; 
            chairTop.userData.rRight += sentido * chairTop.userData.rRate;
        } else {
            chairTop.userData.rRate = chairTop.userData.maxRot;
            chairTop.userData.rRight += sentido * chairTop.userData.rRate;
        }
    }

    if(chairTop.userData.sentido == 0) {
        chairTop.userData.rRate = 0;
    }

//////////////////////////////////////////////////////////////////////
//////////                  MOVIMENTO ANTIGO                 /////////
//////////////////////////////////////////////////////////////////////

    // if(Math.abs(chair.userData.vX) < chair.userData.maxSpeed)
    //     chair.userData.vX += chair.userData.accX * deltaT / 2;
    
    // if(Math.abs(chair.userData.vX) > 0 && chair.userData.accX == 0){

    //     if (chair.userData.vX < 0) {
    //         chair.userData.vX += attrition;

    //         if (chair.userData.vX > 0){
    //             chair.userData.vX = 0;
    //         }


    //     } else {
    //         chair.userData.vX -= attrition;

    //         if (chair.userData.vX < 0){
    //             chair.userData.vX = 0;
    //         }
    //     }

    // }

    if(Math.abs(chair.userData.vZ) < chair.userData.maxSpeed)
        chair.userData.vZ += chair.userData.accZ * deltaT / 2;
    
    if(Math.abs(chair.userData.vZ) > 0 && chair.userData.accZ == 0){

        if (chair.userData.vZ < 0) {
            chair.userData.vZ += attrition;

            if (chair.userData.vZ > 0){
                chair.userData.vZ = 0;
            }


        } else {
            chair.userData.vZ -= attrition;

            if (chair.userData.vZ < 0){
                chair.userData.vZ = 0;
            }
        }

    }

    if(chairTop.userData.sentido > 0) {
        chairTop.rotation.y = THREE.Math.degToRad(chairTop.userData.rLeft); 
        chairTop.userData.rRight = chairTop.userData.rLeft;
    }
    if(chairTop.userData.sentido < 0) {
        chairTop.rotation.y = THREE.Math.degToRad(chairTop.userData.rRight);
        chairTop.userData.rLeft = chairTop.userData.rRight;
    }

    // chair.position.x += chair.userData.vX;
    chair.position.z += chair.userData.vZ;


    render();
    
    requestAnimationFrame(animate);

    // controls.update();
}