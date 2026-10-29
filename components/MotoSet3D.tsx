"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interaktive 3D-Szene für den MotoSet-Hero (vanilla three.js, kein externes
 * Modell): eine metallische Fahrwerks-Feder (Helix) mit Neon-Licht, umgeben
 * von einem Partikelfeld und einem dezenten Wireframe-Ring.
 * - Maus: Parallax (Kamera/Feder neigen sich leicht zum Cursor)
 * - Ziehen: Feder direkt drehen (mit Nachlauf/Inertia), sonst Auto-Rotation
 * - Scroll: dezente Kamerabewegung
 * Respektiert prefers-reduced-motion und drosselt auf Mobile.
 */
export default function MotoSet3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // ---- Farben ----
    const LIME = 0xc6f82e;
    const MAGENTA = 0xff2e7e;
    const CYAN = 0x27e0ff;

    // ---- Beleuchtung ----
    scene.add(new THREE.AmbientLight(0x404050, 1.1));
    const l1 = new THREE.PointLight(LIME, 140, 60);
    l1.position.set(6, 5, 6);
    const l2 = new THREE.PointLight(MAGENTA, 120, 60);
    l2.position.set(-7, -3, 4);
    const l3 = new THREE.PointLight(CYAN, 90, 60);
    l3.position.set(0, 2, -8);
    scene.add(l1, l2, l3);

    // ---- Zentrale Feder (Helix-Tube) ----
    const turns = 7;
    const coilRadius = 2.1;
    const coilHeight = 7.2;
    const pts: THREE.Vector3[] = [];
    const steps = 420;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * coilRadius, (t - 0.5) * coilHeight, Math.sin(a) * coilRadius));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 600, 0.26, 18, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      metalness: 0.95,
      roughness: 0.22,
      emissive: new THREE.Color(LIME),
      emissiveIntensity: 0.06,
    });
    const coil = new THREE.Mesh(tubeGeo, tubeMat);

    // dünner, leuchtender Draht entlang derselben Kurve (Neon-Akzent)
    const wireGeo = new THREE.TubeGeometry(curve, 600, 0.028, 8, false);
    const wireMat = new THREE.MeshBasicMaterial({ color: LIME, transparent: true, opacity: 0.9 });
    const wire = new THREE.Mesh(wireGeo, wireMat);

    const coilGroup = new THREE.Group();
    coilGroup.add(coil, wire);
    coilGroup.rotation.z = 0.18;
    scene.add(coilGroup);

    // ---- Dezenter Wireframe-Ring (Torus) ----
    const ringGeo = new THREE.TorusGeometry(4.6, 0.015, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.22 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    // ---- Partikelfeld ----
    const count = isMobile ? 520 : 1300;
    const positions = new Float32Array(count * 3);
    const spread = 26;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread - 4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x9fe870,
      size: isMobile ? 0.05 : 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ---- Interaktion ----
    const pointer = { x: 0, y: 0 };
    let targetRotX = 0.18;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velY = 0; // Dreh-Nachlauf um Y
    let manualRotY = 0;
    let scrollTilt = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        manualRotY += dx * 0.01;
        targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.008, -0.8, 1.0);
        velY = dx * 0.01;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = 0;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onScroll = () => {
      scrollTilt = (window.scrollY || 0) * 0.0004;
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Resize ----
    const resize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Render-Loop ----
    const clock = new THREE.Clock();
    let raf = 0;

    const renderOnce = () => renderer.render(scene, camera);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!dragging) {
        manualRotY += 0.0024 + velY;
        velY *= 0.95; // Inertia abklingen
      }
      coilGroup.rotation.y = manualRotY;
      coilGroup.rotation.x += (targetRotX + scrollTilt - coilGroup.rotation.x) * 0.06;
      coilGroup.position.y = Math.sin(t * 0.6) * 0.25;

      ring.rotation.z = t * 0.08;
      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.01;

      // Kamera-Parallax zum Cursor
      camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 1.1 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Lichter leicht bewegen
      l1.position.x = Math.cos(t * 0.5) * 6;
      l1.position.z = Math.sin(t * 0.5) * 6;
      l2.position.y = Math.sin(t * 0.4) * 4;

      renderer.render(scene, camera);
    };

    if (reduce) {
      resize();
      renderOnce();
    } else {
      animate();
    }

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      tubeGeo.dispose();
      wireGeo.dispose();
      ringGeo.dispose();
      pGeo.dispose();
      tubeMat.dispose();
      wireMat.dispose();
      ringMat.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="ms-3d-canvas" aria-hidden="true" />;
}
