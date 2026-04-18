"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GeomCenterpiece() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    
    renderer.setSize(600, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Dynamic Canvas for CRT Screen ---
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);

    // Load actual logo image
    const logoImg = new Image();
    logoImg.src = "/logoG.svg";
    let logoLoaded = false;
    logoImg.onload = () => { logoLoaded = true; };

    let scrollY = 0;
    const lines = [
      "GOTHREE_CORE_LOADED",
      "STRATEGY_ENGINE: READY",
      "PRECISION: 100%",
      "TRANSITION: ACTIVE",
      "SYS_ARCH: STABLE",
      "--------------------",
      "INPUT: PURPOSE",
      "OUTPUT: EXCELLENCE",
      "STATUS: OPTIMIZED"
    ];

    const drawScreen = (time) => {
      // Background (Phosphor sweep)
      ctx.fillStyle = "#001a14";
      ctx.fillRect(0, 0, 512, 512);

      // Draw Action Logo
      if (logoLoaded) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffcc";
        // Draw centered logo (larger and taller, moved up)
        ctx.drawImage(logoImg, 256 - 140, 10, 280, 300);
      } else {
        // Fallback for loading
        ctx.fillStyle = "#00ffcc";
        ctx.font = "bold 60px inter";
        ctx.fillText("G", 230, 180);
      }

      // Draw Terminal Text
      ctx.font = "bold 24px monospace";
      ctx.fillStyle = "#00ffcc";
      ctx.shadowBlur = 5;
      
      lines.forEach((line, i) => {
        const y = 320 + (i * 30) - (scrollY % (lines.length * 30));
        if (y > 280 && y < 500) {
          ctx.fillText("> " + line, 60, y);
        }
      });
      scrollY += 1;

      // Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      for (let i = 0; i < 512; i += 4) {
        ctx.fillRect(0, i + (time % 4), 512, 2);
      }

      // Noise
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillStyle = `rgba(0, 255, 204, ${Math.random() * 0.05})`;
        ctx.fillRect(x, y, 1, 1);
      }

      texture.needsUpdate = true;
    };

    // --- Materials (PBR) ---
    const retroBeige = new THREE.MeshStandardMaterial({
      color: 0xe0d6c3,
      roughness: 0.6,
      metalness: 0.1,
    });

    const industrialGrey = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.8,
      metalness: 0.3,
    });

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00, 
      roughness: 0.3,
      metalness: 0.9,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });

    // --- PC Group ---
    const pcGroup = new THREE.Group();

    // 1. MONITOR UNIT
    const monitorGroup = new THREE.Group();
    const housingGeom = new THREE.BoxGeometry(2, 1.8, 1.4);
    const housing = new THREE.Mesh(housingGeom, retroBeige);
    monitorGroup.add(housing);

    const bezelGeom = new THREE.BoxGeometry(2.1, 1.9, 0.1);
    const bezel = new THREE.Mesh(bezelGeom, retroBeige);
    bezel.position.z = 0.7;
    monitorGroup.add(bezel);

    const screenGeom = new THREE.PlaneGeometry(1.6, 1.3);
    const screen = new THREE.Mesh(screenGeom, screenMaterial);
    screen.position.z = 0.76;
    monitorGroup.add(screen);

    for(let i=0; i<8; i++) {
        const ventGeom = new THREE.BoxGeometry(1.6, 0.02, 0.2);
        const vent = new THREE.Mesh(ventGeom, industrialGrey);
        vent.position.set(0, 0.6 - (i*0.15), -0.7);
        monitorGroup.add(vent);
    }
    pcGroup.add(monitorGroup);

    // 2. CPU UNIT
    const chassisGroup = new THREE.Group();
    chassisGroup.position.y = -1.3;
    const bodyGeom = new THREE.BoxGeometry(2.6, 0.8, 2.4);
    const body = new THREE.Mesh(bodyGeom, industrialGrey);
    chassisGroup.add(body);

    const driveGroup = new THREE.Group();
    driveGroup.position.set(0.65, 0, 1.21);
    for(let i=0; i<2; i++) {
        const slotGeom = new THREE.BoxGeometry(0.8, 0.1, 0.1);
        const slot = new THREE.Mesh(slotGeom, industrialGrey);
        slot.position.y = 0.15 - (i*0.3);
        driveGroup.add(slot);
        const btnGeom = new THREE.BoxGeometry(0.1, 0.05, 0.05);
        const btn = new THREE.Mesh(btnGeom, accentMaterial);
        btn.position.set(0.5, 0.15 - (i*0.3), 0);
        driveGroup.add(btn);
    }
    chassisGroup.add(driveGroup);

    const ledGeom = new THREE.SphereGeometry(0.04, 16, 16);
    const led = new THREE.Mesh(ledGeom, new THREE.MeshBasicMaterial({ color: 0xff3300 }));
    led.position.set(-1, -0.2, 1.21);
    chassisGroup.add(led);
    pcGroup.add(chassisGroup);

    // 3. KEYBOARD
    const kbGeom = new THREE.BoxGeometry(2.2, 0.1, 0.8);
    const kb = new THREE.Mesh(kbGeom, retroBeige);
    kb.position.set(0, -1.6, 2);
    kb.rotation.x = -0.15;
    pcGroup.add(kb);

    pcGroup.traverse((node) => {
        if (node instanceof THREE.Mesh && node.geometry && node.material !== screenMaterial) {
            const wire = new THREE.Mesh(node.geometry, wireframeMaterial);
            wire.position.copy(node.position);
            wire.rotation.copy(node.rotation);
            wire.scale.copy(node.scale);
            node.parent.add(wire);
        }
    });

    scene.add(pcGroup);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const monitorGlow = new THREE.PointLight(0x00ffcc, 3, 6);
    monitorGlow.position.set(0, 0, 1.2);
    monitorGroup.add(monitorGlow);

    camera.position.z = 6;
    camera.position.y = 0.2;

    // --- Animation ---
    let frameId;
    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      drawScreen(time);

      pcGroup.position.y = Math.sin(time * 0.0006) * 0.12;
      pcGroup.rotation.y = Math.sin(time * 0.0003) * 0.2;
      
      monitorGlow.intensity = 2 + Math.random() * 1.5;
      led.material.opacity = 0.5 + Math.sin(time * 0.004) * 0.5;

      renderer.render(scene, camera);
    };

    animate(0);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      pcGroup.traverse((node) => {
        if (node instanceof THREE.Mesh) {
            node.geometry.dispose();
            node.material.dispose();
        }
      });
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen scale-[1.4] md:scale-[1.8]"
    />
  );
}
