let scene, renderer, camera
let cube,
    plane
let selectedNumbers
let meshList=[]
// 初始化場景、渲染器、相機、物體
function
init() {
    // 建立場景
    scene = new THREE.Scene();
    // const axes = new THREE.AxesHelper();
    // scene.add(axes);
    // 建立渲染器
    renderer = new THREE.WebGLRenderer()
    renderer
        .setSize(window.innerWidth,
            window.innerHeight) // 場景大小
    renderer.setClearColor(0xeeeeee,
            1.0) // 預設背景顏色
    renderer.shadowMap.enable =
        true // 陰影效果

    // 將渲染器的 DOM 綁到網頁上
    document.body.appendChild(renderer.domElement)

    // 建立相機
    camera = new THREE.PerspectiveCamera(
        70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 9, 0);
    camera.lookAt(scene.position)

    // 建立光源
    // let ambientLight = new THREE.PointLight(0xffffff);
    // scene.add(ambientLight)
    let PointLight=new THREE.PointLight(0xffffff,0.7,200);
    // PointLight.color.set(255,255,255 ); 
    PointLight.position.set(0,25,0);
    scene.add(PointLight);

    // 建立物體

        for (var i = -2; i < 3; i++) {
            for (var j = -2; j < 3; j++) {
                const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
                    // const geometry = new THREE.PlaneGeometry(1, 1, 1);
                const material =
                    new THREE.MeshPhongMaterial({ color: 0x0000ff }) // 材質
                cube = new THREE
                    .Mesh(geometry, material) // 建立網格物件
                cube.position.set(i * 2, 0, j * 2);
                // plane = new THREE.Mesh(geometry, material);
                // plane.position.set(i * 1.3, j * 1.3, 0);
                cube.name = "box"+","+ i.toString() + ',' + j.toString();

                scene.add(cube);
            }
        }
        /// 數字
        selectedNumbers=[];
        function generateRandom() {
            var min = 1;
            var max = 25;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            return random;
        };
        function generateNextRandom() {
            if (selectedNumbers.length > 24) {
                alert("All numbers Exhausted");
                return 0;
            }
            var random = generateRandom();
            while (selectedNumbers.includes(random)) {
                random = generateRandom();
            }
            selectedNumbers.push(random);
            return random;
        }
        var loader = new THREE.FontLoader();
        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
            for (var i = -2; i < 3; i++) {
                for (var j = -2; j < 3; j++) {
                    var textMaterial = new THREE.MeshPhongMaterial( 
                        { color: 0xffffff }
                        );
                    var number = generateNextRandom().toString();
                    if(number.length<2){
                        number="0"+number.toString();
                    }
                    var textGeometry = new THREE.TextGeometry( number , {
            
                        font: font,
            
                        size: 0.5,
                        height: 0.000001,
                    });
                    var mesh = new THREE.Mesh( textGeometry, textMaterial );
                    mesh.position.set((i * 2)-0.4 , 0.6, (j * 2)+0.2);
                    mesh.rotation.x=Math.PI/2;
                    mesh.rotation.y=Math.PI;
                    mesh.rotation.z=Math.PI;
                    mesh.name = i.toString()+","+j.toString();
                    meshList.push(mesh.name);
                    scene.add( mesh );
                }
            }
        }); 
        /// 數字
        geometry = new THREE.PlaneGeometry(10, 10, 10);
        material = new THREE.MeshPhongMaterial({ color: 0x000000 });
        // plane1 = new THREE.Mesh(geometry, material);
        // plane1.position.set(0, -0.5, 0);
        plane2 = new THREE.Mesh(geometry, material);
        plane2.position.set(0, 0, 0);
        // scene.add(plane1);
        scene.add(plane2);
        // plane1.rotation.x += Math.PI / 2;
        plane2.rotation.x += -Math.PI / 2;
    

    // 控制滑鼠旋轉
    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.minAzimuthAngle = Math.PI;
    // controls.maxAzimuthAngle = Math.PI;
}

// 建立動畫
function animate(object) {
    // cube.rotation.x += 0.02;
    // cube.rotation.y += 0.02;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var count = 2;

var selected = [];

function find(list) {
    if (list in selected) {
        return selected.findIndex(list);
    }
}

function onMouseDown(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    var firstIntersectedObject;
    if (intersects.length > 0) {
        firstIntersectedObject = intersects[0];
        // this will give you the first intersected Object if there are multiple.
    }
    if (count % 2 == 0) {
        if (firstIntersectedObject.object.name.split(",")[0]=="box" ) {
            firstIntersectedObject.object.material.color.set(0xff0000);
            var arr=firstIntersectedObject.object.name.split(",");
            var obj=scene.getObjectByName(arr[1].toString()+","+arr[2].toString());
            firstIntersectedObject.object.position.y=-0.3;
            obj.position.y=0.3;
            obj.material.color.set(0x00ff00);
            selected.push(firstIntersectedObject.object.name.split(","));
        }
    } else {
        if (firstIntersectedObject.object.name.split(",")[0]=="box") {
            firstIntersectedObject.object.material.color.set(0x0000ff);
            var arr=firstIntersectedObject.object.name.split(",");
            var obj=scene.getObjectByName(arr[1].toString()+","+arr[2].toString());
            firstIntersectedObject.object.position.y=0;
            obj.position.y=0.6;
            obj.material.color.set(0xffffff);
            delete selected[find(firstIntersectedObject.object.name.split(","))];
        }
    }
    // console.log(selected);
    count++;


    /// 連線

    /// 連線

    renderer.render(scene, camera);
}

// 渲染場景
function render() {
    // animate();
    requestAnimationFrame(render);
    renderer.render(scene, camera)
}

// 監聽螢幕寬高來做簡單 RWD 設定
window.addEventListener(
    'resize',
    function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

init();
render()

// window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('touchend', onMouseDown, false);
window.requestAnimationFrame(render);
// window.addEventListener('mouseup', onMouseUp, false);
// window.requestAnimationFrame(render);