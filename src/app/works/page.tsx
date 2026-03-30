import styles from './page.module.css';
import Topbar from '@/components/Topbar';

export default function WorksPage() {
  return (
    <div className={styles.container}>
      <Topbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Works</h1>
        <p className={styles.description}>I progetti su cui ho lavorato.</p>
        {/* ... contenuto specifico ... */}
      </main>
    </div>
  );
}