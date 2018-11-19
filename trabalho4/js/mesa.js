// http-server Development/git/CG-IST/trabalho4 -p 9100

var camera, scene, renderer;
var cameraTop, cameraPause;

var geometry, material, mesh, texture, bumpTexture;
var meshes = [], basicMats = [], phongMats = [];
var clock;
var controls;

var table, tableMaterialPhong, tableMaterialBasic;
var ball, ballMaterialPhong, ballMaterialBasic;
var cube, cubeMaterialPhong, cubeMaterialBasic;
var pauseSign;
var currentMaterial = " ";
var orbit = false;
var pause = false;

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
    mesh.receiveShadow = true;
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

    ball.userData = { v: 0, acc: 0, maxSpeed: 7, accelaration: 2, attrition: 0.04};

    texture = new THREE.TextureLoader().load("img/ball.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    // radius, width segments, height segments
    geometry = new THREE.SphereGeometry(8, 12, 12); 

    // modify UVs to accommodate MatCap texture
    var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
    for ( var i = 0; i < faceVertexUvs.length; i ++ ) {

        var uvs = faceVertexUvs[ i ];
        var face = geometry.faces[ i ];

        for ( var j = 0; j < 3; j ++ ) {

            // transforma coordenadas de [-1, 1] para [0, 1]
            uvs[j].x = (face.vertexNormals[j].x * 0.5 + 0.5) * 0.5 + ((face.vertexNormals[j].z < 0) ? 0.5 : 0);
            uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
        }
    }

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

    mesh = new THREE.Mesh(geometry, ballMaterialPhong);
    mesh.castShadow = true;
    meshes.push(mesh);
    ball.add(mesh);
    ball.castShadow = true;
    scene.add(ball);

    ball.rotation.y = 0;

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

    texture = new THREE.TextureLoader().load("img/cube.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    // width, height, depth
    geometry = new THREE.CubeGeometry(15, 15, 15);

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // geometry.faceVertexUvs[0][faceIndex][vertexIndex]
    var faceVertexUvs = geometry.faceVertexUvs[ 0 ];        // material 0

    var blocksH = 4;    // numero de colunas da textura
    var blocksV = 3;    // numero de linhas da textura
    var offsetX;        // numero da face do quadrado na textura, a contar da esquerda 
    var offsetY;        // numero da face do quadrado na textura, a contar de baixo

    var v_x=[],v_y=[],v_z=[];

    for ( var i = 0; i < faceVertexUvs.length; i ++ ) {     // itera sobre faces
        // transforma coordenadas de [-1, 1] para [0, 1]

        var uvs = faceVertexUvs[i];
        var face = geometry.faces[i];

        for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices
            v_x.push((face.vertexNormals[j].x > 0) ? 1 : -1);
            v_y.push((face.vertexNormals[j].y > 0) ? 1 : -1);
            v_z.push((face.vertexNormals[j].z > 0) ? 1 : -1);
        }

        // faces perpendiculares a x
        if (v_x[0] > 0 && v_x[1] > 0 && v_x[2] > 0) {

            // canto inferior esquerdo da face do quadrado correpondente, na textura
            offsetX = 0;
            offsetY = 1;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_y[j] == 1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_y[j] == 1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_y[j] == -1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_y[j] == -1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                }
            }

        } else if (v_x[0] < 0 && v_x[1] < 0 && v_x[2] < 0) {

            offsetX = 2;
            offsetY = 1;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_y[j] == 1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_y[j] == 1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_y[j] == -1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_y[j] == -1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                }
            }

        // faces perpendiculares a y
        } else if (v_y[0] > 0 && v_y[1] > 0 && v_y[2] > 0) {
            
            offsetX = 1;
            offsetY = 2;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_x[j] == 1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == 1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_x[j] == -1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == -1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                }
            }

        } else if (v_y[0] < 0 && v_y[1] < 0 && v_y[2] < 0) {
            
            offsetX = 1;
            offsetY = 0;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_x[j] == 1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_x[j] == 1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == -1 && v_z[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_x[j] == -1 && v_z[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                }
            }

        // faces perpendiculares a z
        } else if (v_z[0] > 0 && v_z[1] > 0 && v_z[2] > 0) {
            
            offsetX = 3;
            offsetY = 1;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_x[j] == 1 && v_y[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == 1 && v_y[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_x[j] == -1 && v_y[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == -1 && v_y[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                }
            }

        } else if (v_z[0] < 0 && v_z[1] < 0 && v_z[2] < 0) {
            
            offsetX = 1;
            offsetY = 1;

            for ( var j = 0; j < uvs.length; j ++ ) {           // itera sobre vertices

                if (v_x[j] == 1 && v_y[j] == 1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == 1 && v_y[j] == -1) {

                    uvs[j].x = 1/ blocksH * offsetX;
                    uvs[j].y = 1/ blocksV * offsetY;

                } else if (v_x[j] == -1 && v_y[j] == 1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * (offsetY+1);

                } else if (v_x[j] == -1 && v_y[j] == -1) {

                    uvs[j].x = 1/ blocksH * (offsetX+1);
                    uvs[j].y = 1/ blocksV * offsetY;

                }
            }
        }

        v_x=[],v_y=[],v_z=[];
    }



    bumpTexture = new THREE.TextureLoader().load("img/cube-bump.png");
    bumpTexture.wrapS = THREE.RepeatWrapping;
    bumpTexture.wrapT = THREE.RepeatWrapping;
    bumpTexture.repeat.set(3, 4);

    cubeMaterialPhong = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        shininess: 90,
        wireframe: false,
        bumpMap: bumpTexture,
        map: texture
    })
    phongMats.push(cubeMaterialPhong);

    cubeMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 1, 
        wireframe: false,
        map: texture
    })
    basicMats.push(cubeMaterialBasic);

    mesh = new THREE.Mesh(geometry, cubeMaterialPhong);
    // mesh.position.set(x, y, z);
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
//////           PAUSE SIGN               //////
////////////////////////////////////////////////

