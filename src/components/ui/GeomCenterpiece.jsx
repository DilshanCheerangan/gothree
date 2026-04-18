import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GeomCenterpiece({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

    const logoImg = new Image();
    logoImg.src = "/logoG.svg";
    let logoLoaded = false;
    logoImg.onload = () => { logoLoaded = true; };

    let scrollTextY = 0;
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

    const drawScreen = (time, intensity) => {
      // Brand Gold Background
      ctx.fillStyle = `rgba(31, 24, 16, ${intensity})`;
      ctx.fillRect(0, 0, 512, 512);

      if (intensity < 0.1) return;

      // Draw Action Logo (Gold Glow)
      if (logoLoaded) {
        ctx.globalAlpha = intensity;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#a67c3b";
        ctx.drawImage(logoImg, 256 - 140, 10, 280, 300);
      }

      // Draw Terminal Text (Amber/Gold)
      ctx.font = "bold 24px monospace";
      ctx.fillStyle = `rgba(166, 124, 59, ${intensity})`; // Brand Gold
      ctx.shadowBlur = 8;
      
      lines.forEach((line, i) => {
        const y = 320 + (i * 30) - (scrollTextY % (lines.length * 30));
        if (y > 280 && y < 500) {
          ctx.fillText("> " + line, 60, y);
        }
      });
      scrollTextY += 1.25;

      // Scanlines (Warm)
      ctx.fillStyle = `rgba(0, 0, 0, ${0.4 * intensity})`;
      for (let i = 0; i < 512; i += 4) {
        ctx.fillRect(0, i + (time % 4), 512, 2);
      }
      texture.needsUpdate = true;
    };

    // --- Materials (PBR - Brand Pallete) ---
    const brandGold = 0xa67c3b;
    const retroBeige = new THREE.MeshStandardMaterial({ color: 0xd8d2c2, roughness: 0.6 });
    const industrialGrey = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
    const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: brandGold, metalness: 0.9, roughness: 0.2 });
    const solidAccentMaterial = new THREE.MeshBasicMaterial({ color: brandGold }); 
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: brandGold, wireframe: true, transparent: true, opacity: 0.1 });

    const pcGroup = new THREE.Group();
    
    // 1. MONITOR UNIT
    const monitorGroup = new THREE.Group();
    const housing = new THREE.Mesh(new THREE.BoxGeometry(2, 1.8, 1.4), retroBeige);
    monitorGroup.add(housing);
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.9, 0.1), retroBeige);
    bezel.position.z = 0.7;
    monitorGroup.add(bezel);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3), screenMaterial);
    screen.position.z = 0.76;
    monitorGroup.add(screen);
    for(let i=0; i<8; i++) {
        const vent = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.02, 0.2), industrialGrey);
        vent.position.set(0, 0.6 - (i*0.15), -0.7);
        monitorGroup.add(vent);
    }
    pcGroup.add(monitorGroup);

    // 2. CPU UNIT
    const chassisGroup = new THREE.Group();
    chassisGroup.position.y = -1.3;
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 2.4), industrialGrey);
    chassisGroup.add(body);
    const driveGroup = new THREE.Group();
    driveGroup.position.set(0.65, 0, 1.21);
    for(let i=0; i<2; i++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.1), industrialGrey);
        slot.position.y = 0.15 - (i*0.3);
        driveGroup.add(slot);
        const btn = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.05), accentMaterial);
        btn.position.set(0.5, 0.15 - (i*0.3), 0);
        driveGroup.add(btn);
    }
    chassisGroup.add(driveGroup);
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.04), new THREE.MeshBasicMaterial({ color: 0xff3300 }));
    led.position.set(-1, -0.2, 1.21);
    chassisGroup.add(led);
    pcGroup.add(chassisGroup);

    // 3. KEYBOARD
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, -1.6, 2);
    kbGroup.rotation.x = -0.15;

    const kbBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.8), retroBeige);
    kbGroup.add(kbBase);

    // Individual Keycaps
    const keyGeom = new THREE.BoxGeometry(0.12, 0.08, 0.12);
    const rows = 5;
    const cols = 14;
    for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
        // Space Bar check (bottom row, middle)
        if (r === 4 && (c > 3 && c < 10)) continue; 

        const isAccent = (r === 0 && c === 0) || (r === 2 && c === 13); // ESC and Enter
        const key = new THREE.Mesh(keyGeom, isAccent ? solidAccentMaterial : industrialGrey);
        key.position.set(-1 + c * 0.155, 0.08, -0.3 + r * 0.15);
        kbGroup.add(key);
      }
    }
    // Space Bar Mesh
    const spaceBar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.12), industrialGrey);
    spaceBar.position.set(0, 0.08, -0.3 + 4 * 0.15);
    kbGroup.add(spaceBar);

    pcGroup.add(kbGroup);

    // 4. ERGONOMIC MOUSE
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(1.6, -1.63, 1.8);
    
    const mouseBodyGeom = new THREE.SphereGeometry(0.18, 16, 16);
    mouseBodyGeom.scale(1, 0.4, 1.4);
    const mouseBody = new THREE.Mesh(mouseBodyGeom, retroBeige);
    mouseGroup.add(mouseBody);
    
    const scrollWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 8), solidAccentMaterial);
    scrollWheel.rotation.z = Math.PI / 2;
    scrollWheel.position.set(0, 0.08, -0.1);
    mouseGroup.add(scrollWheel);
    
    pcGroup.add(mouseGroup);

    // 5. CABLING
    const cableMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const mCable = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 1.2), cableMaterial);
    mCable.position.set(1.6, -1.6, 1);
    pcGroup.add(mCable);
    const kbCable = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.8), cableMaterial);
    kbCable.position.set(0, -1.6, 1.4);
    pcGroup.add(kbCable);

    scene.add(pcGroup);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const monitorGlow = new THREE.PointLight(brandGold, 4, 6);
    monitorGlow.position.set(0, 0, 1.2);
    monitorGroup.add(monitorGlow);

    camera.position.z = 6;
    camera.position.y = 0.2;

    let targetRotY = 0;
    let targetRotX = 0;

    const animate = (time) => {
      frameId = requestAnimationFrame(animate);

      targetRotY = mouseRef.current.x * 0.4;
      targetRotX = mouseRef.current.y * 0.2;
      
      pcGroup.rotation.y += (targetRotY - pcGroup.rotation.y) * 0.05;
      pcGroup.rotation.x += (targetRotX - pcGroup.rotation.x) * 0.05;

      const progress = typeof scrollProgress === "object" ? scrollProgress.get() : scrollProgress;
      const entranceScale = 0.8 + Math.min(0.4, progress * 2);
      const screenIntensity = Math.min(1, Math.max(0, (progress - 0.1) * 6));
      
      pcGroup.scale.setScalar(entranceScale);
      drawScreen(time, screenIntensity);
      monitorGlow.intensity = 4 * screenIntensity;

      pcGroup.position.y = Math.sin(time * 0.0006) * 0.08;
      led.material.opacity = (0.5 + Math.sin(time * 0.004) * 0.5) * screenIntensity;

      renderer.render(scene, camera);
    };

    let frameId = requestAnimationFrame(animate);

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
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    />
  );
}
