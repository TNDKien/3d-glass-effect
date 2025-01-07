"use client";

import React from "react";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function TextModel() {
  const { viewport } = useThree();
  return (
    <group scale={viewport.width}>
      {["Media Design", "Semester 3", "Expo"].map((text, index, array) => (
        <Text
          key={index}
          font={"/fonts/PPNeueMontreal-Bold.otf"}
          position={[0, (-index + (array.length - 1) / 2) * 0.6, -1]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      ))}
    </group>
  );
}
