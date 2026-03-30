'use client';

import dynamic from 'next/dynamic';

const NeuralCanvas = dynamic(() => import('./NeuralCanvas'), { ssr: false });
const HeroText = dynamic(() => import('./HeroText'), { ssr: false });

export default function Hero3D() {
    return (
    <div className="hero" style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
      {/* <NeuralCanvas /> */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        <HeroText />
      </div>
      <div className="vbot"></div>
    </div>
  );
}