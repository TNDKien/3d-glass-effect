import React, { useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/medias/jinx.glb");
  const { viewport } = useThree();
  const jinx = useRef(null);

  useFrame(() => {
    if (jinx.current) {
      jinx.current.rotation.z += 0.005;
    }
  });

  return (
    <group scale={viewport.width / 50}>
      <mesh ref={jinx} {...nodes.Jinx} position={[0, 0, 0]}>
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}
