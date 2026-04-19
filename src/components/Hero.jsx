"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // State and refs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);

  useEffect(() => {
    // Mouse following parallax disabled to prevent lag
    // Keeping state structure intact to avoid breaking Three.js closure logic
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer;
    try {
      // 1. Pre-flight check: Ensure the canvas and WebGL context are reachable
      const gl = canvasRef.current.getContext("webgl2") || canvasRef.current.getContext("webgl");
      if (!gl) {
        console.warn("Hero Section: WebGL context creation failed.");
        setIsWebGLAvailable(false);
        return;
      }

      // 2. Initialize Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        context: gl, // Use the already acquired context
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    } catch (e) {
      console.error("Hero Section: WebGL initialization failed.", e);
      setIsWebGLAvailable(false);
      return;
    }

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
    const timer = new THREE.Timer();
    let entryProgress = 0;
    const entryStart = performance.now() + 500;
    let targetX = 0;
    let targetY = 0;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      timer.update();
      const elapsed = timer.getElapsed();
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

      const accentColor = 0xa67c3b; // Gold
      const keyLightColor = 0xc8a060;
      const rimLightColor = 0xffffff;
      const sideLightColor = 0xe6c79a;

      const logoColor = 0xffffff;
      const emissiveIntensity = 0.2;
      const emissiveColor = 0xffffff;

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

      if (renderer) {
        renderer.dispose();
        renderer.renderLists.dispose();
      }

      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      iconGeo.dispose();
      metalMat.dispose();
      accentMat.dispose();
      logoMat.dispose();
      logoTexture.dispose();
    };
  }, [isWebGLAvailable]);

  // Scroll Parallax logic for text elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const yDesc = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yCTA = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yImpact = useTransform(scrollYProgress, [0, 1], [0, -280]);

  // Sync state to global window for Three.js closure access without re-rendering
  useEffect(() => {
    window.mousePosX = mousePos.x;
    window.mousePosY = mousePos.y;
  }, [mousePos]);

  // Helper component for Hero CTA Buttons
  const HeroCTA = ({ href, label, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group relative flex items-center gap-3 px-7 py-3.5 md:px-6 md:py-3 rounded-full overflow-hidden transition-all duration-300 ease-out active:scale-95 bg-white/5 backdrop-blur-md border border-white/10 text-brand-white hover:border-brand-accent/50 shadow-xl shadow-black/20"
      >
        <div className="absolute inset-0 bg-brand-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
        <span className="relative font-inter text-[11px] font-black tracking-widest uppercase z-10 group-hover:text-white transition-colors whitespace-nowrap">
          {label}
        </span>
        <div className="relative w-5 h-5 rounded-full flex items-center justify-center z-10 transition-colors bg-white/10 group-hover:bg-brand-accent">
          <svg className="w-2.5 h-2.5 transition-colors text-white group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-transparent overflow-hidden"
    >
      {/* Background neutrality — handled by BackgroundAtmosphere */}

      {/* Three.js Canvas — the central focal element */}
      {isWebGLAvailable ? (
        <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {/* Fallback branded visuals when WebGL is blocked */}
          <div className="relative w-72 h-72 opacity-20 bg-brand-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* ── TOP-LEFT: Main headline ── */}
      <motion.div
        style={{ y: yHeadline }}
        className="absolute top-[18%] md:top-[18%] left-[8%] md:left-14 z-20 max-w-[85%] md:max-w-[42vw]"
      >
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
      </motion.div>

      {/* ── BOTTOM-LEFT: Tagline + description ── */}
      <motion.div
        style={{ y: yDesc }}
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

      {/* ── BOTTOM-CENTER: Multi-Action Rail ── */}
      <motion.div
        style={{ y: yCTA }}
        className="absolute bottom-[13%] md:bottom-[8%] left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row items-center gap-3 md:gap-4"
      >
        <HeroCTA href="/internships" label="Internships" delay={1.0} />
        <HeroCTA href="/courses" label="Courses" delay={1.15} />
        <HeroCTA href="/training" label="Training" delay={1.3} />
      </motion.div>

      {/* ── BOTTOM-RIGHT: Counter-headline ── */}
      <motion.div
        style={{ y: yImpact }}
        className="absolute bottom-[20%] md:bottom-[10%] right-[8%] md:right-14 z-20 text-right max-w-[70%] md:max-w-[42vw]"
      >
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
              className="inline-block italic font-bold text-brand-accent"
            >
              impact.
            </motion.span>
          </div>
        </h2>
      </motion.div>

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

