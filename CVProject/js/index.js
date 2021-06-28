(function(){
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);
        const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,50000);
        // camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
        // camera.position.set(-900,-200,-900);
        camera.rotation.y = 45/180*Math.PI;
        camera.position.set(-900,-500,-900);

        hlight = new THREE.AmbientLight(0x404040,10);
        scene.add(hlight);

        directionalLight = new THREE.DirectionalLight(0xffffff,100);
        directionalLight.position.set(0,1,20);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        
        // light = new THREE.PointLight(0xc4c4c4,10);
        // light.position.set(0,300,500);
        // scene.add(light);

        // light2 = new THREE.PointLight(0xc4c4c4,10);
        // light2.position.set(500,100,0);
        // scene.add(light2);

        // light3 = new THREE.PointLight(0xc4c4c4,10);
        // light3.position.set(0,100,-500);
        // scene.add(light3);

        // light4 = new THREE.PointLight(0xc4c4c4,10);
        // light4.position.set(-500,300,0);
        // scene.add(light4);

        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        let counter_V = 0;
        // Vehicle
        var vehicle = new Vehicle(scene, counter_V);
        scene.add(vehicle);

        let controls = new THREE.OrbitControls(camera);
        controls.addEventListener('change', renderer);
        // controls.minDistance = 500;
        // controls.maxDistance = 1500;
        
        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_bk.jpg');
        let texture_up = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_up.jpg');
        let texture_dn = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load( '\\skyboxes\\penguins (2)\\arid2_lf.jpg');
          
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
        
        for (let i = 0; i < 6; i++)
           materialArray[i].side = THREE.BackSide;
        let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
        let skybox = new THREE.Mesh( skyboxGeo, materialArray );
        scene.add( skybox );

        window.addEventListener( 'resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        });

        const animateBtn = document.getElementById( 'animate' );
        animateBtn.addEventListener( 'click', function() {
            vehicle.kill();
            if(counter_V<5){
                counter_V++;
            }else{
                counter_V = 0;
            }
            var vehicle = new Vehicle(scene, counter_V);
            scene.add(vehicle);
        });
      
        // // js/index.js
        // const resetBtn = document.getElementById( 'reset' );
        // resetBtn.addEventListener( 'click', function() {
        //     vehicle.kill();
        //     if(counter_V > 0){
        //         counter_V--;
        //     }else{
        //         counter_V = 5;
        //     }
        //     var vehicle = new Vehicle(scene, counter_V);
        //     scene.add(vehicle);
        // });
      
        animate();
        function animate() {
          renderer.render(scene,camera);
          requestAnimationFrame(animate);
        } 
}
)();