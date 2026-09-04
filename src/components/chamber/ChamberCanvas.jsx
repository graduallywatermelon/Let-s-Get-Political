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

    const resize = () => {
      const w = innerWidth, h = innerHeight;
      rC.setSize(w, h); camC.aspect = w / h; camC.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);
    let raf = 0;
    const frame = () => {
      rC.render(sc, camC);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      pmrem.dispose();
      rC.dispose();
    };
  }, []);

  return <canvas id="chamberCanvas" ref={canvasRef}></canvas>;
}
