/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var chair, chairTop;

var chairWheels = [];

var clock;


////////////////////////////////////////////////
//////              TABLE                 //////
////////////////////////////////////////////////

function addTableTop(obj, x, y, z) {
    'use strict';

    // width, height, depth
    geometry = new THREE.CubeGeometry(50, 1, 30); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableLegRound(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(1, 1, 36, 10);
    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x393536, wireframe: true }));
    mesh.position.set(x, y - 18, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0xbd8e61, wireframe: true });
    addTableTop(table, 0, 0, 0);

    material = new THREE.MeshBasicMaterial({ color: 0x393536, wireframe: true });
    addTableLegRound(table, -22, -0.5, -12);
    addTableLegRound(table, -22, -0.5, 12);
    addTableLegRound(table, 22, -0.5, 12);
    addTableLegRound(table, 22, -0.5, -12);
    
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
    // material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
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
    
    material = new THREE.MeshBasicMaterial({ color: 0x634d2e, wireframe: true });

    addLampPole(lamp, 0, 0, 0);
    addLampBase(lamp, 0, -35, 0);
    addLampFrame(lamp, 0, 30, 0);
    addLampLightbulb(lamp, 0, 35, 0);

    material = new THREE.MeshBasicMaterial({ color: 0xefb892, wireframe: true });
    addLampCover(lamp, 0, 35, 0);

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

    addChairHeadSupport(chairTop, 0, 9.5, -8.5);
    addChairBackSupport(chairTop, 0, -0.5, -8.5);
    addChairSeat(chairTop, 0, -9.5, 0);

    obj.add(chairTop);
}

function addChairTube(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 8.6, 10);
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

    // geometry.translate( distX, distY, distZ );

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    chairLegWheel.add(mesh);
    obj.add(chairLegWheel); 

    chairWheels.push(mesh);   

}

function addChairLegs(obj, x, y, z) {
    'use strict';

    var chairLeg, rotate;

    for(var rotation = (Math.PI / 3); rotation <= Math.PI; rotation += (Math.PI / 3)) {

        chairLeg = new THREE.Object3D();

        addChairLegWheel(chairLeg, x - 9, y - 2.75, z);
        addChairLegWheel(chairLeg, x + 9, y - 2.75, z);

        //help distinguish legs components
        // material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

        geometry = new THREE.CubeGeometry(20, 1.75, 1.5);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        chairLeg.add(mesh);

        chairLeg.rotation.y = rotation;

        obj.add(chairLeg);
    }
}

function createChair(x, y, z) {
    'use strict'

    chair = new THREE.Object3D();

    chair.userData = { vFront: 0, vBack: 0, accFront: 0, accBack: 0, accelaration: 20, maxSpeed: 30 , rotateLeft: false, rotateRight: false};

    material = new THREE.MeshBasicMaterial({color: 0x4d586a, wireframe: true});
    addChairTop(chair, 0, 4, -8);

    material = new THREE.MeshBasicMaterial({color: 0x838385, wireframe: true});
    addChairTube(chair, 0, -14.8, 0);

    material = new THREE.MeshBasicMaterial({color: 0x212224, wireframe: true});
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
    
    createTable(0, 36.5, 0);
    createLamp(40,37,5);
    createChair(0, 37, -10);
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

// function toggleWireFrame(obj){
//      var f = function(obj2)
//      {
//          if(obj2.hasOwnProperty("material")){
//      obj2.material.wireframe=!obj2.material.wireframe;
//      }          
//   }
//      obj.traverse(f);   
// }

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

        // scene.traverse(toggleWireFrame(node));

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
	
    var rotValue = Math.PI / 60;

	if(chair.userData.rotateLeft == true && chair.userData.rotateRight == false){
		chairTop.rotation.y += rotValue;
    }
	
	if(chair.userData.rotateRight == true && chair.userData.rotateLeft == false){
		chairTop.rotation.y -= rotValue;
    }
		
    
    var timeElapsed = clock.getDelta();

    var attrition = 0.4;

        
    if(Math.abs(chair.userData.vFront) > 0  || Math.abs(chair.userData.vBack) > 0){   
        chairWheelsSwivelSet(chairTop.rotation.y);
        chairWheelsRotationAdd(.1);
    }



    if(Math.abs(chair.userData.vFront) < chair.userData.maxSpeed && chair.userData.accFront != 0){
        chair.userData.vFront += chair.userData.accFront * timeElapsed / 2;

    }
    
    if(Math.abs(chair.userData.vFront) > 0 && chair.userData.accFront == 0){        

        chair.userData.vFront -= attrition;

        if (chair.userData.vFront < 0){
            chair.userData.vFront = 0;
        }        

    }

    if(Math.abs(chair.userData.vBack) < chair.userData.maxSpeed && chair.userData.accBack != 0){
        chair.userData.vBack += chair.userData.accBack * timeElapsed / 2;

    }
    
    
    if(Math.abs(chair.userData.vBack) > 0 && chair.userData.accBack == 0){

        chair.userData.vBack -= attrition;

        if (chair.userData.vBack < 0){
            chair.userData.vBack = 0;
        }

    }

    var frontMovement = (chair.userData.vFront * timeElapsed);
    var backMovement = (chair.userData.vBack * timeElapsed);

    chair.position.z += frontMovement * Math.cos(chairTop.rotation.y);
    chair.position.z -= backMovement * Math.cos(chairTop.rotation.y);

    chair.position.x += frontMovement * Math.sin(chairTop.rotation.y);
    chair.position.x -= backMovement * Math.sin(chairTop.rotation.y);

    render();
    
    requestAnimationFrame(animate);
}



function chairWheelsRotationAdd(value) {
    for (var i = 0, len = chairWheels.length; i < len; i++) {
        var wheel = chairWheels[i];
        var s = -1 * ((i%2) * 2) ;
        wheel.rotation.z += value * s;
    }
}

function chairWheelsSwivelSet(value) {
    for (var i = 0, len = chairWheels.length; i < len; i++) {
        var wheel = chairWheels[i];

        if (i == 0 || i == 1)
            wheel.rotation.y = value + (Math.PI / 6) ;

        if (i == 2 || i == 3)
            wheel.rotation.y = value - (Math.PI / 6) ;

        if (i == 4 || i == 5)
            wheel.rotation.y = value + (Math.PI / 2) ;
    }
}