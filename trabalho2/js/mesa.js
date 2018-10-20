/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var cameraTop, cameraSide, cameraFront;

var geometry, material, mesh;

var clock;

var balls = [];
var walls = [];


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
    mesh.userData = { vx: 0, vz: 0, m: 10000};
    mesh.position.set(x, y, z);
    obj.add(mesh);
    walls.push(mesh);
}

function addArenaLongWall(obj, x, y, z) {
    'use strict'
    // width, height, depth
    geometry = new THREE.CubeGeometry(200, 22.4, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { vx: 0, vz: 0, m: 10000};
    mesh.position.set(x, y, z);
    obj.add(mesh);
    walls.push(mesh);
}

function createArena(x, y, z) {
    'use strict'

    var arena = new THREE.Object3D();    

    material = new THREE.MeshBasicMaterial({color: 0x4d586a, wireframe: true});
    
    addArenaBase(arena, 0, 0, 0);
    addArenaLongWall(arena, 0, 11.7, 50.5);
    addArenaShortWall(arena, 100.5, 11.7, 0);
    addArenaLongWall(arena, 0, 11.7, -50.5);
    addArenaShortWall(arena, -100.5, 11.7, 0);

    scene.add(arena);

    arena.position.x = x;
    arena.position.y = y;
    arena.position.z = z;
}

function createBall(x, y, z) {
    'use strict'

    var ball = new THREE.Object3D();

    // randoms sao numeros entre -1 e 1
    // speed serve para aumentar esse intervalo
    var speed = 40;
    var random1 = (1 + Math.random()*(-2));
    var random2 = (1 + Math.random()*(-2));

    ball.userData = { vx: random1*speed, vz: random2*speed, m: 1, valid: true};

    geometry = new THREE.SphereGeometry(11.2, 16, 16);
    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    ball.add(mesh);
    ball.add(new THREE.AxisHelper(18));
    scene.add(ball);

    balls.push(ball);

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

    // m 1 v 14.142135623730951 teta 0.7853981633974483
    // m 10000 v 0 teta 6.283185307179586
    // phi 0.7853981633974483
    // vx -9.998000199980003 vz -9.998000199980002

    for (var i = 0; i < 10; i++) {
        do{
            var flag = true;

            // cria coordenadas aleatorias
            var x = Math.random() * (99-radius - (-99+radius)) + (-99+radius);
            var z = Math.random() * (49-radius - (-49+radius)) + (-49+radius);

            // verifica colisao com todas as bolas ja existentes
            for (var i = 0, len = balls.length; i < len; i++) {
                var d1 = x - balls[i].position.x;
                var d2 = z - balls[i].position.z;

                // se se sobrepor a uma bola ja existente, calcula novas coordenadas
                if(d1!=0 && d2!=0){
                    if(Math.pow(2*radius,2) >= Math.pow(d1,2) + Math.pow(d2,2)){
                        flag = false;
                    }
                }
            }
        }
        while(!flag);

        createBall(x, radius+1, z);
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
	
    // ballMoveTemp(0.1);

    var timeElapsed = clock.getDelta();
    for (var i = 0, len = balls.length; i < len; i++) {
        balls[i].position.x += (balls[i].userData.vx * timeElapsed);
        balls[i].position.z += (balls[i].userData.vz * timeElapsed);
    }

    


    for (var i = 0, len = balls.length; i < len; i++) {
        if(hasColision(balls[i])){
            var intersection = findIntersection(balls[i]);
            if(intersection != false){
                // intersection[0] = objeto com qual ha colisao
                // intersection[1] = array [x,z] com coordenadas da colisao
                processCollision2(balls[i], intersection[0], intersection[1]);
            }
        }
    }

    render();
    requestAnimationFrame(animate);
}

function ballMoveTemp(value) {
    for (var i = 0, len = balls.length; i < len; i++) {
        var ball = balls[i];
        ball.position.x += value;
    }
}

// returns true if an objects envolving volume collides with any other envolving volume on the scene
function hasColision(object) {
    var radius = 20;

    // verifica todas bolas
    for (var i = 0, len = balls.length; i < len; i++) {

        var x = object.position.x - balls[i].position.x;
        var z = object.position.z - balls[i].position.z;

        if(x!=0 && z!=0){
            if(Math.pow(2*radius,2) >= Math.pow(x,2) + Math.pow(z,2)){
                return true;
            }
        }
    }

    // varifica todas paredes
    for (var i = 0, len = walls.length; i < len; i++) {

        if(walls[i].position.x != 0){
            if(Math.abs(object.position.x - walls[i].position.x) <= radius)
                return true;
        }else{
            if(Math.abs(object.position.z - walls[i].position.z) <= radius)
                return true;            
        }

    }

    return false;
}

// returns the object and coordinates of the collision point or false if there is no collision
function findIntersection(object) {
    var radius = 11.2;
    var point = [0,0];

    var x;
    var z;
    
    // varifica todas paredes
    for (var i = 0, len = walls.length; i < len; i++) {

        if(walls[i].position.z == 0){

            if(walls[i].position.x > 0){
                // parede direita e esta a mover-se para a direita
                if(Math.abs(object.position.x - walls[i].position.x)-.5 <= radius && object.userData.vx > 0){
                    object.userData.valid = false;                    
                    var r = (walls[i].position.x > 0) ? radius : -radius;
                    point = [object.position.x + r, object.position.z];
                    return [walls[i], point];
                }

            }else{
                // parede esquerda e esta a mover-se para a esquerda
                if(Math.abs(object.position.x - walls[i].position.x)-.5 <= radius && object.userData.vx < 0){
                    object.userData.valid = false;                    
                    var r = (walls[i].position.x > 0) ? radius : -radius;
                    point = [object.position.x + r, object.position.z];
                    return [walls[i], point];
                }
            }
        }else{

            if(walls[i].position.z > 0){
                // parede baixo e esta a mover-se para baixo
                if(Math.abs(object.position.z - walls[i].position.z)-.5 <= radius && object.userData.vz > 0){
                    object.userData.valid = false;                    
                    var r = (walls[i].position.z > 0) ? radius : -radius;        
                    point = [object.position.x, object.position.z + r];
                    return [walls[i], point];
                }

            }else{

                // parede cima e esta a mover-se para cima
                if(Math.abs(object.position.z - walls[i].position.z)-.5 <= radius && object.userData.vz < 0){
                    object.userData.valid = false;                    
                    var r = (walls[i].position.z > 0) ? radius : -radius;        
                    point = [object.position.x, object.position.z + r];
                    return [walls[i], point];
                }

            }


        }
    }
    


    // ### versao com contador lastHit

    // // encontra o indice do objeto
    // var index = -1;
    // for (var i = 0, len = balls.length; i < len; i++) {
    //     x = object.position.x - balls[i].position.x;
    //     z = object.position.z - balls[i].position.z;

    //     if(x==0 && z==0)
    //         index = i;
    // }

    // // verifica todas bolas
    // for (var i = 0, len = balls.length; i < len; i++) {

    //     x = object.position.x - balls[i].position.x;
    //     z = object.position.z - balls[i].position.z;

    //     if(x!=0 && z!=0){
    //         if(Math.pow(2*radius,2) >= Math.pow(x,2) + Math.pow(z,2) && i != object.userData.lastHit){
    //             object.userData.lastHit = i;
    //             balls[i].userData.lastHit = index;

    //             point = [x/2, z/2];
    //             return [balls[i], point];
    //         }
    //     }
    // }
    
    // if(!object.userData.valid){
        // var cont1 = 0;
    // }







    if(object.userData.valid){

        // verifica todas bolas
        for (var i = 0, len = balls.length; i < len; i++) {

            x = object.position.x - balls[i].position.x;
            z = object.position.z - balls[i].position.z;

            var vx = object.userData.vx;
            var vz = object.userData.vz;

            if(x!=0 && z!=0){
                // if((Math.sign(vx) != Math.sign(x) && Math.sign(vz) != Math.sign(z)) || (Math.sign(vx) != Math.sign(x) && (Math.sign(z) == 0)) || (Math.sign(vz) != Math.sign(z) && (Math.sign(x) == 0))){
                    if(Math.pow(2*radius,2) >= Math.pow(x,2) + Math.pow(z,2)){
                        object.userData.valid = false;
                        balls[i].userData.valid = false;

                        point = [x/2, z/2];
                        return [balls[i], point];
                    }
                // }
            }
        }
    }else{


    // if(!object.userData.valid){
        var cont1 = 0;
        for (var i = 0, len = balls.length; i < len; i++) {
            x = object.position.x - balls[i].position.x;
            z = object.position.z - balls[i].position.z;

            if(x!=0 && z!=0){
                if(Math.pow(2*radius,2) < Math.pow(x,2) + Math.pow(z,2)){
                    cont1++;
                }
            }
        }

        var cont2 = 0;
        for (var i = 0, len = walls.length; i < len; i++) {
            if((Math.abs(object.position.z - walls[i].position.z)-.5 > radius) && (Math.abs(object.position.x - walls[i].position.x)-.5 > radius)){
                cont2++;
            }
        }

        console.log(cont1, balls.length, cont2, walls.length);
        if(cont1 == balls.length-1 && cont2 == walls.length)
            object.userData.valid = true;
        
    }


    return false;
}

// calcula novas coordenadas validas para os objetos
function processCollision1(obj1, obj2, point){
    // dados do objeto 1
    var vxOld1 = obj1.userData.vx;
    var vzOld1 = obj1.userData.vz;
    var m1 = obj1.userData.m;
    var xOld1 = obj1.position.x;
    var zOld1 = obj1.position.z;

    // dados do objeto 2
    var vxOld2 = obj2.userData.vx;
    var vzOld2 = obj2.userData.vz;
    var m2 = obj2.userData.m;
    // var xOld2 = obj2.position.x;
    // var zOld2 = obj2.position.z;

    // console.log(vxOld1, vzOld1, m1, xOld1, zOld1);
    // console.log(vxOld2, vzOld2, m2, xOld2, zOld2);

    var xOld2 = point[0];
    var zOld2 = point[1];


    // calculamos tudo o que nao e vetorial
    var escalar1 = (2 * m2) / (m1 + m2) / (Math.pow(xOld1 - xOld2, 2) + Math.pow(zOld1 - zOld2, 2)) * ((vxOld1 - vxOld2)*(xOld1 - xOld2) - (vzOld1 - vzOld2)*(zOld1 - zOld2));
    obj1.userData.vx = vxOld1 - escalar1 * (xOld1 - xOld2);
    obj1.userData.vz = vzOld1 - escalar1 * (zOld1 - zOld2);

    console.log(xOld2, zOld2);

    xOld1 = point[0];
    zOld1 = point[1];
    xOld2 = obj2.position.x;
    zOld2 = obj2.position.z;

    var escalar2 = (2 * m1) / (m1 + m2) / (Math.pow(xOld2 - xOld1, 2) + Math.pow(zOld2 - zOld1, 2)) * ((vxOld2 - vxOld1)*(xOld2 - xOld1) - (vzOld2 - vzOld1)*(zOld2 - zOld1));
    obj2.userData.vx = vxOld2 - escalar2 * (xOld2 - xOld1);
    obj2.userData.vz = vzOld2 - escalar2 * (zOld2 - zOld1);
}


// calcula novas coordenadas validas para os objetos
function processCollision2(obj1, obj2, point){
    // nota: funcoes sin, cos, tan utilizam radianos
    // dados do objeto 1
    var m1 = obj1.userData.m;
    var v1_old = Math.sqrt(Math.pow(obj1.userData.vx, 2) + Math.pow(obj1.userData.vz, 2));
    var teta1 = Math.atan(obj1.userData.vz / obj1.userData.vx);  // se calhar por vz negativo?
    teta1 += (obj1.userData.vx < 0) ? Math.PI : 0;

    // dados do objeto 2
    var m2 = obj2.userData.m;
    var v2_old = Math.sqrt(Math.pow(obj2.userData.vx, 2) + Math.pow(obj2.userData.vz, 2));
    var teta2 = (obj2.userData.vx != 0) ? Math.atan(obj2.userData.vz / obj2.userData.vx) : 0;
    teta2 += (obj2.userData.vx < 0) ? Math.PI : 2*Math.PI;

    var ang = Math.abs(teta1 - teta2);
    var phi = (ang > Math.PI) ? 2 * Math.PI - ang : ang;


    // console.log(obj2.userData.vx, Math.pow(obj2.userData.vx, 2), Math.sqrt(Math.pow(obj2.userData.vx, 2) + Math.pow(obj2.userData.vz, 2)));

    // caso em que nao e uma parede
    if (v2_old != 0){
        // teta 1,1 2,2 or 2,1 1,2 ?
        obj1.userData.vx = (v1_old * Math.cos(teta2-phi) * (m1-m2) + (2*m2*v2_old*Math.cos(teta2-phi))) * Math.cos(phi) / (m1+m2) + (v1_old * Math.sin(teta1-phi) * Math.sin(phi));
        obj1.userData.vz = (v1_old * Math.cos(teta1-phi) * (m1-m2) + (2*m2*v2_old*Math.cos(teta2-phi))) * Math.sin(phi) / (m1+m2) + (v1_old * Math.sin(teta1-phi) * Math.cos(phi));

        obj2.userData.vx = (v2_old * Math.cos(teta1-phi) * (m2-m1) + (2*m1*v1_old*Math.cos(teta1-phi))) * Math.cos(phi) / (m1+m2) + (v2_old * Math.sin(teta2-phi) * Math.sin(phi));
        obj2.userData.vz = (v2_old * Math.cos(teta2-phi) * (m2-m1) + (2*m1*v1_old*Math.cos(teta1-phi))) * Math.sin(phi) / (m1+m2) + (v2_old * Math.sin(teta2-phi) * Math.cos(phi));
    }else{
        if(obj2.position.x == 0){
            obj1.userData.vz = -obj1.userData.vz;
        }else{
            obj1.userData.vx = -obj1.userData.vx;
        }
    }

    // console.log("m", m1, "v", v1_old, "teta", teta1);
    // console.log("m", m2, "v", v2_old, "teta", teta2);
    // console.log("phi", phi);
    console.log("vx", obj1.userData.vx, "vz", obj1.userData.vz);
}