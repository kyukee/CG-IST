var camera, scene, renderer, control, orbit;
var material, geometry, mesh;

//**********************************************************************************************
//************************************ add your object here ************************************
function addLampBase(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(8, 8, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 1, z);
    obj.add(mesh);
}

function addLampPole(obj, x, y, z) {
    'use strict';

    // radiusTop, rdiusBottom, height, radialSegments
    geometry = new THREE.CylinderGeometry(1, 1, 70, 12);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
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
    mesh.rotation.z = Math.PI / 8 * -Math.sign(x) ;
    
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
    addLampBase(lamp, 0, -35, 0);
	addLampCover(lamp, 0, 35, 0);
	addLampFrame(lamp, 0, 30, 0);
	addLampLightbulb(lamp, 0, 35, 0);

    scene.add(lamp);
    control.attach( lamp );
    
    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
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
	createLamp(0,37,0);
	

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
