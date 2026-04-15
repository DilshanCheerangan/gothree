"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects tied to scroll
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
      className="relative w-full min-h-screen bg-brand-deep flex flex-col justify-between items-center py-16 md:py-24 px-8 md:px-16"
    >
      {/* Background & Canvas */}
      <div className="absolute inset-0 z-[-2] overflow-hidden">
        <motion.img
          src="/hero-bg.png"
          alt="Technical background"
          className="w-full h-full object-cover opacity-10 scale-110 grayscale brightness-125"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.1, scale: 1.05 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-brand-deep/5" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />

      {/* Lighting Overlays */}
      <div className="absolute inset-0 -z-10 bg-brand-deep overflow-hidden">
        <div 
          className="absolute top-0 -left-[15%] w-[60%] h-full blur-[100px]" 
          style={{ background: "radial-gradient(circle at left, var(--glow-color) 0%, transparent 65%)" }}
        />
        <div 
          className="absolute top-0 -right-[15%] w-[60%] h-full blur-[100px]" 
          style={{ background: "radial-gradient(circle at right, var(--glow-color) 0%, transparent 65%)" }}
        />
      </div>

      {/* TOP CONTENT: "We build real skills" */}
      <motion.div
        className="relative z-10 w-full max-w-7xl flex flex-col items-start text-left order-1 mt-12 md:mt-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "circOut" }}
        style={{ opacity: opacityText }}
      >
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="h-[1px] w-8 bg-brand-accent" />
          <span className="text-brand-accent tracking-[0.3em] uppercase text-[10px] md:text-xs font-inter font-bold">
            Elite Programs
          </span>
        </div>
        <h1 className="display-font text-[clamp(2.5rem,6.2vw,7.5rem)] font-light text-brand-white leading-[0.9] tracking-tight">
          We build <br /> <em className="italic font-bold text-brand-accent">real skills.</em>
        </h1>
        <div className="mt-6 md:mt-8 max-w-[280px]">
          <p className="font-inter text-xs md:text-sm text-brand-silver leading-relaxed font-light">
            Hands-on technical internships designed around your ambition.
          </p>
        </div>
      </motion.div>

      {/* CENTER: Gyroscope Reserved Space (Sandwich Gap) */}
      <div className="flex-1 w-full order-2 min-h-[40vh] md:min-h-0 relative pointer-events-none" aria-hidden="true" />

      {/* BOTTOM CONTENT: "We create impact" */}
      <motion.div
        className="relative z-10 w-full max-w-7xl flex flex-col items-end text-right order-3 mb-10 md:mb-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "circOut" }}
        style={{ opacity: opacityText }}
      >
        <h2 className="display-font text-[clamp(2.5rem,6.2vw,7.5rem)] font-light text-brand-white leading-[0.9] tracking-tight mb-8 md:mb-12">
          We create <br /> <span className="font-bold text-brand-white">impact.</span>
        </h2>

        {/* EXPLORE CTA */}
        <motion.div
          className="relative pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <a
            href="#program-1"
            className="group relative flex items-center gap-4 bg-brand-white text-brand-void px-8 py-4 rounded-full overflow-hidden transition-all duration-500 shadow-xl shadow-brand-accent/5"
          >
            <div className="absolute inset-0 bg-brand-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative font-inter text-xs md:text-sm font-black tracking-widest uppercase z-10 group-hover:text-white transition-colors">Explore Programs</span>
            <div className="relative w-2 h-2 bg-brand-void rounded-full z-10 group-hover:scale-[3] group-hover:bg-brand-white transition-all duration-500" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
