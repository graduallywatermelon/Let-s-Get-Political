import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

const A0 = Math.PI;
const SPAN = Math.PI;
const ARC = ((Math.PI / 2 - A0 - SPAN) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
const RINGS = [[9.6, 30], [11.5, 37], [13.4, 44]];

function canvasTex(w, h, fn) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function useChamberResources() {
  const res = useMemo(() => {
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
    const textures = [woodTex, woodTexLt, marbleTex];
    return {
      marble: new THREE.MeshStandardMaterial({ map: marbleTex, roughness: .32, metalness: .05 }),
      marbleSolid: new THREE.MeshStandardMaterial({ color: 0xEDE7D6, roughness: .38, metalness: .04 }),
      wood: new THREE.MeshStandardMaterial({ map: woodTex, roughness: .5, metalness: .05 }),
      woodLt: new THREE.MeshStandardMaterial({ map: woodTexLt, roughness: .45, metalness: .05 }),
      leather: new THREE.MeshStandardMaterial({ color: 0x6E2F33, roughness: .72, metalness: 0 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xC9A24B, roughness: .26, metalness: .92 }),
      seatGeos: [
        new THREE.BoxGeometry(.8, .14, .66),
        new THREE.CylinderGeometry(.43, .43, .52, 20, 1, true, Math.PI / 2, Math.PI),
        new THREE.CylinderGeometry(.07, .09, .46, 10),
        new THREE.CylinderGeometry(.3, .36, .06, 18),
      ],
      disposeAll: () => { textures.forEach((t) => t.dispose()) },
    };
  }, []);
  useEffect(() => () => res.disposeAll(), [res]);
  return res;
}

function RoomEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    scene.environment = envMap;
    return () => { scene.environment = null; envMap.dispose(); pmrem.dispose() };
  }, [gl, scene]);
  return null;
}

function SeatRing({ r, n, yB, res }) {
  const meshes = useRef([]);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    const place = (i, im, x, y, z, face) => {
      if (!im) return;
      dummy.scale.setScalar(1); dummy.position.set(x, y, z); dummy.rotation.set(0, face, 0);
      dummy.updateMatrix(); im.setMatrixAt(i, dummy.matrix);
    };
    for (let i = 0; i < n; i++) {
      const a = A0 + ((i + .5) / n) * SPAN;
      const x = Math.cos(a) * r, z = Math.sin(a) * r, face = Math.atan2(-x, -z);
      place(i, meshes.current[0], x, yB + .46, z, face);
      place(i, meshes.current[1], Math.cos(a) * (r + .28), yB + .84, Math.sin(a) * (r + .28), face);
      place(i, meshes.current[2], x, yB + .24, z, 0);
      place(i, meshes.current[3], x, yB + .03, z, 0);
    }
    meshes.current.forEach((im) => { if (im) im.instanceMatrix.needsUpdate = true });
  }, [r, n, yB]);
  const seat = (geo, mat, idx) => (
    <instancedMesh ref={(el) => { meshes.current[idx] = el }} args={[geo, mat, n]} castShadow />
  );
  return (
    <>
      <mesh material={res.woodLt} receiveShadow rotation-x={-Math.PI / 2} position={[0, yB, 0]}>
        <ringGeometry args={[r - 1.05, r + 1.6, 88, 1, -(A0 + SPAN), SPAN]} />
      </mesh>
      <mesh material={res.marbleSolid} castShadow receiveShadow position={[0, yB - .65, 0]}>
        <cylinderGeometry args={[r - 1.05, r - 1.05, 1.3, 88, 1, true, ARC, SPAN]} />
      </mesh>
      <mesh material={res.wood} castShadow position={[0, yB + .66, 0]}>
        <cylinderGeometry args={[r - 1.4, r - 1.4, .2, 88, 1, true, ARC, SPAN]} />
      </mesh>
      {seat(res.seatGeos[0], res.leather, 0)}
      {seat(res.seatGeos[1], res.leather, 1)}
      {seat(res.seatGeos[2], res.wood, 2)}
      {seat(res.seatGeos[3], res.brass, 3)}
    </>
  );
}

function Papers() {
  const sheets = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    w: .9 + Math.random() * 1.2,
    x: 8 + (Math.random() - .5) * 42,
    y: Math.random() * 32 - 8,
    z: (Math.random() - .5) * 36 - 10,
    rx: (Math.random() - .5) * .7,
    ry: Math.random() * Math.PI,
    rz: (Math.random() - .5) * .5,
    vy: .014 + Math.random() * .022,
    drx: (Math.random() - .5) * .0035,
    dry: (Math.random() - .5) * .004,
    gold: i % 3 !== 0,
  })), []);
  const refs = useRef([]);
  useFrame(() => {
    sheets.forEach((b, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.y += b.vy; m.rotation.x += b.drx; m.rotation.y += b.dry;
      if (m.position.y > 32) { m.position.y = -9; m.position.x = 8 + (Math.random() - .5) * 42 }
    });
  });
  return (
    <>
      {sheets.map((b, i) => (
        <mesh key={b.id} ref={(el) => { refs.current[i] = el }} position={[b.x, b.y, b.z]} rotation={[b.rx, b.ry, b.rz]}>
          <planeGeometry args={[b.w, b.w * 1.4]} />
          <meshStandardMaterial color={0xF7F3E9} roughness={.86} metalness={0} transparent opacity={.5} side={THREE.DoubleSide} />
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(b.w, b.w * 1.4)]} />
            <lineBasicMaterial color={b.gold ? 0xA97C2F : 0x1B2432} transparent opacity={.45} />
          </lineSegments>
        </mesh>
      ))}
    </>
  );
}

