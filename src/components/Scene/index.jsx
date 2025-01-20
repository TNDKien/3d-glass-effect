"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import BasicModel from "./BasicModel";
import Model from "./Model";
import TextModels from "./TextModels";

export default function Index() {
  return (
    <Canvas style={{ background: "#FFC0CB" }}>
      <TextModels />
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment background={false}>
        <color attach="background" args={["#FFC0CB"]} />
        {/* <mesh scale={100}> */}
        {/* <sphereGeometry args={[1, 64, 64]} /> */}
        {/* <meshBasicMaterial color="#FFC0CB" side={2} /> */}
        {/* </mesh> */}
      </Environment>
    </Canvas>
  );
}
