'use client';

export default function HeroText() {
  return (
    <div className="hero-txt">
      <div className="hero-tag">Full Stack Developer <div className="hero-line" style={{ backgroundColor: "var(--lilla)" }}></div> <span style={{ color: "var(--oro)" }}>AI Engineer</span>  <div className="hero-line" style={{ backgroundColor: "var(--oro)" }}></div> <span style={{ color: "var(--grigio)" }}>3D Specialist</span></div>
      <div className="hero-h1">
        I build with logic.<br />I see with an <em>artist&apos;s eye.</em>
      </div>
      <div className="hero-sub">
          10+ years as Senior 3D Artist · Full Stack Developer · AI Engineering <br/>
          React · Vue · Laravel · LLM · RAG · AI Agents · Three.js
      </div>
      <div className="btn-row">
        <button className="btn-primary">view my work</button>
        <button className="btn-ghost">get in touch</button>
      </div>

      <div className="hero-scroll">
        <div className="hero-line"></div>Scroll to explore
      </div>

    </div>
  );
}