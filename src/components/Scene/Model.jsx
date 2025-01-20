"use client";

import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function Model() {
  const ionicModel = useGLTF("/medias/ionic.glb");
  console.log("Ionic model nodes:", ionicModel.nodes);
  console.log("Ionic model scene:", ionicModel);

  const models = [
    { nodes: useGLTF("/medias/v0.glb").nodes, key: "v0" },
    { nodes: useGLTF("/medias/tailwind.glb").nodes, key: "Curve" },
    { nodes: useGLTF("/medias/next.glb").nodes, key: "Curve" },
    { nodes: useGLTF("/medias/figma.glb").nodes, key: "Figma" },
    { nodes: useGLTF("/medias/illustrator.glb").nodes, key: "Illustrator" },
    { nodes: useGLTF("/medias/react.glb").nodes, key: "React" },
    { nodes: useGLTF("/medias/ionic.glb").nodes, key: "Iconic" },
    { nodes: useGLTF("/medias/bolt.glb").nodes, key: "Bolt" },
  ];

  const { viewport } = useThree();
  const Reference = useRef([]);

  const positions = [
    [-27, -12, 3],
    [3, 15, -6],
    [-21, 3, -3],
    [24, 18, -6],
    [-42, 27, -21],
    [-9, -24, -12],
    [24, -12, -6],
    [24, 0, 3],
  ];

  const rotationDirection = useRef(1);
  const maxRotation = Math.PI / 4;

  useFrame(() => {
    Reference.current.forEach((ref) => {
      if (ref) {
        if (ref.rotation.z >= maxRotation) {
          rotationDirection.current = -1;
        } else if (ref.rotation.z <= -maxRotation) {
          rotationDirection.current = 1;
        }

        ref.rotation.z += 0.0005 * rotationDirection.current;
      }
    });
  });

  const materialProps = useControls({
    thickness: { value: 0.4, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 0.95, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.5, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.04, min: 0, max: 1 },
    backside: { value: true },
    clearcoat: { value: 1 },
    clearcoatRoughness: { value: 0.1 },
    color: { value: "#FFC0CB" },
  });

  return (
    <group scale={viewport.width / 80}>
      {positions.map((position, index) => (
        <Float
          key={index}
          speed={0.5}
          rotationIntensity={1}
          floatIntensity={1}
          floatingRange={[0, 0.01]}
        >
          <mesh
            key={index}
            ref={(el) => (Reference.current[index] = el)}
            {...models[index % models.length].nodes[
              models[index % models.length].key
            ]}
            position={position}
          >
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
