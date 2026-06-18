/* ===========================================================
   AL FATH — INTERACTIVE SITE EXPLORER
   Three.js drone-view siteplan + cinematic unit viewer
=========================================================== */

(function(){

/* ---------------- DATA: clusters & units ---------------- */
// Positions are normalized to the siteplan image plane (x: -1..1 left-right, z: -1..1 top-bottom)
// Approximated from visual reading of SITEPLAN_ALFIH_REV_04C
const CLUSTERS = [
  { id:'c19', name:'Cluster Utara', type:'TYPE 38', size:'5×14 m', units:19, x:0.10, z:-0.60, color:0xc9a961 },
  { id:'c18', name:'Cluster Timur Laut', type:'TYPE 38', size:'5×14 m', units:18, x:0.32, z:-0.30, color:0xc9a961 },
  { id:'c9a', name:'Cluster Timur', type:'TYPE 38', size:'5×14 m', units:9, x:0.42, z:-0.05, color:0xc9a961 },
  { id:'c40-9', name:'Cluster Barat Laut', type:'TYPE 40', size:'6×13 m', units:9, x:-0.40, z:-0.55, color:0x8fa68e },
  { id:'c40-12', name:'Cluster Barat', type:'TYPE 40', size:'6×14 m', units:12, x:-0.42, z:-0.05, color:0x8fa68e },
  { id:'c10', name:'Cluster Barat Daya', type:'TYPE 38', size:'5×14 m', units:10, x:-0.28, z:0.32, color:0xc9a961 },
  { id:'c7', name:'Cluster Tenggara', type:'TYPE 38', size:'5×14 m', units:7, x:0.36, z:0.22, color:0xc9a961 },
  { id:'c3a', name:'Cluster Timur Kecil A', type:'TYPE 38', size:'5×14 m', units:3, x:0.49, z:0.15, color:0xc9a961 },
  { id:'c3b', name:'Cluster Timur Kecil B', type:'TYPE 38', size:'5×14 m', units:3, x:0.44, z:0.34, color:0xc9a961 },
  { id:'c3c', name:'Cluster Selatan Kecil', type:'TYPE 38', size:'5×14 m', units:3, x:0.08, z:0.48, color:0xc9a961 },
  { id:'fasum', name:'Fasum / Clubhouse', type:'FASILITAS', size:'Umum', units:1, x:-0.08, z:0.58, color:0x9b8bb0 },
  { id:'kostel', name:'Kostel', type:'KOSTEL', size:'3.2×12 m', units:6, x:0.10, z:0.72, color:0x9b8bb0 },
];

// Photo sets per "experience" — currently we have one full real photo set (Type 40 sample)
// All clusters route into this sample unit experience for now.
const UNIT_PHOTOSETS = {
  default: {
    typeTag:'TYPE 40 · 6×13',
    rooms:[
      { key:'carport', label:'Carport & Depan Unit', sub:'Akses masuk dan area parkir unit', img:'pano_carport.jpg', panorama:true },
      { key:'kawasan', label:'Lingkungan Kawasan', sub:'Suasana jalan & lanskap kompleks', img:'pano_kawasan.jpg', panorama:true },
      { key:'living', label:'Ruang Tamu & Dapur', sub:'Area sosial dengan konsep terbuka', img:'pano_living.jpg', panorama:true },
      { key:'bedroom', label:'Kamar Tidur', sub:'Pencahayaan alami & interior hangat', img:'pano_bedroom.jpg', panorama:true },
    ]
  }
};

let activeCluster = null;
let activeRoomIndex = 0;

/* ---------------- THREE.JS SETUP ---------------- */
let scene, camera, renderer, raycaster, mouse;
let groundMesh, hotspotGroup;
let isDragging = false, prevX = 0, prevY = 0;
let camTheta = 0.0, camPhi = 0.95, camRadius = 13;
let targetTheta = camTheta, targetPhi = camPhi, targetRadius = camRadius;
let camTarget = new THREE.Vector3(0,0,0);
let targetLook = camTarget.clone();
let autoRotate = true;
let inTransition = false;
let SITE_PLANE_W = 16, SITE_PLANE_H = 11.3; // updated once texture loads

const stageEl = document.getElementById('stage');

function initThree(){
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x08080b, 0.018);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 200);

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x08080b, 1);
  stageEl.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Lighting
  const ambient = new THREE.AmbientLight(0xfff4e0, 0.85);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffe8c0, 0.9);
  dirLight.position.set(8, 14, 6);
  scene.add(dirLight);
  const rim = new THREE.DirectionalLight(0xc9a961, 0.25);
  rim.position.set(-10, 6, -8);
  scene.add(rim);

  // Ground plane with siteplan texture
  const loader = new THREE.TextureLoader();
  loader.load('siteplan%20final.jpeg', function(tex){
    tex.colorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    const aspect = tex.image.width / tex.image.height;
    const planeW = 16;
    const planeH = planeW / aspect;
    SITE_PLANE_W = planeW;
    SITE_PLANE_H = planeH;
    const geo = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness:0.95, metalness:0 });
    groundMesh = new THREE.Mesh(geo, mat);
    groundMesh.rotation.x = -Math.PI/2;
    groundMesh.userData.planeW = planeW;
    groundMesh.userData.planeH = planeH;
    scene.add(groundMesh);

    // subtle ground shadow plane below
    const shadowGeo = new THREE.PlaneGeometry(planeW*1.4, planeH*1.4);
    const shadowMat = new THREE.MeshBasicMaterial({ color:0x000000, transparent:true, opacity:0.4 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI/2;
    shadowPlane.position.y = -0.05;
    scene.add(shadowPlane);

    buildHotspotMarkers(planeW, planeH);
    finishLoading();
  }, undefined, function(){
    finishLoading(); // proceed even if texture fails
  });

  // soft particles (atmosphere, consistent with site's cinematic theme)
  addParticles();

  window.addEventListener('resize', onResize);
  bindControls();
  animate();
}

