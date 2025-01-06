// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Text geometry
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/fonts/helvetiker_bold.typeface.json', function(font) {
    const hrcGeometry = new THREE.TextGeometry('HRC', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const artGeometry = new THREE.TextGeometry('ART', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    // Materials
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x050505,
        shininess: 100
    });

    // Create meshes
    const hrcMesh = new THREE.Mesh(hrcGeometry, textMaterial);
    const artMesh = new THREE.Mesh(artGeometry, textMaterial);

    // Center the text
    hrcGeometry.computeBoundingBox();
    artGeometry.computeBoundingBox();
    
    const hrcOffset = hrcGeometry.boundingBox.getCenter(new THREE.Vector3());
    const artOffset = artGeometry.boundingBox.getCenter(new THREE.Vector3());
    
    hrcMesh.position.x = -hrcOffset.x;
    artMesh.position.x = -artOffset.x;

    // Position text
    hrcMesh.position.z = -2;
    artMesh.position.z = 2;

    // Create groups for rotation
    const textGroup = new THREE.Group();
    textGroup.add(hrcMesh);
    textGroup.add(artMesh);
    scene.add(textGroup);

    // Add sphere
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

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Camera position
    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        textGroup.rotation.y += 0.01;
        sphere.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    animate();
});

// Handle window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
