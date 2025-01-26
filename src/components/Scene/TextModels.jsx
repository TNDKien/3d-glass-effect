"use client";

import React from "react";
import { Text, Box, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function TextModel() {
  const { viewport } = useThree();

  const texts = [
    { text: "ICT", style: "black-bg" },
    { text: "&", style: "border-bg" },
    { text: "Media Design", style: "black-bg" },
  ];

  return (
    <group scale={viewport.width}>
      {texts.map((item, index, array) => {
        const isBlackBg = item.style === "black-bg";

        return (
          <group position={[0, (-index + (array.length - 1) / 2) * 0.25, -1]}>
            <Float
              key={index}
              speed={1}
              rotationIntensity={2}
              floatIntensity={1}
              floatingRange={[0, 0.01]}
            >
              <Box args={[0.8, 0.2, 0.1]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color={isBlackBg ? "#653365" : "#e5017e"}
                  roughness={0.5}
                  metalness={0.1}
                />
              </Box>

              <Text
                font={"/fonts/PPNeueMontreal-Bold.otf"}
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.09]}
              >
                {item.text}
              </Text>
            </Float>
          </group>
        );
      })}
    </group>
  );
}