function addParticles(){
  const count = 140;
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    positions[i*3] = (Math.random()-0.5)*24;
    positions[i*3+1] = Math.random()*7 + 0.2;
    positions[i*3+2] = (Math.random()-0.5)*24;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.PointsMaterial({ color:0xc9a961, size:0.02, transparent:true, opacity:0.35 });
  const points = new THREE.Points(geo, mat);
  points.userData.isParticles = true;
  scene.add(points);
}

/* ---------------- HOTSPOT MARKERS (3D positions -> projected to 2D DOM) ---------------- */
let hotspotMeshes = [];
const hotspotLayer = document.getElementById('hotspotLayer');
let domHotspots = [];

function buildHotspotMarkers(planeW, planeH){
  CLUSTERS.forEach(cluster => {
    const worldX = cluster.x * (planeW/2);
    const worldZ = cluster.z * (planeH/2);

    // small invisible marker for raycasting reference (not strictly needed since we use DOM)
    const dot = document.createElement('div');
    dot.className = 'hotspot';
    dot.innerHTML = `
      <div class="hotspot-ring"></div>
      <div class="hotspot-core"></div>
      <div class="hotspot-label">${cluster.name} <span class="count">· ${cluster.units} unit</span></div>
    `;
    hotspotLayer.appendChild(dot);
    dot.addEventListener('click', () => onHotspotClick(cluster));

    domHotspots.push({ el:dot, worldPos:new THREE.Vector3(worldX, 0.15, worldZ), cluster });
  });
}

function updateHotspotPositions(){
  domHotspots.forEach(h => {
    const pos = h.worldPos.clone();
    pos.project(camera);
    const x = (pos.x*0.5+0.5) * window.innerWidth;
    const y = (-pos.y*0.5+0.5) * window.innerHeight;
    const behind = pos.z > 1;
    h.el.style.left = x+'px';
    h.el.style.top = y+'px';
    h.el.style.display = behind ? 'none' : 'block';
  });
}

