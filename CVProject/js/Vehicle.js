class Vehicle extends THREE.Group {
    constructor(scene, counter) {
      super();
      this.scene = scene;
      this.counter = counter;

      this.init(); 
    }
  
    init() {
      // Load model     
      this.trigger();
      this.scene.add( this );
    }
  
    animate() {
        this.renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    kill(object){
        const scene = this.scene;
        scene.remove( object );
        animate();
    }
  
    trigger() {
      let loader = new THREE.GLTFLoader();    
      switch(this.counter){
        case 0:            
            loader.load('\\models\\02\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(500,500,500);
                car.position.set(0,-4700,3000);           
                scene.add(gltf.scene);
                animate();
            });
            break;
        case 1:
            loader.load('\\models\\01\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(10,10,10);
                car.position.set(0,-4700,3000);           
                scene.add(gltf.scene);
                animate();
            });
            break;
        case 2:
            loader.load('\\models\\03\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(100,100,100);
                car.position.set(0,-4700,4000);
                car.rotation.z = 90/180*Math.PI;           
                scene.add(gltf.scene);
                animate();
            });
            break;
        case 3:
            loader.load('\\models\\04\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(2000,2000,2000);
                car.position.set(0,-4700,2000);           
                scene.add(gltf.scene);
                animate();
            });
            break;
        case 4:
            loader.load('\\models\\05\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(800,800,800);
                car.position.set(0,-3000,2000);
                car.rotation.z = 90/180*Math.PI;            
                scene.add(gltf.scene);
                animate();
            });
            break;
        case 5:
            loader.load('\\models\\06\\out.glb',function(gltf){
                let car = gltf.scene.children[0]
                car.scale.set(8,8,8);
                car.position.set(0,-4700,2000);           
                scene.add(gltf.scene);
                animate();
            });
            break;
        default:
            loader.load('\\models\\02\\out.glb',function(gltf){
                car = gltf.scene.children[0]
                car.scale.set(500,500,500);
                car.position.set(0,-4700,3000);           
                scene.add(gltf.scene);
                animate();
            });
            break;
      }
    }
  }