function Dust() {
  const points = useMemo(() => {
    const n = 460, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - .5) * 78; pos[i * 3 + 1] = Math.random() * 32 - 6; pos[i * 3 + 2] = (Math.random() - .5) * 52 - 12 }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => points.dispose(), [points]);
  return (
    <points geometry={points}>
      <pointsMaterial color={0xC9A24B} size={.15} transparent opacity={.5} sizeAttenuation />
    </points>
  );
}

function ChamberScene({ stageRef }) {
  const res = useChamberResources();
  const chamber = useRef(null);
  const chand = useRef(null);
  const damp = useRef(0);
  useFrame(({ clock, camera, size }, delta) => {
    const dt = Math.min(delta, .05), t = clock.elapsedTime;
    const secEl = document.getElementById('chamberSec');
    if (!secEl || !chamber.current) return;
    const r = secEl.getBoundingClientRect();
    const enter = smooth(clamp01((innerHeight - r.top) / (innerHeight * .9)));
    const past = clamp01(-r.bottom / (innerHeight * .62));
    if (stageRef.current) stageRef.current.style.opacity = (enter * (1 - past) * .92).toFixed(3);
    damp.current += (clamp01((innerHeight - r.top) / (r.height + innerHeight)) - damp.current) * Math.min(1, dt * 3.4);
    const q = damp.current;
    chamber.current.rotation.y = lerp(-1.31, 4.71, q) + Math.sin(t * .12) * .03;
    camera.position.y = lerp(6.7, 5.5, q);
    camera.position.z = lerp(21.5, 15, q);
    chamber.current.position.x = lerp(11.2, 2.4, q) + Math.sin(t * .07) * .3;
    camera.lookAt(lerp(1.6, .4, q), lerp(2.4, 2.8, q), 0);
    camera.rotation.z = Math.sin(q * Math.PI * 1.2) * .02;
    chamber.current.rotation.x = Math.sin(t * .1) * .008;
    if (chand.current) chand.current.intensity = .9 + Math.sin(t * .9) * .14;
  });
  return (
    <>
      <RoomEnv />
      <hemisphereLight args={[0xFFF3DC, 0x8A7A5E, .55]} />
      <directionalLight color={0xFFE9C4} intensity={2.2} position={[12, 26, 14]} castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-26} shadow-camera-right={26} shadow-camera-top={26} shadow-camera-bottom={-26} />
      <pointLight ref={chand} color={0xFFDFA8} intensity={.9} distance={70} position={[0, 13, 0]} />
      <fog attach="fog" args={[0xF5F1E6, 44, 132]} />
      <group ref={chamber} scale={[.82, 1, .82]}>
        <mesh material={res.marble} receiveShadow position={[0, -.2, 0]}>
          <cylinderGeometry args={[27, 27, .4, 80]} />
        </mesh>
        <mesh material={res.marbleSolid} castShadow receiveShadow position={[0, .28, 0]}>
          <cylinderGeometry args={[8.3, 8.6, .55, 64]} />
        </mesh>
        <mesh material={res.marbleSolid} castShadow receiveShadow position={[0, .8, 0]}>
          <cylinderGeometry args={[6.9, 7.1, .5, 64]} />
        </mesh>
        <mesh material={res.marbleSolid} castShadow receiveShadow position={[0, 1, 0]}>
          <cylinderGeometry args={[3.7, 3.85, .44, 64]} />
        </mesh>
        <mesh material={res.marbleSolid} castShadow receiveShadow position={[0, 1.4, 0]}>
          <cylinderGeometry args={[3.05, 3.2, .36, 64]} />
        </mesh>
        <mesh material={res.brass} rotation-x={Math.PI / 2} position={[0, 1.2, 0]}>
          <torusGeometry args={[3.58, .05, 10, 72]} />
        </mesh>
        {RINGS.map(([r, n], ri) => (
          <SeatRing key={r} r={r} n={n} yB={.9 + ri * 1.55} res={res} />
        ))}
      </group>
      <Papers />
      <Dust />
    </>
  );
}

export default function ChamberCanvas() {
  const stageRef = useRef(null);
  return (
    <div id="chamberStage" ref={stageRef}>
      <Canvas
        flat
        camera={{ fov: 45, near: .1, far: 300, position: [0, 7.5, 24] }}
        dpr={[1, Math.min(devicePixelRatio, 1.75)]}
        shadows="soft"
        gl={{ antialias: true, alpha: true }}
      >
        <ChamberScene stageRef={stageRef} />
      </Canvas>
    </div>
  );
}