/* ---------------- CAMERA ORBIT CONTROLS ---------------- */
function bindControls(){
  const dom = renderer.domElement;

  dom.addEventListener('mousedown', e => {
    isDragging = true; autoRotate = false;
    prevX = e.clientX; prevY = e.clientY;
  });
  window.addEventListener('mousemove', e => {
    if(!isDragging || inTransition) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    targetTheta -= dx * 0.0045;
    targetPhi = Math.max(0.35, Math.min(1.3, targetPhi - dy * 0.0035));
    prevX = e.clientX; prevY = e.clientY;
  });
  window.addEventListener('mouseup', () => isDragging = false);

  dom.addEventListener('wheel', e => {
    if(inTransition) return;
    e.preventDefault();
    targetRadius = Math.max(4, Math.min(22, targetRadius + e.deltaY*0.012));
  }, { passive:false });

  // touch support
  let lastTouchDist = null;
  dom.addEventListener('touchstart', e => {
    autoRotate = false;
    if(e.touches.length===1){
      isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    } else if(e.touches.length===2){
      lastTouchDist = touchDist(e.touches);
    }
  }, {passive:true});
  dom.addEventListener('touchmove', e => {
    if(inTransition) return;
    if(e.touches.length===1 && isDragging){
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      targetTheta -= dx * 0.0045;
      targetPhi = Math.max(0.35, Math.min(1.3, targetPhi - dy * 0.0035));
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    } else if(e.touches.length===2){
      const d = touchDist(e.touches);
      if(lastTouchDist){
        targetRadius = Math.max(4, Math.min(22, targetRadius - (d-lastTouchDist)*0.02));
      }
      lastTouchDist = d;
    }
  }, {passive:true});
  dom.addEventListener('touchend', () => { isDragging=false; lastTouchDist=null; });

  function touchDist(touches){
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx*dx+dy*dy);
  }
}

function onResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ---------------- ANIMATE LOOP ---------------- */
const clock = new THREE.Clock();
let panoMode = false;

function animate(){
  requestAnimationFrame(animate);
  const dt = clock.getDelta();

  if(panoMode){
    animatePanoFrame();
    return;
  }

  if(autoRotate && !inTransition){
    targetTheta += dt*0.045;
  }

  camTheta += (targetTheta-camTheta)*0.07;
  camPhi += (targetPhi-camPhi)*0.07;
  camRadius += (targetRadius-camRadius)*0.07;
  camTarget.lerp(targetLook, 0.07);

  if(!inTransition){
    const x = camTarget.x + camRadius*Math.sin(camPhi)*Math.sin(camTheta);
    const y = camTarget.y + camRadius*Math.cos(camPhi);
    const z = camTarget.z + camRadius*Math.sin(camPhi)*Math.cos(camTheta);
    camera.position.set(x,y,z);
    camera.lookAt(camTarget);
  }

  scene.children.forEach(c => {
    if(c.userData && c.userData.isParticles){
      c.rotation.y += dt*0.01;
    }
  });

  updateHotspotPositions();
  renderer.render(scene, camera);
}

/* ---------------- LOADER ---------------- */
let loadProgress = 0;
const loaderPct = document.getElementById('loaderPct');
const loaderEl = document.getElementById('loader');

function tickFakeProgress(){
  if(loadProgress < 92){
    loadProgress += Math.random()*9;
    loaderPct.textContent = `Memuat kawasan… ${Math.min(99,Math.round(loadProgress))}%`;
    setTimeout(tickFakeProgress, 140);
  }
}
tickFakeProgress();

function finishLoading(){
  loadProgress = 100;
  loaderPct.textContent = 'Memuat kawasan… 100%';
  setTimeout(() => {
    loaderEl.classList.add('hidden');
    document.getElementById('sceneEyebrow').classList.add('show');
    document.getElementById('sceneTitle').classList.add('show');
  }, 380);
}

/* ---------------- HOTSPOT CLICK -> CAMERA SWOOP -> UNIT VIEWER ---------------- */
const unitPanel = document.getElementById('unitPanel');
const panelType = document.getElementById('panelType');
const panelName = document.getElementById('panelName');
const panelMeta = document.getElementById('panelMeta');
const panelEnterBtn = document.getElementById('panelEnterBtn');
const introCard = document.getElementById('introCard');

