'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// meshline custom elements for TS/JSX
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: object;
    meshLineMaterial: object;
  }
}

const CARD_W = 1.5;
const CARD_H = (CARD_W * 1752) / 1116; // texture aspect

export default function Lanyard() {
  return (
    <Canvas
      className="lanyard-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 13], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <Suspense fallback={null}>
        <Physics gravity={[0, -30, 0]} timeStep={1 / 60} interpolate>
          <Band />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

function Band() {
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const band = useRef<THREE.Mesh>(null);
  const { width, height } = useThree((s) => s.size);

  const texture = useTexture('/images/id_card.png');
  const bandTex = useTexture('/images/band.png');

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    bandTex.colorSpace = THREE.SRGBColorSpace;
    bandTex.wrapS = bandTex.wrapT = THREE.RepeatWrapping;
  }, [texture, bandTex]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  // Rope chain: fixed -> j1 -> j2 -> j3, then card hangs from j3.
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_H / 2, 0]]);

  const v1 = useRef(new THREE.Vector3());
  const v2 = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return;

    // Smooth the two inner joints so the band reads as a flexible cord.
    [j1, j2].forEach((ref) => {
      const r = ref.current!;
      const lerped = (r as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped;
      const next = v1.current.copy(r.translation() as THREE.Vector3);
      if (!lerped) {
        (r as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped = next.clone();
      } else {
        const dist = lerped.distanceTo(next);
        const speed = Math.max(0.1, Math.min(1, dist));
        lerped.lerp(next, 0.9 * speed);
      }
    });

    const l1 = (j1.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped!;
    const l2 = (j2.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped!;

    curve.points[0].copy(j3.current.translation() as THREE.Vector3);
    curve.points[1].copy(l2 ?? (j2.current.translation() as THREE.Vector3));
    curve.points[2].copy(l1 ?? (j1.current.translation() as THREE.Vector3));
    curve.points[3].copy(fixed.current.translation() as THREE.Vector3);

    const geo = band.current?.geometry as unknown as {
      setPoints: (pts: THREE.Vector3[]) => void;
    };
    geo?.setPoints(curve.getPoints(32));

    // keep card upright-ish, no spin
    void v2;
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody ref={j1} position={[0.5, 0, 0]} type="dynamic" linearDamping={2} angularDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} type="dynamic" linearDamping={2} angularDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} type="dynamic" linearDamping={2} angularDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type="dynamic"
          linearDamping={2}
          angularDamping={3}
        >
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <mesh>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#9a9a9a"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTex}
          repeat={[-2, 1]}
          lineWidth={0.4}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
