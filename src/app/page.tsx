import dynamic from "next/dynamic";

const JinxScene = dynamic(() => import("../components/JinxModel/JinxModel"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <JinxScene />
    </main>
  );
}
