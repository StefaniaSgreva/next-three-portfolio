import styles from '../app/page.module.css';

export default function Typography() {
  return (
    <div className={styles.section}>
      <div className={styles['sec-label']}>Tipografia</div>

      <div className={styles['type-row']}>
        <div className={styles['type-role']}>Display — Cormorant Garamond Light</div>
        <div className={styles['t-display']}>
          Every pixel. Every line. <em>Every detail.</em>
        </div>
      </div>

      <div className={styles['type-row']}>
        <div className={styles['type-role']}>Heading — Cormorant Garamond Regular</div>
        <div className={styles['t-heading']}>Full Stack Development · AI Engineering</div>
      </div>

      <div className={styles['type-row']}>
        <div className={styles['type-role']}>Mono accent — DM Mono</div>
        <div className={styles['t-mono']}>react · next.js · laravel · langchain · python · rag</div>
      </div>

      <div className={styles['type-row']} style={{ border: 'none', paddingBottom: 0 }}>
        <div className={styles['type-role']}>Body — DM Mono</div>
        <div className={styles['t-body']}>
          From VFX pipelines to AI systems — the obsession
          <br />
          with precision never changed. Available for strategic engagements.
        </div>
      </div>
    </div>
  );
}