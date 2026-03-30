import styles from '../app/page.module.css';

export default function ComponentsShowcase() {
  return (
    <div className={styles.section}>
      <div className={styles['sec-label']}>Componenti</div>

      <div className={styles['comp-grid']}>
        <div className={`${styles['comp-card']} ${styles['comp-card-accent']}`}>
          <div className={styles['card-eyebrow']}>AI Engineering</div>
          <div className={styles['card-title']}>RAG Pipeline</div>
          <div className={styles['card-meta']}>LangChain · Pinecone · OpenAI</div>
        </div>
        <div className={`${styles['comp-card']} ${styles['comp-card-gold']}`}>
          <div className={`${styles['card-eyebrow']} ${styles['card-eyebrow-gold']}`}>Full Stack</div>
          <div className={styles['card-title']}>SaaS Platform</div>
          <div className={styles['card-meta']}>React · Laravel · MySQL</div>
        </div>
      </div>

      <div className={styles['pill-row']}>
        <span className={`${styles.pill} ${styles['pill-lilla']}`}>React</span>
        <span className={`${styles.pill} ${styles['pill-lilla']}`}>Vue.js</span>
        <span className={`${styles.pill} ${styles['pill-lilla']}`}>Three.js</span>
        <span className={`${styles.pill} ${styles['pill-oro']}`}>Python</span>
        <span className={`${styles.pill} ${styles['pill-oro']}`}>LangChain</span>
        <span className={`${styles.pill} ${styles['pill-ghost']}`}>TypeScript</span>
        <span className={`${styles.pill} ${styles['pill-ghost']}`}>Laravel</span>
        <span className={`${styles.pill} ${styles['pill-ghost']}`}>Node.js</span>
      </div>

      <div className={styles['btn-row']}>
        <button className={styles['btn-primary']}>See the work</button>
        <button className={styles['btn-lilla']}>Get in touch</button>
        <button className={styles['btn-ghost']}>Download CV</button>
      </div>
    </div>
  );
}