function onHotspotClick(cluster){
  activeCluster = cluster;
  autoRotate = false;
  introCard.style.display = 'none';

  // Swoop camera toward the cluster
  inTransition = true;
  const worldX = cluster.x * (SITE_PLANE_W/2);
  const worldZ = cluster.z * (SITE_PLANE_H/2);
  targetLook = new THREE.Vector3(worldX, 0, worldZ);

  animateCameraSwoop(worldX, worldZ, () => {
    inTransition = false;
    showUnitPanel(cluster);
  });
}

function animateCameraSwoop(worldX, worldZ, onDone){
  const startRadius = camRadius, startPhi = camPhi, startTheta = camTheta;
  const endRadius = 3.4, endPhi = 0.55;
  const duration = 1300;
  const t0 = performance.now();

  function step(){
    const now = performance.now();
    const t = Math.min(1, (now-t0)/duration);
    const ease = 1 - Math.pow(1-t, 3);

    camRadius = startRadius + (endRadius-startRadius)*ease;
    camPhi = startPhi + (endPhi-startPhi)*ease;
    camTarget.lerp(new THREE.Vector3(worldX,0,worldZ), 0.18);

    const x = camTarget.x + camRadius*Math.sin(camPhi)*Math.sin(camTheta);
    const y = camTarget.y + camRadius*Math.cos(camPhi);
    const z = camTarget.z + camRadius*Math.sin(camPhi)*Math.cos(camTheta);
    camera.position.set(x,y,z);
    camera.lookAt(camTarget);

    if(t<1){ requestAnimationFrame(step); }
    else { onDone(); }
  }
  step();
}

function showUnitPanel(cluster){
  panelType.textContent = cluster.type;
  panelName.textContent = cluster.name;
  panelMeta.textContent = `${cluster.units} unit tersedia · ${cluster.size}`;
  unitPanel.classList.add('show');
}

function hideUnitPanel(){
  unitPanel.classList.remove('show');
}

panelEnterBtn.addEventListener('click', () => {
  if(activeCluster) openUnitViewer(activeCluster);
});

/* ---------------- FULLSCREEN UNIT VIEWER ---------------- */
const unitViewer = document.getElementById('unitViewer');
const uvStage = document.getElementById('uvStage');
const uvClose = document.getElementById('uvClose');
const uvPrev = document.getElementById('uvPrev');
const uvNext = document.getElementById('uvNext');
const uvRoomLabel = document.getElementById('uvRoomLabel');
const uvRoomSub = document.getElementById('uvRoomSub');
const uvDots = document.getElementById('uvDots');
const uvUnitTag = document.getElementById('uvUnitTag');
const uvPlanBtn = document.getElementById('uvPlanBtn');
const uvContactBtn = document.getElementById('uvContactBtn');
const uvPanoHint = document.getElementById('uvPanoHint');
const uvPanoBadge = document.getElementById('uvPanoBadge');

let frameEls = [];

/* ---------------- 360 PANORAMA VIEWER (shares the single main renderer/canvas) ---------------- */
let panoScene, panoCamera, panoSphere;
let panoLon = 0, panoLat = 0;
let panoTargetLon = 0, panoTargetLat = 0;
let panoDragging = false, panoPrevX = 0, panoPrevY = 0;
let panoActive = false;
let panoTextureCache = {};
let panoHintTimeout = null;

function initPanoViewer(){
  panoScene = new THREE.Scene();
  panoCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const geo = new THREE.SphereGeometry(50, 60, 40);
  geo.scale(-1, 1, 1); // invert so texture renders on the inside
  const mat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  panoSphere = new THREE.Mesh(geo, mat);
  panoScene.add(panoSphere);

  bindPanoControls();
}

function enterPanoMode(){
  panoMode = true;
  panoActive = true;
  // move the single shared canvas into the unit viewer stage
  uvStage.insertBefore(renderer.domElement, uvPrev);
  renderer.domElement.classList.add('uv-pano-canvas-shared');
  resizePanoRenderer();
}

