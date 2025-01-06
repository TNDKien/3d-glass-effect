"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function JinxModel() {
  const { scene } = useGLTF("/medias/jinx.glb");
  const modelRef = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          });
          child.material.transparent = true;
          child.material.opacity = 0.6;
          child.material.envMapIntensity = 2;
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={modelRef} scale={viewport.width / 50} position={[0, -10, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function JinxScene() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        <OrbitControls enablePan={false} />

        <ambientLight intensity={0.5} color="#ffffff" />

        <spotLight
          position={[30, 50, 30]}
          intensity={1.2}
          angle={0.4}
          penumbra={0.5}
          castShadow
          color="#ffffff"
        />

        <pointLight
          position={[-20, 10, -10]}
          intensity={1}
          decay={2}
          distance={100}
          color="#c1eaff"
        />

        <pointLight
          position={[10, -10, 20]}
          intensity={0.7}
          decay={1.5}
          distance={80}
          color="#ffdee3"
        />
        <Environment preset="sunset" background />

        <JinxModel />
      </Canvas>
    </div>
  );
}
