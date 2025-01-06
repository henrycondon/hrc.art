// Debug logging
const debug = document.getElementById('debug');
function log(msg) {
    debug.innerHTML += msg + '<br>';
    console.log(msg);
}

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Load font and create text
const loader = new THREE.FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function(font) {
    log('Font loaded successfully');

    // Create text geometries
    const textOptions = {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    };

    const hrcGeometry = new THREE.TextGeometry('HRC', textOptions);
    const artGeometry = new THREE.TextGeometry('ART', textOptions);

    // Material with environment mapping for extra shine
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x444444,
        shininess: 100,
    });

    const hrcMesh = new THREE.Mesh(hrcGeometry, textMaterial);
    const artMesh = new THREE.Mesh(artGeometry, textMaterial);

    // Center the texts
    hrcGeometry.computeBoundingBox();
    artGeometry.computeBoundingBox();

    hrcMesh.position.x = -hrcGeometry.boundingBox.max.x / 2;
    artMesh.position.x = -artGeometry.boundingBox.max.x / 2;

    // Position texts
    hrcMesh.position.z = -2;
    artMesh.position.z = 2;

    // Create rotation group
    const textGroup = new THREE.Group();
    textGroup.add(hrcMesh);
    textGroup.add(artMesh);
    scene.add(textGroup);

    // Add central sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x555555,
        shininess: 30
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x8888ff, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Position camera
    camera.position.z = 7;

    log('Scene setup complete');

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        textGroup.rotation.y += 0.005;
        sphere.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
    log('Animation started');
});

// Handle window resizing
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
