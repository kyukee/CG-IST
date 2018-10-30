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
	createPlane(0,37,0);
	

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
