"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Synthwave: scrollendes Wireframe-Terrain + gestreifte Retro-Sonne. */
export default function SynthwaveScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = mount.clientWidth || innerWidth, h = mount.clientHeight || innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x160a2a, 14, 42);
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 2.2, 10);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    // --- Terrain ---
    const SEG = 52, SIZE = 60;
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const terrain = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xff2e9a, wireframe: true, transparent: true, opacity: 0.6 }));
    terrain.position.z = -14; terrain.position.y = -3;
    scene.add(terrain);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const baseX: number[] = [], baseZ: number[] = [];
    for (let i = 0; i < pos.count; i++) { baseX.push(pos.getX(i)); baseZ.push(pos.getZ(i)); }
    const heightAt = (x: number, z: number) => {
      const valley = Math.min(Math.abs(x) / 7, 1);
      return (Math.sin(x * 0.35) * Math.cos(z * 0.3) * 1.4 + Math.sin(z * 0.6) * 0.5) * valley * valley;
    };

    // --- Sonne ---
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#ffd36e"); g.addColorStop(0.5, "#ff7a3d"); g.addColorStop(1, "#ff2e7e");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(128, 128, 120, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 7; i++) { const y = 150 + i * 16; ctx.fillRect(0, y, 256, 6 + i * 1.5); }
    const sunTex = new THREE.CanvasTexture(c);
    const sun = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ map: sunTex, transparent: true }));
    sun.position.set(0, 4.5, -30); scene.add(sun);

    let px = 0, offset = 0, raf = 0;
    const move = (e: PointerEvent) => { const r = renderer.domElement.getBoundingClientRect(); px = ((e.clientX - r.left) / r.width) * 2 - 1; };
    addEventListener("pointermove", move, { passive: true });
    const ro = new ResizeObserver(() => { w = mount.clientWidth; h = mount.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); });
    ro.observe(mount);

    const update = () => {
      for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(baseX[i], baseZ[i] + offset));
      pos.needsUpdate = true;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      offset += 0.09; update();
      camera.position.x += (px * 2.2 - camera.position.x) * 0.03;
      camera.lookAt(0, 1.5, -20);
      renderer.render(scene, camera);
    };
    update();
    reduce ? renderer.render(scene, camera) : loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); removeEventListener("pointermove", move);
      geo.dispose(); (terrain.material as THREE.Material).dispose();
      sun.geometry.dispose(); (sun.material as THREE.Material).dispose(); sunTex.dispose();
      renderer.dispose(); mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="v-canvas" aria-hidden="true" />;
}
