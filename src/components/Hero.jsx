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
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
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
    
    // Core dark metallic material
    const metalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111111),
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0 // For fade in
    });

    // Outer primary ring
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.06, 32, 100);
    const ring1 = new THREE.Mesh(ring1Geo, metalMat);
    rings.add(ring1);

    // Middle gold-accented ring
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4af37), // Brighter gold
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

    // A tiny intense core orb
    const coreGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0xb8935a),
      emissiveIntensity: 2.0,
      transparent: true,
      opacity: 0
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    rings.add(core);

    rings.scale.setScalar(0);
    // Lighting
    const keyLight = new THREE.DirectionalLight(0xc8a060, 2.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2033aa, 0.8);
    rimLight.position.set(-4, -1, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xb08030, 3.5, 6);
    pointLight.position.set(0, 2.5, 1.5);
    scene.add(pointLight);

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
        coreMat.opacity = ep * 1.0;
      }

      // Safe fallback to prevent NaN crashes
      const currentMouseX = window.mousePosX || 0;
      const currentMouseY = window.mousePosY || 0;

      // Smooth parallax targeting using JS closure
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
      const finalScale = entryProgress < 1 ? easeOutExpo(entryProgress) * 1.0 : breathScale;
      rings.scale.setScalar(finalScale);

      pointLight.position.x = Math.sin(elapsed * 0.4) * 2.5;
      pointLight.position.z = Math.cos(elapsed * 0.4) * 2.5 + 1;
      pointLight.intensity = 3.0 + Math.sin(elapsed * 0.9) * 0.6;

      camera.position.x += (targetX * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (targetY * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

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
      coreGeo.dispose();
      metalMat.dispose();
      accentMat.dispose();
      coreMat.dispose();
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
      className="relative w-full h-screen overflow-hidden bg-brand-deep flex items-center justify-between pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_40%,#35261b_0%,#181008_45%,#000000_100%)] -z-10" />

      {/* LEFT CONTENT */}
      <motion.div 
        className="absolute left-[clamp(3rem,6vw,8rem)] top-[55%] -translate-y-1/2 w-[35vw] text-left z-10 pointer-events-auto cursor-default"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02, x: 10, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        transition={{ duration: 1.4, ease: "circOut" }}
        style={{ y: yLeft, opacity: opacityText }}
      >
        <span className="text-brand-accent tracking-[0.3em] uppercase text-xs font-inter mb-6 block font-bold">
          Elite Programs
        </span>
        <h1 className="display-font text-[clamp(3.5rem,6.5vw,7.5rem)] font-light text-white leading-[0.9] tracking-tight">
          We build <br /> <em className="italic font-bold text-brand-cream">real skills.</em>
        </h1>
        
        <div className="mt-[6vh] max-w-[280px]">
          <hr className="w-12 border-t-2 border-white/40 mb-6" />
          <p className="font-inter text-sm text-brand-silver leading-relaxed font-light">
            Hands-on technical internships designed around your ambition. 
            Focus on what truly matters, and leave the noise behind.
          </p>
        </div>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div 
        className="absolute right-[clamp(3rem,6vw,8rem)] top-[55%] -translate-y-1/2 w-[35vw] text-right z-10 pointer-events-auto flex flex-col items-end justify-between h-[40vh] cursor-default"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02, x: -10, filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))" }}
        transition={{ duration: 1.4, ease: "circOut" }}
        style={{ y: yRight, opacity: opacityText }}
      >
        <h2 className="display-font text-[clamp(3.5rem,6.5vw,7.5rem)] font-light text-white leading-[0.9] tracking-tight">
          We create <br /> <span className="font-bold">impact.</span>
        </h2>

        <div className="w-full max-w-[320px]">
          <hr className="w-full border-t border-white/20 mb-6" />
          <div className="flex justify-between items-center w-full font-inter text-[0.6rem] font-bold tracking-[0.15em] text-brand-silver uppercase">
            <span className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
              Scroll Down
            </span>
            <span>Begin</span>
          </div>
        </div>
      </motion.div>

      {/* EXPLORE CTA */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
      >
        <a 
          href="#programs" 
          className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <span className="font-space text-sm font-bold tracking-tight">Explore Programs</span>
          <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
