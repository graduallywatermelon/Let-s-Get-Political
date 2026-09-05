import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

export default function ChamberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cc = canvasRef.current;

     const rC = new THREE.WebGLRenderer({ canvas: cc, antialias: true, alpha: true });
         rC.setPixelRatio(Math.min(devicePixelRatio, 1.75));
         rC.shadowMap.enabled = true; rC.shadowMap.type = THREE.PCFSoftShadowMap;
         const sc = new THREE.Scene();
         const camC = new THREE.PerspectiveCamera(45, 1, .1, 300);
         camC.position.set(0, 7.5, 24); camC.lookAt(0, 1.5, 2);
         const pmrem = new THREE.PMREMGenerator(rC);
         sc.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
         sc.add(new THREE.HemisphereLight(0xFFF3DC, 0x8A7A5E, .55));
         const sun = new THREE.DirectionalLight(0xFFE9C4, 2.2); sun.position.set(12, 26, 14);
         sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
         sun.shadow.camera.left = -26; sun.shadow.camera.right = 26; sun.shadow.camera.top = 26; sun.shadow.camera.bottom = -26;
         sc.add(sun);
         const chandLight = new THREE.PointLight(0xFFDFA8, .9, 70); chandLight.position.set(0, 13, 0); sc.add(chandLight);
         function canvasTex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t }
         const woodTex = canvasTex(512, 512, (g, w, h) => {
           g.fillStyle = '#5d3a20'; g.fillRect(0, 0, w, h);
           for (let i = 0; i < 420; i++) { const x = Math.random() * w; g.strokeStyle = `rgba(${30 + Math.random() * 40 | 0},${16 + Math.random() * 22 | 0},8,${.05 + Math.random() * .14})`; g.lineWidth = .6 + Math.random() * 2.4; g.beginPath(); g.moveTo(x, 0); let px = x; for (let y = 0; y < h; y += 18) { px += (Math.random() - .5) * 7; g.lineTo(px, y) } g.stroke() }
         });
         const woodTexLt = canvasTex(256, 256, (g, w, h) => {
           g.fillStyle = '#7c5330'; g.fillRect(0, 0, w, h);
           for (let i = 0; i < 260; i++) { const x = Math.random() * w; g.strokeStyle = `rgba(60,35,15,${.04 + Math.random() * .12})`; g.lineWidth = .5 + Math.random() * 2; g.beginPath(); g.moveTo(x, 0); let px = x; for (let y = 0; y < h; y += 14) { px += (Math.random() - .5) * 6; g.lineTo(px, y) } g.stroke() }
         });
         const marbleTex = canvasTex(1024, 1024, (g, w, h) => {
           const cx = w / 2, cy = h / 2;
           const grd = g.createRadialGradient(cx, cy, 40, cx, cy, w / 2);
           grd.addColorStop(0, '#F6F1E3'); grd.addColorStop(.65, '#EBE3CF'); grd.addColorStop(1, '#DDD2B8');
           g.fillStyle = grd; g.fillRect(0, 0, w, h);
           for (let i = 0; i < 70; i++) { g.strokeStyle = `rgba(140,125,95,${.03 + Math.random() * .06})`; g.lineWidth = .5 + Math.random() * 1.5; g.beginPath(); let x = Math.random() * w, y = Math.random() * h; g.moveTo(x, y); for (let k = 0; k < 22; k++) { x += (Math.random() - .5) * 70; y += (Math.random() - .5) * 70; g.lineTo(x, y) } g.stroke() }
           const R = Math.min(w, h) / 2;
           for (let r = R * .14; r < R; r += R * .13) { g.strokeStyle = 'rgba(169,124,47,.5)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke() }
           g.strokeStyle = 'rgba(120,100,60,.28)'; g.lineWidth = 2;
           for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.cos(an) * R * .14, cy + Math.sin(an) * R * .14); g.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); g.stroke() }
         });
         const matMarble = new THREE.MeshStandardMaterial({ map: marbleTex, roughness: .32, metalness: .05 });
         const matMarbleSolid = new THREE.MeshStandardMaterial({ color: 0xEDE7D6, roughness: .38, metalness: .04 });
         const matWood = new THREE.MeshStandardMaterial({ map: woodTex, roughness: .5, metalness: .05 });
         const matWoodLt = new THREE.MeshStandardMaterial({ map: woodTexLt, roughness: .45, metalness: .05 });
         const matLeather = new THREE.MeshStandardMaterial({ color: 0x6E2F33, roughness: .72, metalness: 0 });
         const matShell = new THREE.MeshStandardMaterial({ map: woodTexLt, color: 0x8F6B42, roughness: .55, metalness: .04, side: THREE.DoubleSide });
         const matBrass = new THREE.MeshStandardMaterial({ color: 0xC9A24B, roughness: .26, metalness: .92 });
         const matDark = new THREE.MeshStandardMaterial({ color: 0x33210F, roughness: .55 });
         const chamber = new THREE.Group();
         chamber.scale.set(.82, 1.0, .82);
         sc.add(chamber);
         const dummy = new THREE.Object3D();
         function add(m, cS, rS) { if (cS) m.castShadow = true; if (rS) m.receiveShadow = true; chamber.add(m); return m }
         {
           const f = add(new THREE.Mesh(new THREE.CylinderGeometry(27, 27, .4, 80), matMarble), false, true);
           f.position.y = -.2;
         }
         {
           add(new THREE.Mesh(new THREE.CylinderGeometry(8.3, 8.6, .55, 64), matMarbleSolid), true, true).position.y = .28;
           add(new THREE.Mesh(new THREE.CylinderGeometry(6.9, 7.1, .5, 64), matMarbleSolid), true, true).position.y = .8;
         }
         {
           add(new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.85, .44, 64), matMarbleSolid), true, true).position.y = 1.0;
           add(new THREE.Mesh(new THREE.CylinderGeometry(3.05, 3.2, .36, 64), matMarbleSolid), true, true).position.y = 1.4;
           const seam = add(new THREE.Mesh(new THREE.TorusGeometry(3.58, .05, 10, 72), matBrass)); seam.rotation.x = Math.PI / 2; seam.position.y = 1.2;
         }
         const A0 = Math.PI, SPAN = Math.PI;
         const padGeo = new THREE.BoxGeometry(.8, .14, .66);
         const shellGeo = new THREE.CylinderGeometry(.52, .52, 1.35, 20, 1, true, Math.PI / 2, Math.PI);
         const cushGeo = new THREE.CylinderGeometry(.43, .43, .52, 20, 1, true, Math.PI / 2, Math.PI);
         const legGeo = new THREE.CylinderGeometry(.07, .09, .46, 10);
         const baseGeo = new THREE.CylinderGeometry(.3, .36, .06, 18);
         const rings = [[9.6, 30], [11.5, 37], [13.4, 44]];
         rings.forEach(([r, n], ri) => {
           const yB = .9 + ri * 1.55;
           const step = add(new THREE.Mesh(new THREE.RingGeometry(r - 1.05, r + 1.6, 88, 1, -(A0 + SPAN), SPAN), matWoodLt), false, true);
           step.rotation.x = -Math.PI / 2; step.position.y = yB;
           const wall = add(new THREE.Mesh(new THREE.CylinderGeometry(r - 1.05, r - 1.05, 1.3, 88, 1, true, ((Math.PI / 2 - A0 - SPAN) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2), SPAN), matMarbleSolid), true, true);
           wall.position.y = yB - .65;
           const dStart = ((Math.PI / 2 - A0 - SPAN) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
           const desk = add(new THREE.Mesh(new THREE.CylinderGeometry(r - 1.4, r - 1.4, .2, 88, 1, true, dStart, SPAN), matWood), true);
           desk.position.y = yB + .66;
           const pad = new THREE.InstancedMesh(padGeo, matLeather, n);
           const back = new THREE.InstancedMesh(shellGeo, matShell, true);
           const cush = new THREE.InstancedMesh(cushGeo, matLeather, true);
           const legs = new THREE.InstancedMesh(legGeo, matWood, n);
           const bases = new THREE.InstancedMesh(baseGeo, matBrass, n);
           for (let i = 0; i < n; i++) {
             const a = A0 + ((i + .5) / n) * SPAN;
             const x = Math.cos(a) * r, z = Math.sin(a) * r, face = Math.atan2(-x, -z);
             dummy.scale.setScalar(1);
             dummy.position.set(x, yB + .46, z); dummy.rotation.set(0, face, 0); dummy.updateMatrix(); pad.setMatrixAt(i, dummy.matrix);
             dummy.position.set(Math.cos(a) * (r + .36), yB + 1.15, Math.sin(a) * (r + .36)); dummy.rotation.set(0, face, 0); dummy.updateMatrix(); back.setMatrixAt(i, dummy.matrix);
             dummy.position.set(Math.cos(a) * (r + .28), yB + .84, Math.sin(a) * (r + .28)); dummy.rotation.set(0, face, 0); dummy.updateMatrix(); cush.setMatrixAt(i, dummy.matrix);
             dummy.position.set(x, yB + .24, z); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); legs.setMatrixAt(i, dummy.matrix);
             dummy.position.set(x, yB + .03, z); dummy.updateMatrix(); bases.setMatrixAt(i, dummy.matrix);
           }
           pad.castShadow = back.castShadow = cush.castShadow = legs.castShadow = true;
           chamber.add(pad, back, cush, legs, bases);
         });
     sc.fog = new THREE.Fog(0xF5F1E6, 44, 132);
         const papers = [];
         for (let i = 0; i < 16; i++) {
           const w = .9 + Math.random() * 1.2, h = w * 1.4;
           const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ color: 0xF7F3E9, roughness: .86, metalness: 0, transparent: true, opacity: .5, side: THREE.DoubleSide }));
           m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: i % 3 ? 0xA97C2F : 0x1B2432, transparent: true, opacity: .45 })));
           m.position.set(8 + (Math.random() - .5) * 42, Math.random() * 32 - 8, (Math.random() - .5) * 36 - 10);
           m.rotation.set((Math.random() - .5) * .7, Math.random() * Math.PI, (Math.random() - .5) * .5);
           m.userData = { vy: .014 + Math.random() * .022, rx: (Math.random() - .5) * .0035, ry: (Math.random() - .5) * .004 };
           papers.push(m); sc.add(m);
         }
         {
           const n = 460, pos = new Float32Array(n * 3);
           for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - .5) * 78; pos[i * 3 + 1] = Math.random() * 32 - 6; pos[i * 3 + 2] = (Math.random() - .5) * 52 - 12; }
           const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
           sc.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xC9A24B, size: .15, transparent: true, opacity: .5, sizeAttenuation: true })));
         }

    const resize = () => {
      const w = innerWidth, h = innerHeight;
      rC.setSize(w, h); camC.aspect = w / h; camC.updateProjectionMatrix();
    };
     const clock = new THREE.Clock();
     let pDamp = 0, raf = 0;
     const secEl = document.getElementById('chamberSec');
    const frame = () => {
      const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
      const r = secEl.getBoundingClientRect();
           const enter = smooth(clamp01((innerHeight - r.top) / (innerHeight * .9)));
           const past = clamp01(-r.bottom / (innerHeight * .62));
           const vis = enter * (1 - past);
           cc.style.opacity = (vis * .92).toFixed(3);
           const rp = 0;
           pDamp += (rp - pDamp) * Math.min(1, dt * 3.4);
           const q = pDamp;
           chamber.rotation.y = lerp(-1.31, 4.71, q) + Math.sin(t * .12) * .03;
           camC.position.y = lerp(6.7, 5.5, q);
           camC.position.z = lerp(21.5, 15, q);
           chamber.position.x = lerp(11.2, 2.4, q) + Math.sin(t * .07) * .3;
           camC.lookAt(lerp(1.6, .4, q), lerp(2.4, 2.8, q), 0);
           camC.rotation.z = Math.sin(q * Math.PI * 1.2) * .02;
           chamber.rotation.x = Math.sin(t * .1) * .008;
           chandLight.intensity = .9 + Math.sin(t * .9) * .14;
           papers.forEach(b => {
             b.position.y += b.userData.vy; b.rotation.x += b.userData.rx; b.rotation.y += b.userData.ry;
             if (b.position.y > 32) { b.position.y = -9; b.position.x = 8 + (Math.random() - .5) * 42; }
           });
      rC.render(sc, camC);
      raf = requestAnimationFrame(frame);
    };

    resize();
    addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      sc.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          if (!m) return;
          ['map', 'normalMap', 'roughnessMap'].forEach((k) => m[k] && m[k].dispose());
          m.dispose();
        });
      });
      pmrem.dispose();
      rC.dispose();
    };
  }, []);

  return <canvas id="chamberCanvas" ref={canvasRef}></canvas>;
}