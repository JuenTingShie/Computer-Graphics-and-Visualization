var container, stats
var scene, camera, renderer, controls;
var vertex;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 500, theta = 0;
var frustumSize = 300;

var targetList = [],b;

var counter = 0;

var remainingTime= 60000 // 1 min


init();
animate();

this.scene = scene;///////////////////////////////////////////////////

function init() {
    // Prepare stage scene
        scene = new THREE.Scene();

        scene.background = new THREE.Color( 0x000000 );

        this.scene.add( this );///////////////////////////////////////
        this.explosions = [];////////////////////////////////////////


    // Add camera
        camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.set(0,0,0);

        scene.add( camera );
        camera.lookAt( scene.position );

    // Set up stage light

        var xx = 150;      
        var pointLight1 = new THREE.PointLight( 0xffffff );
        var pointLight2 = new THREE.PointLight( 0xffffff );

        pointLight1.position.set( xx/2, xx/2, xx/2 );
        pointLight2.position.set( -xx/2, -xx/2, -xx/2 );

        scene.add( pointLight1, pointLight2 ); 
        scene.add( new THREE.AmbientLight( 0x222222 ) );

    // Add actors of this scene
        var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
        // var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );


        for ( var i = 0; i < 500; i++ ){

            var material = new THREE.MeshLambertMaterial( { color: 0xffffff } ); 
            var cubes = new THREE.Mesh( geometry, material );

            cubes.position.x = Math.random() * xx - xx/2;
            cubes.position.y = Math.random() * xx - xx/2;
            cubes.position.z = Math.random() * xx - xx/2;

            cubes.rotation.x = Math.random() * 2 * Math.PI;
            cubes.rotation.y = Math.random() * 2 * Math.PI;
            cubes.rotation.z = Math.random() * 2 * Math.PI;
            
            cubes.scale.x = cubes.scale.y = cubes.scale.z = Math.random() * 3 + 0.5;

            targetList.push( cubes );
            scene.add( cubes );         
        }
       
        
        
    // Set up renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xeeeeee, 1.0 );
        document.body.appendChild( renderer.domElement );

    // Controls
        controls = new THREE.OrbitControls ( camera, renderer.domElement );

        controls.minDistance = 0.1;
        controls.maxDistance = 1000;
        controls.maxPolarAngle = Math.PI;
        // controls.maxPolarAngle = Math.PI / 2;
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.25;

    // Axes helper
        var axes = new THREE.AxesHelper( 20 );
        // scene.add( axes );

    // Timer        
        prevTime = new Date();
        const remainingTimeDOM = remainingTime / 1000;
        document.getElementById('remainingTime').innerHTML = remainingTimeDOM; 
}

function timer(){
    if ( parseInt( remainingTime / 1000) > 0 ){
        remainingTime -= new Date() - prevTime;
        remainingTimeDOM = parseInt( remainingTime / 1000 );

        document.getElementById('remainingTime').innerHTML = "0:" + remainingTimeDOM;       
        
        prevTime = new Date();
    }
    
    // else {
    //     handleEndGame()
    // }

    // controls.update(Date.now() - prevTime);
    // prevTime = Date.now();

    // function handleEndGame() {
    //     localStorage.setItem('NEW_GAME_RESULT', JSON.stringify(scoreDOM))
    //     window.location.replace('./result.html')
    // }
}


        
function cubeMove(){

    for ( var i = 0; i < targetList.length; i ++ ){   
        var cube = targetList[i]; 
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;

        // cube.position.z += 0.5;
    }


}

function cameraMove(){

    camera.position.z += 0.1;

}

function explosionAnimate() {//////////////////////////////////////////////////
    if( !this.isExposed ) return;/////////////
    for( let i=0; i < this.explosions.length; i++ ) { //////////////////////////
    this.explosions[i].update();
    }
    }




function animate() {
    // boxAnimate();
    
    requestAnimationFrame( animate );
    render();

    cubeMove();
    cameraMove();       
    update();  
    explosionAnimate();//////////////////////////////////////////////

    timer();
}

function update(){
    controls.update();
}

function render() {
    renderer.render( scene, camera );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );
}


function highLight(){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( targetList );
    
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.material.color.set( 0xffffff );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.material.color.set( 0xff0000 );
        }
    } 
    else {
        if ( INTERSECTED ) INTERSECTED.material.color.set( 0xffffff );
        INTERSECTED = null;
    }  
 /////////////// this.explosions.length = 0;  //碰到high直接停止
 
}


function removeObj(){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( targetList ); ///滑鼠去找方塊交集
    
    var delList = []
    
     if ( intersects.length > 0 ) {
        for( let i=0; i < this.explosions.length; i++ ) {///////////////////////////
            this.explosions[i].destroy();////////////////////////////////
            }/////////////////////////////////////////////////////////
            this.explosions.length = 0;///////////////////////////////////
            this.isExposed = false;///////////////////////////////////////////

        var del = scene.remove(intersects[ 0 ].object); 
         delList.push(del);


var cenOfEX=intersects[ 0 ].object.position;//////////////////////////////////////////////////////////
this.explosions[0] = new Explosion( cenOfEX.x  ,cenOfEX.y , cenOfEX.z, 0x000000, scene );//////////////
this.explosions[1] = new Explosion( cenOfEX.x+5, cenOfEX.y+5, cenOfEX.z+5, 0x333333, scene );//////////
this.explosions[2] = new Explosion( cenOfEX.x-5, cenOfEX.y+5, cenOfEX.z+10, 0x666666, scene );///////////
this.explosions[3] = new Explosion( cenOfEX.x-5, cenOfEX.y+5, cenOfEX.z+5, 0x999999, scene );//////////
this.explosions[4] = new Explosion( cenOfEX.x+5, cenOfEX.y+5, cenOfEX.z-5, 0xcccccc, scene );/////////////
this.isExposed = true;//////////////////////////////////////////////////////////////////////////////////////


////

        
    } 
    for ( var i = 0; i < intersects.length ; i++ ) {
        var del = scene.remove(intersects[ 0 ].object); 
        delList.push(del);
    }

    counter = counter + delList.length;

    console.log(counter);
    console.log(delList);


    score();

    function score(){
        var scoreDOM = counter * 10;
        document.getElementById("score").innerHTML = scoreDOM;
    }  
}

function onDocumentMouseMove( event ) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    highLight();
}

function onDocumentMouseDown( event ) {
	console.log("Click.");    
    event.preventDefault();
    
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    removeObj();
}

function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;
    camera.left = - frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = - frustumSize / 2;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
