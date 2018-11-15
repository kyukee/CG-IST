/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var cameraTop;

var geometry, material, mesh, texture, bumpTexture;
var meshes = [], basicMats = [], phongMats = [];
var clock;
var controls;

var table, tableMaterialPhong, tableMaterialBasic;
var ball, ballMaterialPhong, ballMaterialBasic;
var cube, cubeMaterialPhong, cubeMaterialBasic;
var currentMaterial = " ";
var orbit = true;

var directionalLight, spotlight;


////////////////////////////////////////////////
//////              TABLE                 //////
////////////////////////////////////////////////

function createTable(x, y, z) {
    'use strict';
    
    table = new THREE.Object3D();

    texture = new THREE.TextureLoader().load("img/checkers.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);

    tableMaterialPhong = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        shininess: 70,
        map: texture
    })
    phongMats.push(tableMaterialPhong);

    tableMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 1, 
        wireframe: false,
        map: texture
    })
    basicMats.push(tableMaterialBasic);

    // width, height, depth
    geometry = new THREE.CubeGeometry(100, 1, 100); 
    mesh = new THREE.Mesh(geometry, tableMaterialPhong);
    mesh.position.set(x, y, z);
    table.receiveShadow = true;
    meshes.push(mesh);
    table.add(mesh);
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}


////////////////////////////////////////////////
//////              BALL                  //////
////////////////////////////////////////////////

function createBall(x, y, z) {
    'use strict';
    
    ball = new THREE.Object3D();

    texture = new THREE.TextureLoader().load("img/ball.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    ballMaterialPhong = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        shininess: 180,
        map: texture
    })
    phongMats.push(ballMaterialPhong);

    ballMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 1, 
        wireframe: false,
        map: texture
    })
    basicMats.push(ballMaterialBasic);

    // radius, width segments, height segments
    geometry = new THREE.SphereGeometry(8, 12, 12); 
    mesh = new THREE.Mesh(geometry, ballMaterialPhong);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    meshes.push(mesh);
    ball.add(mesh);
    ball.castShadow = true;
    scene.add(ball);
    
    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;
}


////////////////////////////////////////////////
//////              CUBE                  //////
////////////////////////////////////////////////

function createCube(x, y, z) {
    'use strict';
    
    cube = new THREE.Object3D();

    texture = new THREE.TextureLoader().load("img/crate-texture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    bumpTexture = new THREE.TextureLoader().load("img/checkers.jpg");
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.repeat.set(1, 1);

    cubeMaterialPhong = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        shininess: 90,
        wireframe: false,
        map: texture,
        bumpMap: bumpTexture
    })
    phongMats.push(cubeMaterialPhong);

    cubeMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 1, 
        wireframe: false,
        map: texture
    })
    basicMats.push(cubeMaterialBasic);

    // width, height, depth
    geometry = new THREE.CubeGeometry(15, 15, 15);
    mesh = new THREE.Mesh(geometry, cubeMaterialPhong);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    meshes.push(mesh);
    cube.add(mesh);
    cube.castShadow = true;
    scene.add(cube);
    
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 0, 0);
    createBall(10, 10, 5);
    createCube(-5, 8, -10);
}


////////////////////////////////////////////////
//////              CAMERAS               //////
////////////////////////////////////////////////

function createCamera() {
    'use strict';
    
    var camFactor = 14;

    cameraTop = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraTop.position.set(-40,30,60);
    cameraTop.lookAt(new THREE.Vector3(0,0,0));

    camera = cameraTop;

    controls = new THREE.OrbitControls( cameraTop );
    controls.update();

}


////////////////////////////////////////////////
//////              LIGHTS                //////
////////////////////////////////////////////////

function createLights() {
    'use strict';
    
    // color, intensity
    directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(40, 100, 40);
    directionalLight.target = table;
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.5;
    directionalLight.visible = false;
    scene.add(directionalLight);

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadowCameraLeft = -60;
    directionalLight.shadowCameraRight = 60;
    directionalLight.shadowCameraTop = 60;
    directionalLight.shadowCameraBottom = -60;

    // color, intensity, distance, angle, penumbra
    spotlight = new THREE.SpotLight(0xffffff, 1, 2000, 0.25, 0.2);
    spotlight.position.set(-80,140,-30);
    spotlight.target = table;
    spotlight.castShadow = true;
    scene.add(spotlight);


    renderer.shadowMap.enabled = true;                  
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = 5;
    renderer.shadowCameraFov = 50;
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;
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
    case 68: //D
    case 100: //d
        if(directionalLight.visible) {
            directionalLight.visible = false;
        } else {
            directionalLight.visible = true;
        }

        break;
    case 80: //P
    case 112: //p
        if(spotlight.visible) {
            spotlight.visible = false;
        } else {
            spotlight.visible = true;
        }
        break;

    case 76: //L
    case 108: //l

        if (currentMaterial == "basic") {

            // passar tudo para phong
            for (var i = 0, len = meshes.length; i < len; i++) {
                var mesh = meshes[i];
                var phong = phongMats[i];
                mesh.material = phong;
                currentMaterial = "phong";
            }
        }else{
            // passar tudo para basic
            for (var i = 0, len = meshes.length; i < len; i++) {

                var mesh = meshes[i];
                var basic = basicMats[i];
                mesh.material = basic;
                currentMaterial = "basic";
            }
        }

        break;

    case 87: //W
    case 119: //w

        for (var i = 0, len = meshes.length; i < len; i++) {

            var basic = basicMats[i];
            var phong = phongMats[i];
            basic.wireframe = !basic.wireframe;
            phong.wireframe = !phong.wireframe;
        }

        break;

    case 79: //O
    case 111: //o
        orbit = !orbit;
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
    createLights();

    clock = new THREE.Clock(true);

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';   

    controls.update();

    if (orbit) {
        var x = camera.position.x, z = camera.position.z;
        var rotSpeed = 0.002;

        camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    }

    render();
    requestAnimationFrame(animate);
}

