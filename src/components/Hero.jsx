"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Mouse parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse following parallax disabled to prevent lag
    // Keeping state structure intact to avoid breaking Three.js closure logic
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Titanium Gyroscope (Engineered Rings)
    const rings = new THREE.Group();
    scene.add(rings);

    // Luxurious light metallic material
    const metalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdddddd), // Brighter base
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0
    });

    // Outer primary ring
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.06, 32, 100);
    const ring1 = new THREE.Mesh(ring1Geo, metalMat);
    rings.add(ring1);

    // Middle gold-accented ring
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x2e5bff), // ELECTRIC BLUE ACCENT
      roughness: 0.1,
      metalness: 1.0,
      transparent: true,
      opacity: 0
    });
    const ring2Geo = new THREE.TorusGeometry(1.2, 0.04, 32, 100);
    const ring2 = new THREE.Mesh(ring2Geo, accentMat);
    rings.add(ring2);

    // Inner thicker structural ring
    const ring3Geo = new THREE.TorusGeometry(0.8, 0.1, 32, 64);
    const ring3 = new THREE.Mesh(ring3Geo, metalMat);
    rings.add(ring3);

    // Central Branded Logo Core (Icon only)
    const logoTexture = new THREE.TextureLoader().load('/logoG.svg');
    const iconGeo = new THREE.PlaneGeometry(0.6, 0.9); // Refined to be slightly larger
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.DoubleSide,
      color: new THREE.Color(0x2e5bff), 
      opacity: 0
    });
    const logoMesh = new THREE.Mesh(iconGeo, logoMat);
    logoMesh.position.set(0, 0, 0);
    scene.add(logoMesh);

    // Lighting - Electric Blue Theme
    const keyLight = new THREE.DirectionalLight(0x2e5bff, 5.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00d4ff, 3.5);
    rimLight.position.set(-4, -1, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffffff, 45.0, 80);
    pointLight.position.set(0, 0, 1.2);
    scene.add(pointLight);

    // SIDE LIGHTS - Cinematic Blue Highlights
    const leftLight = new THREE.PointLight(0x2e5bff, 25.0, 100);
    leftLight.position.set(-8, 0, 2);
    scene.add(leftLight);

    const rightLight = new THREE.PointLight(0x2e5bff, 25.0, 100);
    rightLight.position.set(8, 0, 2);
    scene.add(rightLight);

    const fillLight = new THREE.PointLight(0xffffff, 12.0, 120);
    fillLight.position.set(0, 0, -5);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Animation variables
    let animationFrameId;
    const clock = new THREE.Clock();
    let entryProgress = 0;
    const entryStart = performance.now() + 500;
    let targetX = 0;
    let targetY = 0;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      const now = performance.now();

      // Entry animation
      if (entryProgress < 1) {
        const t = Math.max(0, (now - entryStart) / 2600);
        entryProgress = Math.min(1, t);
        const ep = easeOutExpo(entryProgress);
        
        rings.scale.setScalar(ep * 1.0);
        metalMat.opacity = ep * 1.0;
        accentMat.opacity = ep * 0.9;
        logoMat.opacity = ep * 1.0;
      }

      const currentMouseX = window.mousePosX || 0;
      const currentMouseY = window.mousePosY || 0;
      targetX += (currentMouseX - targetX) * 0.04;
      targetY += (currentMouseY - targetY) * 0.04;

      ring1.rotation.x = elapsed * 0.2;
      ring1.rotation.y = elapsed * 0.1;
      ring2.rotation.y = elapsed * -0.3;
      ring2.rotation.z = elapsed * 0.2;
      ring3.rotation.x = elapsed * -0.15;
      ring3.rotation.z = elapsed * -0.25;

      rings.rotation.y = targetX * 0.4;
      rings.rotation.x = -targetY * 0.2;

      const breathScale = 1 + Math.sin(elapsed * 0.5) * 0.012;
      const isMobile = window.innerWidth < 768;
      // Further reduced scale for extreme mobile screens
      const baseScale = isMobile ? (window.innerWidth < 400 ? 0.3 : 0.45) : 1.0; 
      const ep = easeOutExpo(entryProgress);
      const finalScale = (entryProgress < 1 ? ep : breathScale) * baseScale;
      
      rings.scale.setScalar(finalScale);
      logoMesh.scale.setScalar(finalScale);
      
      // Shift 3D model much further down on mobile
      // Centralize 3D model on all devices but maintain scale offsets
      rings.position.y = 0;
      logoMesh.position.y = 0;

      pointLight.position.set(0, rings.position.y, 1.0);
      pointLight.intensity = 45.0 + Math.sin(elapsed * 2.0) * 5.0;

      camera.position.x += (targetX * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (targetY * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(new THREE.Vector3(0, rings.position.y, 0));

      const isDark = document.documentElement.classList.contains('dark');
      const accentColor = isDark ? 0xa67c3b : 0x2e5bff; // Gold in dark, Blue in light
      const keyLightColor = isDark ? 0xc8a060 : 0x2e5bff;
      const rimLightColor = isDark ? 0xffffff : 0x00d4ff;
      const sideLightColor = isDark ? 0xe6c79a : 0x2e5bff;
      
      // REQUEST: logo electric blue in light mode, white in dark mode
      const logoColor = isDark ? 0xffffff : 0x2e5bff; 
      const emissiveIntensity = isDark ? 0.2 : 1.2;
      const emissiveColor = isDark ? 0xffffff : 0x2e5bff;

      accentMat.color.setHex(accentColor);
      logoMat.color.setHex(logoColor); // Always pure Electric Blue or White
      keyLight.color.setHex(keyLightColor);
      rimLight.color.setHex(rimLightColor);
      leftLight.color.setHex(sideLightColor);
      rightLight.color.setHex(sideLightColor);

      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      iconGeo.dispose();
      metalMat.dispose();
      accentMat.dispose();
      logoMat.dispose();
    };
  }, []);

  // Sync state to global window for Three.js closure access without re-rendering
  useEffect(() => {
    window.mousePosX = mousePos.x;
    window.mousePosY = mousePos.y;
  }, [mousePos]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-brand-deep overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/hero-bg.png"
          alt="Technical background"
          className="w-full h-full object-cover opacity-10 scale-110 grayscale brightness-125"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.1, scale: 1.05 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-brand-deep/10" />
      </div>

      {/* Ambient glow overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 -left-[15%] w-[55%] h-full blur-[120px]"
          style={{ background: "radial-gradient(circle at left, var(--glow-color) 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-0 -right-[15%] w-[55%] h-full blur-[120px]"
          style={{ background: "radial-gradient(circle at right, var(--glow-color) 0%, transparent 65%)" }}
        />
      </div>

      {/* Three.js Canvas — the central focal element */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* ── TOP-LEFT: Main headline ── */}
      <div className="absolute top-[18%] md:top-[18%] left-[8%] md:left-14 z-20 max-w-[85%] md:max-w-[42vw]">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.2, ease: "circOut" }}
           className="flex items-center gap-3 mb-4"
        >
          <div className="h-[1px] w-6 bg-brand-accent" />
          <span className="text-brand-accent tracking-[0.3em] uppercase text-[9px] font-inter font-bold">
            Elite Programs
          </span>
        </motion.div>
        
        <h1 className="display-font text-[clamp(2.5rem,10vw,7rem)] md:text-[clamp(2.2rem,5.5vw,7rem)] font-light text-brand-white leading-[0.85] md:leading-[0.88] tracking-tight">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block"
            >
              We build
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block italic font-bold text-brand-accent"
            >
              real skills.
            </motion.span>
          </div>
        </h1>
      </div>

      {/* ── BOTTOM-LEFT: Tagline + description ── */}
      <motion.div
        className="absolute bottom-[10%] left-8 md:left-14 z-20 max-w-[260px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
      >
        <p className="display-font text-base md:text-lg text-brand-white font-light italic leading-snug mb-4">
          Your gateway to<br />real-world impact
        </p>
        <p className="font-inter text-[11px] text-brand-silver leading-relaxed">
          Hands-on technical internships designed around your ambition — so you can build the skills that truly matter.
        </p>
      </motion.div>

      {/* ── BOTTOM-CENTER: CTA Button ── */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
          e.currentTarget.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `translate(-50%, 0)`;
        }}
      >
        <Link
          href="/internships"
          className="group relative flex items-center gap-3 bg-brand-white text-brand-void px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 ease-out shadow-xl shadow-brand-accent/10"
        >
          <div className="absolute inset-0 bg-brand-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          <span className="relative font-inter text-[11px] font-black tracking-widest uppercase z-10 group-hover:text-white transition-colors whitespace-nowrap">
            Explore Internships
          </span>
          <div className="relative w-6 h-6 rounded-full bg-brand-void/10 flex items-center justify-center z-10 group-hover:bg-white/20 transition-colors">
            <svg className="w-3 h-3 text-brand-void group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </motion.div>

      {/* ── BOTTOM-RIGHT: Counter-headline ── */}
      <div className="absolute bottom-[20%] md:bottom-[10%] right-[8%] md:right-14 z-20 text-right max-w-[70%] md:max-w-[42vw]">
        <h2 className="display-font text-[clamp(1.8rem,7vw,7rem)] md:text-[clamp(2.2rem,5.5vw,7rem)] font-light text-brand-white leading-[0.85] md:leading-[0.88] tracking-tight">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block"
            >
              We create
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block font-bold text-brand-white"
            >
              impact.
            </motion.span>
          </div>
        </h2>
      </div>

      {/* ── SCROLL DOWN indicator ── */}
      <motion.div
        className="absolute bottom-[3.5%] right-8 md:right-14 z-20 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <svg
          className="w-4 h-4 text-brand-mist animate-bounce"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 4l-7 7-7-7" />
        </svg>
        <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-brand-mist">
          Scroll Down
        </span>
        <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-brand-mist/50 ml-2">
          To Start The Journey
        </span>
      </motion.div>
    </section>
  );
}

