import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DISPLAY_GAVEL = false;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

export default function GavelCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!DISPLAY_GAVEL) return;
    const gc = canvasRef.current;
    const gR = new THREE.WebGLRenderer({ canvas: gc, antialias: true, alpha: true });
    gR.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    const gs = new THREE.Scene();
    const gCam = new THREE.PerspectiveCamera(28, 1, .1, 200);
    gCam.position.set(0, 0, 40);
    gs.add(new THREE.AmbientLight(0xffffff, .95));
    const gl1 = new THREE.DirectionalLight(0xFFEFCF, 2.1); gl1.position.set(6, 14, 18); gs.add(gl1);

    const canvasTex = (w, h, fn) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h);
      const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
    };
    const woodTex = canvasTex(512, 512, (g, w, h) => {
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
    });
    const matWood = new THREE.MeshStandardMaterial({ map: woodTex, roughness: .5, metalness: .05 });
    const matWoodLt = new THREE.MeshStandardMaterial({ color: 0x8F6B42, roughness: .45, metalness: .05 });
    const matBrass = new THREE.MeshStandardMaterial({ color: 0xC9A24B, roughness: .26, metalness: .92 });
    const matDark = new THREE.MeshStandardMaterial({ color: 0x33210F, roughness: .55 });

    function buildGavel() {
      const g = new THREE.Group();
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.6, .6, 1.5, 48), matWood);
      barrel.rotation.z = Math.PI / 2; g.add(barrel);
      [-1, 1].forEach((s) => {
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(.63, .63, .16, 48), matBrass);
        collar.rotation.z = Math.PI / 2; collar.position.x = s * .66; g.add(collar);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(.5, .52, .42, 40), matDark);
        cap.rotation.z = Math.PI / 2; cap.position.x = s * 1.13; g.add(cap);
        const capRim = new THREE.Mesh(new THREE.TorusGeometry(.5, .045, 14, 44), matBrass);
        capRim.rotation.y = Math.PI / 2; capRim.position.x = s * 1.33; g.add(capRim);
      });
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(.26, .3, .2, 24), matBrass); neck.position.y = -.72; g.add(neck);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(.17, .23, 2.5, 32), matWoodLt); handle.position.y = -2.08; g.add(handle);
      [-2.9, -3.18].forEach((y) => {
        const gr = new THREE.Mesh(new THREE.TorusGeometry(.185, .035, 12, 32), matBrass);
        gr.rotation.x = Math.PI / 2; gr.position.y = y; g.add(gr);
      });
      const pommel = new THREE.Mesh(new THREE.SphereGeometry(.24, 26, 18), matDark); pommel.position.y = -3.5; g.add(pommel);
      return g;
    }
    const gavel = buildGavel(); gs.add(gavel);

    const wH = () => 2 * Math.tan(THREE.MathUtils.degToRad(gCam.fov / 2)) * 40;
    const toWorld = (px, py) => ({ x: (px / innerWidth - .5) * wH() * gCam.aspect, y: -(py / innerHeight - .5) * wH() });
    const centerOf = (el, dx = 0, dy = 0) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return toWorld(r.left + r.width / 2 + dx, r.top + r.height / 2 + dy);
    };

    function poseNav() {
      const spot = centerOf(document.getElementById('gavelSpot'), 34, 6);
      return { x: spot.x, y: spot.y - 1.2, s: .17, rx: 0, ry: .3, rz: -.1 };
    }

    function poseHover(t) {
      const blk = document.getElementById('gavelBlock');
      const f = centerOf(blk, 0, -46);
      return { x: f.x + Math.sin(t * .8) * .12, y: f.y + .6 + Math.sin(t * 1.3) * .08, s: .62, rx: Math.PI, ry: .34, rz: .46 };
    }

    const resize = () => {
      const w = innerWidth, h = innerHeight;
      gR.setSize(w, h); gCam.aspect = w / h; gCam.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    const clock = new THREE.Clock();
    let cur = null, raf = 0;
    const frame = () => {
      const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
      const heroUp = document.querySelector('.hero') && document.querySelector('.hero').getBoundingClientRect().bottom > innerHeight * .35;
      const tg = heroUp ? poseNav() : poseHover(t);
      if (!cur) cur = { ...tg };
      ['x', 'y'].forEach((k) => { cur[k] += (tg[k] - cur[k]) * Math.min(1, dt * 7) });
      cur.s += (tg.s - cur.s) * Math.min(1, dt * 6);
      ['rx', 'ry', 'rz'].forEach((k) => { cur[k] += (tg[k] - cur[k]) * Math.min(1, dt * 7) });
      gavel.position.set(cur.x, cur.y, 0);
      gavel.scale.setScalar(cur.s);
      gavel.rotation.set(cur.rx, cur.ry, cur.rz);
      canvasRef.current.style.display = 'block';
      gR.render(gs, gCam);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      gs.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m && m.dispose());
      });
      gR.dispose();
    };
  }, []);

  return <canvas id="gavelCanvas" ref={canvasRef}></canvas>;
}
