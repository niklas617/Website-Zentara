"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Blueprint: detailliertes, drehbares Wireframe-Federbein (Coilover-Monoshock).
 *  Richtig herum (Körper oben), mit echten Lager-Augen (Ringflächen + Uniball +
 *  Sechskant-Bolzen), Piggyback-Reservoir, Verstellern, Feder & Federtellern,
 *  Anschlagpuffer, Detailringen und Bemaßungslinie – alles in MotoSet-Grün. */
export default function BlueprintScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 861px)").matches;
    let w = mount.clientWidth || innerWidth, h = mount.clientHeight || innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    // Näher dran = größer (bildschirmfüllend); auf Desktop nach rechts versetzt.
    camera.position.set(0, 0.2, wide ? 7.9 : 8.7);
    camera.lookAt(0, 0.8, 0); // Blickpunkt höher → Federbein sitzt tiefer im Bild
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block", cursor: "grab", touchAction: "pan-y" });

    const LIME = 0xc6f82e;
    const wire = new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.95 });
    const wireDim = new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.42 });
    const springMat = new THREE.LineBasicMaterial({ color: 0xe6ff7a, transparent: true, opacity: 0.98 });
    const fillMat = new THREE.MeshBasicMaterial({ color: 0x1c2b06, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide });
    const disposables: { dispose(): void }[] = [wire, wireDim, springMat, fillMat];

    const pivot = new THREE.Group();
    const shock = new THREE.Group();
    shock.rotation.x = Math.PI;   // umgedreht: Dämpferkörper nach oben
    pivot.add(shock); scene.add(pivot);

    const add = (g: THREE.BufferGeometry, m: THREE.LineBasicMaterial = wire, fill = false) => {
      if (fill) { const fm = new THREE.Mesh(g.clone(), fillMat); fm.renderOrder = 0; disposables.push(fm.geometry); shock.add(fm); }
      const wg = new THREE.WireframeGeometry(g); const ls = new THREE.LineSegments(wg, m); ls.renderOrder = 1;
      disposables.push(wg); shock.add(ls); g.dispose();
    };
    const cyl = (rT: number, rB: number, hgt: number, y: number, x = 0, seg = 22) => { const g = new THREE.CylinderGeometry(rT, rB, hgt, seg, 1, true); g.translate(x, y, 0); return g; };
    const ring = (rI: number, rO: number, y: number, flat = false, x = 0) => { const g = new THREE.TorusGeometry((rI + rO) / 2, (rO - rI) / 2, 8, 28); if (flat) g.rotateX(Math.PI / 2); g.translate(x, y, 0); return g; };

    // --- Echtes Lager-Auge: Außenring + Bohrung + 2 Ringflächen + Uniball + Bolzen ---
    const makeEye = (y: number, rO: number, rI: number, len: number) => {
      const wall = new THREE.CylinderGeometry(rO, rO, len, 30, 1, true); wall.rotateX(Math.PI / 2); wall.translate(0, y, 0); add(wall, wire, true);
      const bore = new THREE.CylinderGeometry(rI, rI, len + 0.02, 22, 1, true); bore.rotateX(Math.PI / 2); bore.translate(0, y, 0); add(bore, wireDim);
      [-len / 2, len / 2].forEach((z) => { const rg = new THREE.RingGeometry(rI, rO, 30, 1); rg.translate(0, y, z); add(rg, wire); });
      const ball = new THREE.IcosahedronGeometry(rI * 0.9, 1); ball.translate(0, y, 0); add(ball, wireDim);
      const bolt = new THREE.CylinderGeometry(rI * 0.5, rI * 0.5, len + 0.55, 6); bolt.rotateX(Math.PI / 2); bolt.translate(0, y, 0); add(bolt, wireDim);
    };

    // Unteres Auge + Clevis
    makeEye(-3.15, 0.36, 0.17, 0.52);
    [-0.2, 0.2].forEach((bx) => add(new THREE.BoxGeometry(0.1, 0.66, 0.36).translate(bx, -2.72, 0) as THREE.BufferGeometry, wireDim));
    // Dämpferkörper + Detailringe
    add(cyl(0.44, 0.44, 1.8, -1.65), wire, true);
    add(cyl(0.48, 0.44, 0.24, -0.72), wireDim);
    add(cyl(0.44, 0.38, 0.22, -2.52), wireDim);
    add(ring(0.42, 0.5, -1.2, true), wireDim);
    add(ring(0.42, 0.5, -2.05, true), wireDim);
    // Piggyback-Reservoir + Schlauch + Compression-Versteller
    add(cyl(0.25, 0.25, 1.2, -1.95, 0.8), wire, true);
    add(ring(0.08, 0.14, -0.08, false, 0.8), wireDim);
    const hose = new THREE.CylinderGeometry(0.06, 0.06, 0.64, 8, 1, true); hose.rotateZ(Math.PI / 2.3); hose.translate(0.41, -2.18, 0); add(hose, wireDim);
    add(cyl(0.14, 0.14, 0.2, -1.26, 0.8, 12), wireDim);
    // Kolbenstange + Dichtkopf-Collar + Anschlagpuffer
    add(cyl(0.12, 0.12, 2.95, 0.62), wireDim, true);
    add(cyl(0.3, 0.3, 0.26, -0.66), wire);
    add(cyl(0.19, 0.19, 0.34, -0.35, 0, 16), wireDim, true); // Anschlagpuffer
    // Schraubenfeder (dicht, geschlossene Enden)
    const sp: THREE.Vector3[] = []; const turns = 11, sr = 0.6, y0 = -0.5, y1 = 2.05, steps = 380;
    for (let i = 0; i <= steps; i++) { const t = i / steps; const te = t * 0.3 + t * t * (3 - 2 * t) * 0.7; const a = t * turns * Math.PI * 2; sp.push(new THREE.Vector3(Math.cos(a) * sr, y0 + (y1 - y0) * te, Math.sin(a) * sr)); }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sp), 440, 0.084, 8, false), springMat);
    add(ring(0.56, 0.68, -0.48, true), wire);
    add(ring(0.56, 0.68, 2.06, true), wire);
    // Vorspann-Collar mit Kerben
    add(cyl(0.52, 0.52, 0.34, -0.18, 0, 16), wire, true);
    for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; add(new THREE.BoxGeometry(0.03, 0.34, 0.06).translate(Math.cos(a) * 0.52, -0.18, Math.sin(a) * 0.52) as THREE.BufferGeometry, wireDim); }
    // Oberes Auge + Clevis + Rebound-Versteller
    add(cyl(0.2, 0.2, 0.46, 2.52), wireDim, true);
    makeEye(2.98, 0.3, 0.15, 0.46);
    add(cyl(0.12, 0.1, 0.16, 3.3, 0, 12), wireDim);

    // Bemaßungslinie links
    const dp = [-1.75, -3.25, 0, -1.75, 3.2, 0, -1.9, -3.25, 0, -1.6, -3.25, 0, -1.9, 3.2, 0, -1.6, 3.2, 0, -1.9, -0.02, 0, -1.6, -0.02, 0];
    const dg = new THREE.BufferGeometry(); dg.setAttribute("position", new THREE.Float32BufferAttribute(dp, 3));
    shock.add(new THREE.LineSegments(dg, wireDim)); disposables.push(dg);

    pivot.rotation.z = 0.08;
    pivot.position.x = wide ? 1.35 : 0;   // auf Desktop nach rechts, Text bekommt links Platz

    const grid = new THREE.GridHelper(40, 40, LIME, 0x2a3a10);
    (grid.material as THREE.Material).opacity = 0.16; (grid.material as THREE.Material).transparent = true;
    grid.position.y = -3.9; scene.add(grid);

    let rotY = -0.5, rotX = 0.08, drag = false, lx = 0, ly = 0, vel = 0, px = 0, py = 0;
    const down = (e: PointerEvent) => { drag = true; lx = e.clientX; ly = e.clientY; vel = 0; renderer.domElement.style.cursor = "grabbing"; };
    const upE = () => { drag = false; renderer.domElement.style.cursor = "grab"; };
    const move = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1; py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (drag) { rotY += (e.clientX - lx) * 0.01; rotX = THREE.MathUtils.clamp(rotX + (e.clientY - ly) * 0.008, -0.7, 0.9); vel = (e.clientX - lx) * 0.01; lx = e.clientX; ly = e.clientY; }
    };
    renderer.domElement.addEventListener("pointerdown", down);
    addEventListener("pointerup", upE); addEventListener("pointermove", move, { passive: true });
    const ro = new ResizeObserver(() => { w = mount.clientWidth; h = mount.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); });
    ro.observe(mount);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!drag) { rotY += 0.004 + vel; vel *= 0.95; }
      pivot.rotation.y = rotY; pivot.rotation.x += (rotX - pivot.rotation.x) * 0.06;
      camera.position.x += (px * 1.1 - camera.position.x) * 0.04;
      camera.position.y += (0.2 - py * 0.7 - camera.position.y) * 0.04; camera.lookAt(0, 0.8, 0);
      renderer.render(scene, camera);
    };
    reduce ? renderer.render(scene, camera) : loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      removeEventListener("pointerup", upE); removeEventListener("pointermove", move);
      disposables.forEach((d) => d.dispose());
      (grid.material as THREE.Material).dispose(); grid.geometry.dispose();
      renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="v-canvas" aria-hidden="true" />;
}