function createPauseSign(x, y, z) {
    'use strict';
    
    pauseSign = new THREE.Object3D();

    texture = new THREE.TextureLoader().load("img/Paused.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    var pauseSignMaterialBasic = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        opacity: 1, 
        wireframe: false,
        map: texture
    })

    var camFactor = 14;
    var width = (window.innerWidth / camFactor) * 2;
    var height = (window.innerHeight / camFactor) * 2;

    // width, height, depth
    geometry = new THREE.CubeGeometry(width, height, 1); 
    mesh = new THREE.Mesh(geometry, pauseSignMaterialBasic);
    pauseSign.add(mesh);
    scene.add(pauseSign);

    pauseSign.visible = false;
    
    pauseSign.position.x = x;
    pauseSign.position.y = y;
    pauseSign.position.z = z;
}


////////////////////////////////////////////////
//////               SCENE                //////
////////////////////////////////////////////////


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xcccccc );
    

    scene.add(new THREE.AxisHelper(30));
    
    createTable(0, -2, 0);
    createBall(25, 7, 15);
    createCube(0, 6.5, 0);
    createPauseSign(0, 0, 60);
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

    cameraPause = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 1, 1000 );
    cameraPause.position.set(0,0,200);
    cameraPause.lookAt(new THREE.Vector3(0,0,0));

    camera = cameraTop;

    controls = new THREE.OrbitControls( cameraTop );
    controls.minDistance = 70;
    controls.maxDistance = 500;
    controls.enablePan = false;
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
    scene.add(directionalLight);

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadowCameraLeft = -60;
    directionalLight.shadowCameraRight = 60;
    directionalLight.shadowCameraTop = 60;
    directionalLight.shadowCameraBottom = -60;

    // var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(helper);

    // color, intensity, distance, angle, penumbra
    spotlight = new THREE.SpotLight(0xffffff, 1.5, 2000, 0.25, 1);
    spotlight.position.set(-80,140,-30);
    spotlight.target = table;
    spotlight.castShadow = true;
    spotlight.visible = false;
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
        if (!pause){
            if(directionalLight.visible) {
                directionalLight.visible = false;
            } else {
                directionalLight.visible = true;
            }
        }
        break;
    case 80: //P
    case 112: //p
        if (!pause){
            if(spotlight.visible) {
                spotlight.visible = false;
            } else {
                spotlight.visible = true;
            }
        }
        break;

    case 76: //L
    case 108: //l

        if (!pause){
            if (currentMaterial == "basic") {

                // passar tudo para phong
                for (var i = 0, len = meshes.length; i < len; i++) {
                    var mesh = meshes[i];
                    var phong = phongMats[i];
                    mesh.material = phong;
                }
                currentMaterial = "phong";
            }else{
                // passar tudo para basic
                for (var i = 0, len = meshes.length; i < len; i++) {

                    var mesh = meshes[i];
                    var basic = basicMats[i];
                    mesh.material = basic;
                }
                currentMaterial = "basic";
            }
        }
        break;

    case 87: //W
    case 119: //w

        if (!pause){
            for (var i = 0, len = meshes.length; i < len; i++) {

                var basic = basicMats[i];
                var phong = phongMats[i];
                basic.wireframe = !basic.wireframe;
                phong.wireframe = !phong.wireframe;
            }
        }
        break;

    case 83: //S
    case 115: //s

        if (!pause) {
            pause = true;
            controls.enabled = false;
            pauseSign.visible = true;

            camera = cameraPause;

            // var azAngle = controls.getAzimuthalAngle();
            // pauseSign.rotation.y = azAngle;


        } else {
            pause = false;
            pauseSign.visible = false;
            controls.enabled = true;
            camera = cameraTop;
        }
        break;

    case 66: //B
    case 98: //b

        if (!pause){
            orbit = !orbit;
    
            if (ball.userData.acc != 0) {
                ball.userData.acc = 0;
            }
            else{
                ball.userData.acc = ball.userData.accelaration;
            }
        }
        break;

    case 82: //R
        case 114: //r

            if (pause)
                resetVars();
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
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';   

    controls.update();


    var timeElapsed = clock.getDelta();

    if (!pause) {
        if(Math.abs(ball.userData.v) < ball.userData.maxSpeed && ball.userData.acc != 0){
            ball.userData.v += ball.userData.acc * timeElapsed / 2;
        }
        
        if(Math.abs(ball.userData.v) > 0 && ball.userData.acc == 0){        

            ball.userData.v -= ball.userData.attrition;

            if (ball.userData.v < 0){
                ball.userData.v = 0;
            }        
        }

        var movement = (ball.userData.v * timeElapsed);


        var rollSpeed = movement;
        var x = ball.position.x, z = ball.position.z;

        ball.rotateY(2.0 * movement);

        ball.position.x = (x * Math.cos(rollSpeed) + z * Math.sin(rollSpeed));
        ball.position.z = (z * Math.cos(rollSpeed) - x * Math.sin(rollSpeed));

        // ball.rotateX( -((z - ball.position.z) / Math.PI) );
        // ball.rotateZ( ((x - ball.position.x) / Math.PI) );
    }


    render();
    requestAnimationFrame(animate);
}

function resetVars() {
    camera = cameraTop;
    controls.reset();
    orbit = false;
    pause = false;
    directionalLight.visible = true;
    spotlight.visible = false;
    pauseSign.visible = false;
    controls.enabled = true;

    for (var i = 0, len = meshes.length; i < len; i++) {
        var mesh = meshes[i];
        var phong = phongMats[i];
        mesh.material = phong;
    }
    currentMaterial = "phong";

    ball.userData = { v: 0, acc: 0, maxSpeed: 7, accelaration: 2, attrition: 0.04};

    for (var i = 0, len = meshes.length; i < len; i++) {
        var basic = basicMats[i];
        var phong = phongMats[i];
        basic.wireframe = false;
        phong.wireframe = false;
    }

    ball.position.x = 25;
    ball.position.y = 7;
    ball.position.z = 15;

    ball.rotation.y = 0;
}