function exitPanoMode(){
  panoMode = false;
  panoActive = false;
  // move the shared canvas back to the main map stage
  renderer.domElement.classList.remove('uv-pano-canvas-shared');
  stageEl.appendChild(renderer.domElement);
  onResize();
}

function resizePanoRenderer(){
  const w = uvStage.clientWidth || window.innerWidth;
  const h = uvStage.clientHeight || window.innerHeight;
  renderer.setSize(w, h, false);
  panoCamera.aspect = w / h;
  panoCamera.updateProjectionMatrix();
}
window.addEventListener('resize', () => { if(panoActive) resizePanoRenderer(); });

function loadPanorama(url){
  if(panoTextureCache[url]){
    panoSphere.material.map = panoTextureCache[url];
    panoSphere.material.color.set(0xffffff);
    panoSphere.material.needsUpdate = true;
    return;
  }
  const loader = new THREE.TextureLoader();
  loader.load(url, function(tex){
    tex.colorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    tex.minFilter = THREE.LinearFilter;
    panoTextureCache[url] = tex;
    panoSphere.material.map = tex;
    panoSphere.material.color.set(0xffffff);
    panoSphere.material.needsUpdate = true;
  });
}

function bindPanoControls(){
  const dom = renderer.domElement;
  dom.addEventListener('mousedown', e => {
    if(!panoActive) return;
    panoDragging = true;
    panoPrevX = e.clientX; panoPrevY = e.clientY;
    hidePanoHint();
  });
  window.addEventListener('mousemove', e => {
    if(!panoDragging || !panoActive) return;
    const dx = e.clientX - panoPrevX;
    const dy = e.clientY - panoPrevY;
    panoTargetLon -= dx * 0.18;
    panoTargetLat = Math.max(-85, Math.min(85, panoTargetLat + dy * 0.18));
    panoPrevX = e.clientX; panoPrevY = e.clientY;
  });
  window.addEventListener('mouseup', () => panoDragging = false);

  dom.addEventListener('touchstart', e => {
    if(!panoActive) return;
    if(e.touches.length===1){
      panoDragging = true;
      panoPrevX = e.touches[0].clientX; panoPrevY = e.touches[0].clientY;
      hidePanoHint();
    }
  }, {passive:true});
  dom.addEventListener('touchmove', e => {
    if(!panoDragging || !panoActive || e.touches.length!==1) return;
    const dx = e.touches[0].clientX - panoPrevX;
    const dy = e.touches[0].clientY - panoPrevY;
    panoTargetLon -= dx * 0.18;
    panoTargetLat = Math.max(-85, Math.min(85, panoTargetLat + dy * 0.18));
    panoPrevX = e.touches[0].clientX; panoPrevY = e.touches[0].clientY;
  }, {passive:true});
  dom.addEventListener('touchend', () => { if(panoActive) panoDragging = false; });
}

function showPanoHint(){
  clearTimeout(panoHintTimeout);
  uvPanoHint.classList.add('show');
  panoHintTimeout = setTimeout(hidePanoHint, 4500);
}
function hidePanoHint(){
  uvPanoHint.classList.remove('show');
}

function animatePanoFrame(){
  panoLon += (panoTargetLon - panoLon) * 0.1;
  panoLat += (panoTargetLat - panoLat) * 0.1;

  const phi = THREE.MathUtils ? THREE.MathUtils.degToRad(90 - panoLat) : (90-panoLat)*Math.PI/180;
  const theta = THREE.MathUtils ? THREE.MathUtils.degToRad(panoLon) : panoLon*Math.PI/180;

  const target = new THREE.Vector3();
  target.x = 50 * Math.sin(phi) * Math.cos(theta);
  target.y = 50 * Math.cos(phi);
  target.z = 50 * Math.sin(phi) * Math.sin(theta);

  panoCamera.position.set(0,0,0);
  panoCamera.lookAt(target);
  renderer.render(panoScene, panoCamera);
}

