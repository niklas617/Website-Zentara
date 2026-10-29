"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MS_SCREENS } from "../../../lib/motoset-content";

/** Showroom: Ring aus App-Screenshot-Planes, per Ziehen drehbar. */
export default function ShowroomScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = mount.clientWidth || innerWidth, h = mount.clientHeight || innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0.2, 9.5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block", cursor: "grab", touchAction: "pan-y" });

    const loader = new THREE.TextureLoader();
    const ring = new THREE.Group(); scene.add(ring);
    const R = 4.6, PW = 1.7, PH = PW * (2262 / 1080);
    const geo = new THREE.PlaneGeometry(PW, PH);
    const backGeo = new THREE.PlaneGeometry(PW + 0.14, PH + 0.14);
    const mats: THREE.Material[] = []; const texes: THREE.Texture[] = [];
    MS_SCREENS.forEach((src, i) => {
      const a = (i / MS_SCREENS.length) * Math.PI * 2;
      const x = Math.cos(a) * R, z = Math.sin(a) * R;
      const back = new THREE.Mesh(backGeo, new THREE.MeshBasicMaterial({ color: 0x0b0d13 }));
      back.position.set(x, 0, z); back.lookAt(x * 2, 0, z * 2); ring.add(back);
      const m = new THREE.MeshBasicMaterial({ color: 0x222222 }); mats.push(m);
      const plane = new THREE.Mesh(geo, m);
      plane.position.set(x, 0, z); plane.lookAt(x * 2, 0, z * 2); ring.add(plane);
      loader.load(src, (tex) => { tex.colorSpace = THREE.SRGBColorSpace; m.map = tex; m.color.set(0xffffff); m.needsUpdate = true; texes.push(tex); });
    });

    let rotY = 0, drag = false, lx = 0, vel = 0, px = 0, py = 0;
    const down = (e: PointerEvent) => { drag = true; lx = e.clientX; vel = 0; renderer.domElement.style.cursor = "grabbing"; };
    const up = () => { drag = false; renderer.domElement.style.cursor = "grab"; };
    const move = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1; py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (drag) { rotY += (e.clientX - lx) * 0.008; vel = (e.clientX - lx) * 0.008; lx = e.clientX; }
    };
    renderer.domElement.addEventListener("pointerdown", down);
    addEventListener("pointerup", up); addEventListener("pointermove", move, { passive: true });
    const ro = new ResizeObserver(() => { w = mount.clientWidth; h = mount.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); });
    ro.observe(mount);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!drag) { rotY += 0.0022 + vel; vel *= 0.94; }
      ring.rotation.y = rotY;
      camera.position.x += (px * 1.1 - camera.position.x) * 0.04; camera.position.y += (0.2 - py * 0.6 - camera.position.y) * 0.04; camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    reduce ? renderer.render(scene, camera) : loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up); removeEventListener("pointermove", move);
      geo.dispose(); backGeo.dispose(); mats.forEach((m) => m.dispose()); texes.forEach((t) => t.dispose());
      ring.children.forEach((c) => { const mm = (c as THREE.Mesh).material as THREE.Material; if (mm && mats.indexOf(mm) < 0) mm.dispose(); });
      renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="v-canvas" aria-hidden="true" />;
}
