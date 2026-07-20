'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroAtmosphere.module.css';

const COLORS = [0x7a9e6e, 0xc9a84c, 0xffffff];
const PARTICLE_COUNT = 260;

export default function HeroAtmosphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: import('three').WebGLRenderer;
    let disposed = false;

    (async () => {
      const THREE = await import('three');
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 18;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const speeds = new Float32Array(PARTICLE_COUNT);
      const color = new THREE.Color();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
        speeds[i] = Math.random() * 0.6 + 0.15;
        color.set(COLORS[Math.floor(Math.random() * COLORS.length)]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let scrollY = window.scrollY;
      const onScroll = () => { scrollY = window.scrollY; };
      window.addEventListener('scroll', onScroll, { passive: true });

      let raf = 0;
      let lastTime = performance.now();

      const animate = () => {
        raf = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;
        const posAttr = geometry.attributes.position as import('three').BufferAttribute;

        if (!reduceMotion) {
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const y = posAttr.getY(i) + speeds[i] * dt;
            posAttr.setY(i, y > 10 ? -10 : y);
          }
          posAttr.needsUpdate = true;
          points.rotation.y += dt * 0.015;
        }

        camera.position.x = scrollY * 0.004;
        camera.rotation.z = -scrollY * 0.00005;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      (mount as HTMLDivElement & { __cleanup?: () => void }).__cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      const cleanup = (mount as (HTMLDivElement & { __cleanup?: () => void }) | null)?.__cleanup;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className={styles.atmosphere} />;
}
