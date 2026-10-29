"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Chrome: hochglänzendes Chrom-Objekt mit (prozeduralen) Studio-Reflexionen. */
export default function ChromeScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = mount.clientWidth || innerWidth, h = mount.clientHeight || innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block", cursor: "grab", touchAction: "pan-y" });

    // --- Studio-Env als Equirect-CanvasTexture ---
    const c = document.createElement("canvas"); c.width = 1024; c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#05060a"); g.addColorStop(0.42, "#2a2f3a"); g.addColorStop(0.5, "#ffffff");
    g.addColorStop(0.58, "#2a2f3a"); g.addColorStop(1, "#05060a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 512);
    // farbige Softboxen
    const blob = (x: number, y: number, r: number, col: string) => { const rg = ctx.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, col); rg.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = rg; ctx.fillRect(0, 0, 1024, 512); };
    blob(200, 150, 220, "rgba(39,224,255,0.5)"); blob(850, 360, 240, "rgba(255,46,126,0.45)");
    const env = new THREE.CanvasTexture(c); env.mapping = THREE.EquirectangularReflectionMapping; env.colorSpace = THREE.SRGBColorSpace;
    scene.environment = env;

    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.06, envMap: env, envMapIntensity: 1.3 });
    const geo = new THREE.TorusKnotGeometry(1.7, 0.52, 220, 32, 2, 3);
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const key = new THREE.PointLight(0xffffff, 60, 40); key.position.set(5, 6, 6); scene.add(key);

    let rotY = 0, rotX = 0, drag = false, lx = 0, ly = 0, vel = 0, px = 0, py = 0;
    const down = (e: PointerEvent) => { drag = true; lx = e.clientX; ly = e.clientY; vel = 0; renderer.domElement.style.cursor = "grabbing"; };
    const up = () => { drag = false; renderer.domElement.style.cursor = "grab"; };
    const move = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1; py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (drag) { rotY += (e.clientX - lx) * 0.01; rotX = THREE.MathUtils.clamp(rotX + (e.clientY - ly) * 0.008, -1, 1); vel = (e.clientX - lx) * 0.01; lx = e.clientX; ly = e.clientY; }
    };
    renderer.domElement.addEventListener("pointerdown", down);
    addEventListener("pointerup", up); addEventListener("pointermove", move, { passive: true });
    const ro = new ResizeObserver(() => { w = mount.clientWidth; h = mount.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); });
    ro.observe(mount);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!drag) { rotY += 0.003 + vel; vel *= 0.95; }
      knot.rotation.y = rotY; knot.rotation.x += (rotX - knot.rotation.x) * 0.06;
      camera.position.x += (px * 1.1 - camera.position.x) * 0.04; camera.position.y += (-py * 0.9 - camera.position.y) * 0.04; camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    reduce ? renderer.render(scene, camera) : loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up); removeEventListener("pointermove", move);
      geo.dispose(); mat.dispose(); env.dispose(); renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="v-canvas" aria-hidden="true" />;
}
