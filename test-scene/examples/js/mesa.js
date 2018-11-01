var camera, scene, renderer, control, orbit;
var material, geometry, mesh;

var chairTop;

//**********************************************************************************************
//************************************ add your object here ************************************

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
    var plane = new THREE.Object3D();

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

    plane.scale.set(10, 10, 10);

    scene.add(plane);
    control.attach(plane);

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;
}

//************************************ add your object here ************************************
//************************* remember to use control.attach( object ) ***************************

init();
render();

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 100, 100, 100 );
	camera.lookAt( 0, 200, 0 );

	scene = new THREE.Scene();
	scene.add( new THREE.GridHelper( 1000, 10 ) );
	scene.add(new THREE.AxisHelper(100));

	var light = new THREE.AmbientLight( 0x404040 , 4);
	light.position.set( 1, 1, 1 );		
	scene.add( light );
	
	orbit = new THREE.OrbitControls(camera, renderer.domElement);
	orbit.update();
	orbit.addEventListener( 'change', render );

	control = new THREE.TransformControls( camera, renderer.domElement );
	control.addEventListener( 'change', render );

	control.addEventListener( 'dragging-changed', function ( event ) {
		orbit.enabled = !event.value;
	} );

//*********************************** create your object here ***********************************
	createPlane(0,30,0);
	

	scene.add( control );

	window.addEventListener( 'resize', onWindowResize, false );

	window.addEventListener( 'keydown', function ( event ) {

		switch ( event.keyCode ) {

			case 81: // Q
				control.setSpace( control.space === "local" ? "world" : "local" );
				break;

			case 17: // Ctrl
				control.setTranslationSnap( 100 );
				control.setRotationSnap( THREE.Math.degToRad( 15 ) );
				break;

			case 87: // W
				control.setMode( "translate" );
				break;

			case 69: // E
				control.setMode( "rotate" );
				break;

			case 82: // R
				control.setMode( "scale" );
				break;

			case 187:
			case 107: // +, =, num+
				control.setSize( control.size + 0.1 );
				break;

			case 189:
			case 109: // -, _, num-
				control.setSize( Math.max( control.size - 0.1, 0.1 ) );
				break;

			case 88: // X
				control.showX = !control.showX;
				break;

			case 89: // Y
				control.showY = !control.showY;
				break;

			case 90: // Z
				control.showZ = !control.showZ;
				break;

			case 32: // Spacebar
				control.enabled = !control.enabled;
				break;

		}

	});

	window.addEventListener( 'keyup', function ( event ) {

		switch ( event.keyCode ) {

			case 17: // Ctrl
				control.setTranslationSnap( null );
				control.setRotationSnap( null );
				break;
		}

	});

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function render() {

	renderer.render( scene, camera );

}
