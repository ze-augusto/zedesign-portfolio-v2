'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// meshline custom elements for TS/JSX
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: object;
    meshLineMaterial: object;
  }
}

// Card matches Figma node 103:11096 (372 x 584); texture is the same aspect.
const CARD_W = 3.2;
const CARD_H = (CARD_W * 1752) / 1116; // ~5.02

// Pivot sits just above the top edge so the cord enters from the top of frame.
const PIVOT = new THREE.Vector3(0, 3.3, 0);
const ROPE_LEN = PIVOT.y; // pivot -> card center at rest (card centered, y=0)
const DURATION = 2; // seconds; animation ends after this

export default function Lanyard() {
  return (
    <Canvas
      className="lanyard-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 13.3], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <Suspense fallback={null}>
        <Band />
      </Suspense>
    </Canvas>
  );
}

function Band() {
  const card = useRef<THREE.Group>(null);
  const band = useRef<THREE.Mesh>(null);
  const { width, height } = useThree((s) => s.size);

  const texture = useTexture('/images/id_card.png');

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
  }, [texture]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  const start = useRef<number | null>(null);

  const apply = (theta: number) => {
    if (!card.current) return;

    // Card center swings on a pendulum hanging from PIVOT.
    const cx = PIVOT.x + ROPE_LEN * Math.sin(theta);
    const cy = PIVOT.y - ROPE_LEN * Math.cos(theta);
    card.current.position.set(cx, cy, 0);
    card.current.rotation.z = theta;

    // Cord runs from the card's clip slot (top center) up to the pivot.
    // +0.15 lets the cord tip tuck into the clip; z is behind the card so the
    // card occludes the tip (reads as inserted into the lanyard hole).
    const r = ROPE_LEN - CARD_H / 2 + 0.15;
    const topX = PIVOT.x + r * Math.sin(theta);
    const topY = PIVOT.y - r * Math.cos(theta);

    curve.points[0].set(topX, topY, 0);
    curve.points[1].set((topX + PIVOT.x) / 2, (topY + PIVOT.y) / 2, 0);
    curve.points[2].copy(PIVOT);

    const geo = band.current?.geometry as unknown as {
      setPoints: (pts: THREE.Vector3[]) => void;
    };
    geo?.setPoints(curve.getPoints(32));
  };

  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;

    // Damped pendulum: small wobble (left/right) then settles to center. After
    // DURATION it stays clamped at center (animation ends, cord stays glued).
    const theta =
      t >= DURATION ? 0 : 0.3 * Math.exp(-2.4 * t) * Math.cos(6.2 * t);
    apply(theta);
  });

  return (
    <>
      {/* Cord behind the card so its tip tucks into the clip slot. */}
      <mesh ref={band} position={[0, 0, -0.05]}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#6d6d6d"
          resolution={[width, height]}
          lineWidth={0.3}
          toneMapped={false}
        />
      </mesh>

      <group ref={card}>
        <mesh>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}
