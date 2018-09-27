var camera, scene, renderer, control, orbit;
var material, geometry, mesh;

//**********************************************************************************************
//************************************ add your object here ************************************

function addChairHeadSupport(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(10, 4, 4);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);    
}

function addChairBackSupport(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(20, 16, 4);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairSeat(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(20, 1.5, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function addChairTube(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(1.5, 1.5, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLegWheel(obj, x, y, z, rotate) {
    'use strict'

    geometry = new THREE.TorusGeometry(1, 0.5, 3, 12);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);    
}

function addChairLegs(obj, x, y, z) {
    'use strict';

    var chairLeg, rotate;

    for(var i = 0; i < 3; i++) {
        rotate = i * 20;
        chairLeg = new THREE.Object3D();

        addChairLegWheel(chairLeg, x - 9, y - 2, z, rotate);
        addChairLegWheel(chairLeg, x + 9, y - 2, z, rotate);

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

    var chair = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});

    addChairHeadSupport(chair, 0, 8, -7);
    addChairBackSupport(chair, 0, -2, -8);
    addChairSeat(chair, 0, -10, 0);
    addChairTube(chair, 0, -14, 0);
    addChairLegs(chair, 0, -20, 0);

    chair.scale.set(1.6, 1.6, 1.6);

    scene.add(chair);
    control.attach(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
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
	createChair(0,37,0);
	

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
