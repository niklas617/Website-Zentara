"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Particles: Partikel-Sphäre, deren Punkte vor dem Cursor zurückweichen und
 *  sanft zurückfedern. Kamera umkreist langsam. */
export default function ParticlesScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 760px)").matches;
    let w = mount.clientWidth || innerWidth, h = mount.clientHeight || innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const N = mobile ? 1200 : 2600, R = 2.7;
    const base = new Float32Array(N * 3), cur = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * Math.PI * (3 - Math.sqrt(5));
      const x = Math.cos(t) * r, z = Math.sin(t) * r;
      base[i * 3] = x * R; base[i * 3 + 1] = y * R; base[i * 3 + 2] = z * R;
      cur[i * 3] = base[i * 3]; cur[i * 3 + 1] = base[i * 3 + 1]; cur[i * 3 + 2] = base[i * 3 + 2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(cur, 3));
    const mat = new THREE.PointsMaterial({ color: 0x8b5cff, size: mobile ? 0.055 : 0.05, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    const pts = new THREE.Points(geo, mat); scene.add(pts);
    // zweiter, hellerer Kern
    const core = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x27e0ff, size: mobile ? 0.02 : 0.018, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(core);

    const ray = new THREE.Raycaster(); const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ndc = new THREE.Vector2(10, 10); const cursor = new THREE.Vector3(999, 999, 999);
    const move = (e: PointerEvent) => { const r = renderer.domElement.getBoundingClientRect(); ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1; ndc.y = -(((e.clientY - r.top) / r.height) * 2 - 1); };
    const leave = () => { cursor.set(999, 999, 999); };
    addEventListener("pointermove", move, { passive: true });
    renderer.domElement.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(() => { w = mount.clientWidth; h = mount.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); });
    ro.observe(mount);

    const REP = 1.5, STR = 0.9; let raf = 0, ang = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ang += 0.0016;
      camera.position.set(Math.sin(ang) * 7, 1.2, Math.cos(ang) * 7); camera.lookAt(0, 0, 0);
      ray.setFromCamera(ndc, camera);
      if (ndc.x < 9) ray.ray.intersectPlane(plane, cursor);
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        let x = cur[k], y = cur[k + 1], z = cur[k + 2];
        const dx = x - cursor.x, dy = y - cursor.y, dz = z - cursor.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < REP) { const f = ((REP - d) / REP) * STR; x += (dx / d) * f; y += (dy / d) * f; z += (dz / d) * f; }
        x += (base[k] - x) * 0.06; y += (base[k + 1] - y) * 0.06; z += (base[k + 2] - z) * 0.06;
        cur[k] = x; cur[k + 1] = y; cur[k + 2] = z;
      }
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      renderer.render(scene, camera);
    };
    if (reduce) { camera.position.set(0, 1.2, 7); camera.lookAt(0, 0, 0); renderer.render(scene, camera); } else loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      removeEventListener("pointermove", move); renderer.domElement.removeEventListener("pointerleave", leave);
      geo.dispose(); mat.dispose(); (core.material as THREE.Material).dispose(); renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="v-canvas" aria-hidden="true" />;
}
