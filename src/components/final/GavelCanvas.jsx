import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

export const DISPLAY_GAVEL = false;

function canvasTex(w, h, fn) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4;
  return t;
}

function Gavel() {
  const mats = useMemo(() => ({
    wood: new THREE.MeshStandardMaterial({
      map: canvasTex(512, 512, (g, w, h) => {
        g.fillStyle = '#5d3a20'; g.fillRect(0, 0, w, h);
        for (let i = 0; i < 420; i++) {
          const x = Math.random() * w;
          g.strokeStyle = `rgba(${30 + Math.random() * 40 | 0},${16 + Math.random() * 22 | 0},8,${.05 + Math.random() * .14})`;
          g.lineWidth = .6 + Math.random() * 2.4;
          g.beginPath(); g.moveTo(x, 0);
          let px = x;
          for (let y = 0; y < h; y += 18) { px += (Math.random() - .5) * 7; g.lineTo(px, y) }
          g.stroke();
        }
      }),
      roughness: .5, metalness: .05,
    }),
    woodLt: new THREE.MeshStandardMaterial({ color: 0x8F6B42, roughness: .45, metalness: .05 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xC9A24B, roughness: .26, metalness: .92 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x33210F, roughness: .55 }),
  }), []);
  const group = useRef(null);
  const cur = useRef(null);
  const { camera, size } = useThree();
  useFrame(({ clock }, dt) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const wH = () => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 40;
    const toWorld = (px, py) => ({ x: (px / size.width - .5) * wH() * camera.aspect, y: -(py / size.height - .5) * wH() });
    const centerOf = (el, dx = 0, dy = 0) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return toWorld(r.left + r.width / 2 + dx, r.top + r.height / 2 + dy);
    };
    const hero = document.querySelector('.hero');
    const heroUp = hero && hero.getBoundingClientRect().bottom > size.height * .35;
    const tg = heroUp
      ? (() => { const spot = centerOf(document.getElementById('gavelSpot'), 34, 6); return { x: spot.x, y: spot.y - 1.2, s: .17, rx: 0, ry: .3, rz: -.1 } })()
      : (() => { const f = centerOf(document.getElementById('gavelBlock'), 0, -46); return { x: f.x + Math.sin(t * .8) * .12, y: f.y + .6 + Math.sin(t * 1.3) * .08, s: .62, rx: Math.PI, ry: .34, rz: .46 } })();
    if (!cur.current) cur.current = { ...tg };
    ['x', 'y'].forEach((k) => { cur.current[k] += (tg[k] - cur.current[k]) * Math.min(1, dt * 7) });
    cur.current.s += (tg.s - cur.current.s) * Math.min(1, dt * 6);
    ['rx', 'ry', 'rz'].forEach((k) => { cur.current[k] += (tg[k] - cur.current[k]) * Math.min(1, dt * 7) });
    group.current.position.set(cur.current.x, cur.current.y, 0);
    group.current.scale.setScalar(cur.current.s);
    group.current.rotation.set(cur.current.rx, cur.current.ry, cur.current.rz);
  });
  const { wood, woodLt, brass, dark } = mats;
  return (
    <group ref={group}>
      <mesh material={wood} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[.6, .6, 1.5, 48]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh material={brass} rotation-z={Math.PI / 2} position={[s * .66, 0, 0]}>
            <cylinderGeometry args={[.63, .63, .16, 48]} />
          </mesh>
          <mesh material={dark} rotation-z={Math.PI / 2} position={[s * 1.13, 0, 0]}>
            <cylinderGeometry args={[.5, .52, .42, 40]} />
          </mesh>
          <mesh material={brass} rotation-y={Math.PI / 2} position={[s * 1.33, 0, 0]}>
            <torusGeometry args={[.5, .045, 14, 44]} />
          </mesh>
        </group>
      ))}
      <mesh material={brass} position={[0, -.72, 0]}>
        <cylinderGeometry args={[.26, .3, .2, 24]} />
      </mesh>
      <mesh material={woodLt} position={[0, -2.08, 0]}>
        <cylinderGeometry args={[.17, .23, 2.5, 32]} />
      </mesh>
      {[-2.9, -3.18].map((y) => (
        <mesh key={y} material={brass} rotation-x={Math.PI / 2} position={[0, y, 0]}>
          <torusGeometry args={[.185, .035, 12, 32]} />
        </mesh>
      ))}
      <mesh material={dark} position={[0, -3.5, 0]}>
        <sphereGeometry args={[.24, 26, 18]} />
      </mesh>
    </group>
  );
}

export default function GavelCanvas() {
  if (!DISPLAY_GAVEL) return null;
  return (
    <div id="gavelStage" className="on">
      <Canvas flat camera={{ fov: 28, near: .1, far: 200, position: [0, 0, 40] }} dpr={[1, Math.min(devicePixelRatio, 1.8)]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={.95} />
        <directionalLight color={0xFFEFCF} intensity={2.1} position={[6, 14, 18]} />
        <Gavel />
      </Canvas>
    </div>
  );
}
