'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// Card matches Figma node 103:11096 (372 x 584); texture is the same aspect.
const CARD_W = 3.2;
const CARD_H = (CARD_W * 1752) / 1116; // ~5.02

// Strap width = 36px relative to the 372px-wide card art (same ratio as Figma).
const STRAP_W = (36 / 372) * CARD_W;
const PX = STRAP_W / 36; // world units per design pixel
const BORDER = 2 * PX; // 2px ink border around the strap
const INK = '#0A0A0A'; // var(--color-ink)
// How far below the card's top edge the clip slot sits (~20px of the 584 art).
const CLIP_DEPTH = (20 / 584) * CARD_H;

// Canvas is extended upward (CSS) to reach the topbar, so the pivot sits near
// the top of the frame (topbar level) and the card hangs lower, in the hero.
const PIVOT = new THREE.Vector3(0, 3.5, 0);
const ROPE_LEN = 3.98; // pivot -> card center at rest (card center ~ -0.48)
// Strap runs from the pivot down to the card hole; +1px so it ends in the hole.
const STRAP_LEN = ROPE_LEN - CARD_H / 2 + CLIP_DEPTH + 1 * PX;

export default function Lanyard({ lang = 'PT' }: { lang?: 'PT' | 'EN' }) {
  return (
    <Canvas
      className="lanyard-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 15.5], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <Suspense fallback={null}>
        <Band lang={lang} />
      </Suspense>
    </Canvas>
  );
}

function Band({ lang }: { lang: 'PT' | 'EN' }) {
  const card = useRef<THREE.Group>(null);
  const strap = useRef<THREE.Group>(null);

  // PT art always exists → safe to load via suspense. EN is optional: load it
  // async and fall back to PT if the file is missing (no crash while absent).
  const ptTexture = useTexture('/images/id_card.png');
  const [texture, setTexture] = useState<THREE.Texture>(ptTexture);

  useEffect(() => {
    if (lang !== 'EN') {
      setTexture(ptTexture);
      return;
    }
    let active = true;
    new THREE.TextureLoader().load(
      '/images/id_card_en.png',
      (t) => active && setTexture(t),
      undefined,
      () => active && setTexture(ptTexture), // missing EN art → keep PT
    );
    return () => { active = false; };
  }, [lang, ptTexture]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
  }, [texture]);

  const start = useRef<number | null>(null);

  const apply = (theta: number) => {
    if (!card.current || !strap.current) return;

    // Card center swings on a pendulum hanging from PIVOT.
    card.current.position.set(
      PIVOT.x + ROPE_LEN * Math.sin(theta),
      PIVOT.y - ROPE_LEN * Math.cos(theta),
      0,
    );
    card.current.rotation.z = theta;

    // Strap is a straight band from the pivot toward the clip; it rotates with
    // the swing. Its midpoint sits halfway down that radial line.
    strap.current.position.set(
      PIVOT.x + (STRAP_LEN / 2) * Math.sin(theta),
      PIVOT.y - (STRAP_LEN / 2) * Math.cos(theta),
      0.06,
    );
    strap.current.rotation.z = theta;
  };

  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;

    // Damped swing: left, right, gentle decreasing swings, naturally slowing to
    // center. No clamp — the exponential drives both amplitude and speed to ~0
    // (settled by ~7s), so the card never stops abruptly.
    const theta = -0.3 * Math.exp(-0.6 * t) * Math.sin(2.2 * t);
    apply(theta);
  });

  return (
    <>
      {/* Strap: flat band with a 2px ink border, in front so it stays visible
          down into the card hole. Outline plane behind = the border. */}
      <group ref={strap}>
        <mesh>
          <planeGeometry args={[STRAP_W + 2 * BORDER, STRAP_LEN + 2 * BORDER]} />
          <meshBasicMaterial color={INK} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[STRAP_W, STRAP_LEN]} />
          <meshBasicMaterial color="#6d6d6d" toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={card}>
        <mesh>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}
