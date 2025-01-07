import React, { useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
  const { nodes } = useGLTF("/medias/jinx.glb");
  const { viewport } = useThree();
  const jinx = useRef(null);

  useFrame(() => {
    if (jinx.current) {
      jinx.current.rotation.y += 0.002;
    }
  });

  return (
    <group scale={viewport.width / 100}>
      <mesh ref={jinx} {...nodes.Jinx}>
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}