function openUnitViewer(cluster){
  const set = UNIT_PHOTOSETS.default;
  uvUnitTag.textContent = `${cluster.type} · ${cluster.size}`;

  // build frames once
  uvStage.querySelectorAll('.uv-frame').forEach(f => f.remove());
  frameEls = [];
  set.rooms.forEach((room, i) => {
    const frame = document.createElement('div');
    frame.className = 'uv-frame';
    frame.style.backgroundImage = `url(${room.img})`;
    uvStage.insertBefore(frame, uvPrev);
    frameEls.push(frame);
  });

  uvDots.innerHTML = '';
  set.rooms.forEach((room,i) => {
    const dot = document.createElement('div');
    dot.className = 'uv-dot';
    dot.addEventListener('click', () => setRoom(i));
    uvDots.appendChild(dot);
  });

  activeRoomIndex = 0;
  unitViewer.classList.add('show');
  setRoom(0);

  uvContactBtn.href = `https://wa.me/6282228885223?text=${encodeURIComponent('Halo, saya tertarik dengan unit '+cluster.name+' ('+cluster.type+') di Al Fath Makassar.')}`;
}

function setRoom(index){
  const set = UNIT_PHOTOSETS.default;
  activeRoomIndex = (index + set.rooms.length) % set.rooms.length;
  const room = set.rooms[activeRoomIndex];

  frameEls.forEach((f,i) => f.classList.toggle('active', i===activeRoomIndex && !room.panorama));
  uvRoomLabel.textContent = room.label;
  uvRoomSub.textContent = room.sub;
  Array.from(uvDots.children).forEach((d,i) => d.classList.toggle('active', i===activeRoomIndex));

  if(room.panorama){
    if(!panoMode) enterPanoMode();
    uvPanoBadge.classList.add('show');
    panoTargetLon = 0; panoTargetLat = 0; panoLon = 0; panoLat = 0;
    resizePanoRenderer();
    loadPanorama(room.img);
    showPanoHint();
  } else {
    if(panoMode) exitPanoMode();
    uvPanoBadge.classList.remove('show');
    hidePanoHint();
  }
}

uvPrev.addEventListener('click', () => setRoom(activeRoomIndex-1));
uvNext.addEventListener('click', () => setRoom(activeRoomIndex+1));

uvClose.addEventListener('click', closeUnitViewer);

function closeUnitViewer(){
  unitViewer.classList.remove('show');
  if(panoMode) exitPanoMode();
  hidePanoHint();
}

// keyboard nav
window.addEventListener('keydown', e => {
  if(!unitViewer.classList.contains('show')) return;
  if(e.key==='ArrowLeft') setRoom(activeRoomIndex-1);
  if(e.key==='ArrowRight') setRoom(activeRoomIndex+1);
  if(e.key==='Escape') closeUnitViewer();
});

/* ---------------- FLOOR PLAN OVERLAY ---------------- */
const planOverlay = document.getElementById('planOverlay');
const planClose = document.getElementById('planClose');
const planTitle = document.getElementById('planTitle');
const planLand = document.getElementById('planLand');
const planEyebrow = document.querySelector('.plan-eyebrow');

uvPlanBtn.addEventListener('click', () => {
  if(activeCluster){
    const isType40 = activeCluster.type.includes('40');
    planTitle.textContent = isType40
      ? `${activeCluster.type} · ${activeCluster.size}`
      : `Type 40 · 6×13 m (Contoh Denah)`;
    planLand.textContent = isType40 ? '78–84 m²' : '78 m²';
    planEyebrow.textContent = isType40 ? 'Denah Resmi' : 'Denah Contoh · Layout Serupa';
  }
  planOverlay.classList.add('show');
});
planClose.addEventListener('click', () => planOverlay.classList.remove('show'));
planOverlay.addEventListener('click', (e) => { if(e.target===planOverlay) planOverlay.classList.remove('show'); });

/* ---------------- ESC closes panels in sensible order ---------------- */
window.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    if(planOverlay.classList.contains('show')) planOverlay.classList.remove('show');
  }
});

/* ---------------- INIT ---------------- */
initThree();
initPanoViewer();

})();
