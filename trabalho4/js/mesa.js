/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop;

var geometry, material, mesh;

var clock;

var controls;

var tableMaterialPhong, tableMaterialBasic;



////////////////////////////////////////////////
//////              TABLE                 //////
////////////////////////////////////////////////

function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    tableMaterialPhong = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x000000,
        shininess: 50
    })

    tableMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xff0000, 
        opacity: 1, 
        wireframe: false
    })

    // width, height, depth
    geometry = new THREE.CubeGeometry(60, 2, 60); 
    mesh = new THREE.Mesh(geometry, tableMaterialBasic);
    mesh.position.set(x, y, z);
    table.add(mesh);


    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 10, 0);

}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    
    var camFactor = 14;

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraTop.position.set(0,50,0);
    cameraTop.lookAt(scene.position);

    camera = cameraTop;

    controls = new THREE.OrbitControls( cameraTop );
    controls.update();

}

function onResize() {
    'use strict';

    var camFactor = 14;

    // notify the renderer of the size change
    renderer.setSize(window.innerWidth, window.innerHeight);

    // update the camera
    cameraTop.left = -window.innerWidth / camFactor;
    cameraTop.right = window.innerWidth / camFactor;
    cameraTop.top = window.innerHeight / camFactor;
    cameraTop.bottom = -window.innerHeight / camFactor;
    cameraTop.updateProjectionMatrix();
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

    controls.update();

    render();
    
    requestAnimationFrame(animate);
}

