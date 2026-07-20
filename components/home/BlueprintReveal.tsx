'use client';

import { useEffect, useRef } from 'react';
import styles from './BlueprintReveal.module.css';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uBlueprint;
  uniform sampler2D uReal;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    vec4 blueprint = texture2D(uBlueprint, vUv);
    vec4 real = texture2D(uReal, vUv);

    float scanY = uProgress;
    float scanLine = 1.0 - smoothstep(0.0, 0.05, abs(vUv.y - scanY));

    float wipe = 1.0 - smoothstep(scanY - 0.015, scanY + 0.015, vUv.y);
    vec4 color = mix(blueprint, real, wipe);
    color.rgb += vec3(0.55, 0.85, 0.65) * scanLine * 0.6;

    gl_FragColor = color;
  }
`;

function coverUv(tex: import('three').Texture, containerAspect: number) {
  const img = tex.image as HTMLImageElement;
  if (!img?.width || !img?.height) return;
  const imgAspect = img.width / img.height;
  if (imgAspect > containerAspect) {
    tex.repeat.set(containerAspect / imgAspect, 1);
    tex.offset.set((1 - containerAspect / imgAspect) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / containerAspect);
    tex.offset.set(0, (1 - imgAspect / containerAspect) / 2);
  }
  tex.needsUpdate = true;
}

export default function BlueprintReveal() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        mount.classList.add(styles.fallback);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const loader = new THREE.TextureLoader();
      const blueprintTex = loader.load('/denah-type40.jpeg', (t) => coverUv(t, mount.clientWidth / mount.clientHeight));
      const realTex = loader.load('/render-exterior.jpeg', (t) => coverUv(t, mount.clientWidth / mount.clientHeight));
      [blueprintTex, realTex].forEach((t) => {
        t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
        t.colorSpace = THREE.SRGBColorSpace;
      });

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uBlueprint: { value: blueprintTex },
          uReal: { value: realTex },
          uProgress: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const computeProgress = () => {
        const rect = mount.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (vh - rect.top) / (vh + rect.height);
        return Math.min(1, Math.max(0, p));
      };

      let raf = 0;
      const render = () => {
        material.uniforms.uProgress.value = computeProgress();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      render();

      const onResize = () => {
        if (!mount) return;
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        const aspect = mount.clientWidth / mount.clientHeight;
        coverUv(blueprintTex, aspect);
        coverUv(realTex, aspect);
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        geometry.dispose();
        material.dispose();
        blueprintTex.dispose();
        realTex.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div ref={mountRef} className={styles.canvasMount} />
      <div className={styles.badge}>
        <span className={styles.badgeDotBlue}>Blueprint</span>
        <span className={styles.badgeDotGreen}>Realisasi</span>
      </div>
    </div>
  );
}
