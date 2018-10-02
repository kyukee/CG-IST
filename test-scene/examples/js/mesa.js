var camera, scene, renderer, control, orbit;
var material, geometry, mesh;

var chairTop;

//**********************************************************************************************
//************************************ add your object here ************************************
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

    geometry = new THREE.CubeGeometry(20, 1.5, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function addChairTop(obj, x, y, z) {
	'use strict'

	chairTop = new THREE.Object3D();

	addChairHeadSupport(chairTop, 0, 8.5, -8.5);
    addChairBackSupport(chairTop, 0, -1.5, -8.5);
 	addChairSeat(chairTop, 0, -10, 0);

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

	var geometry = new THREE.CylinderGeometry(1, 1, 1, 12);

	//help distinguish legs components
	material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

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
	material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});

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
		material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

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
