'use client';

import dynamic from 'next/dynamic';

const NeuralCanvas = dynamic(() => import('./NeuralCanvas'), { ssr: false });
const HeroText = dynamic(() => import('./HeroText'), { ssr: false });

export default function Hero3D() {
    return (
    <div className="hero">
        <NeuralCanvas />
        <HeroText />
      <div className="vbot"></div>
    </div>
  );
}