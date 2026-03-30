import styles from '../app/page.module.css';

interface ColorSwatch {
  name: string;
  hex: string;
  bg: string;
  border?: string;
}

const colors: ColorSwatch[] = [
  { name: 'Noir', hex: '#0A0A0F', bg: '#0A0A0F', border: '#3A3A45' },
  { name: 'Noir-2', hex: '#111118', bg: '#111118' },
  { name: 'Noir-3', hex: '#1A1A24', bg: '#1A1A24' },
  { name: 'Lilla', hex: '#9B8FE8', bg: '#9B8FE8' },
  { name: 'Lilla soft', hex: '#C4BDFF', bg: '#C4BDFF' },
  { name: 'Lilla dim', hex: '#4A4280', bg: '#4A4280' },
  { name: 'Oro', hex: '#C9A84C', bg: '#C9A84C' },
  { name: 'Oro soft', hex: '#E8C97A', bg: '#E8C97A' },
  { name: 'Bianco', hex: '#F2F0EB', bg: '#F2F0EB' },
  { name: 'Grigio', hex: '#6B6A72', bg: '#6B6A72' },
];

export default function ColorPalette() {
  return (
    <div className={styles.section}>
      <div className={styles['sec-label']}>Palette cromatica</div>
      <div className={styles['palette-row']}>
        {colors.map((c, idx) => (
          <div key={idx} className={styles.swatch}>
            <div
              className={styles['swatch-box']}
              style={{
                background: c.bg,
                border: c.border ? `0.5px solid ${c.border}` : 'none',
              }}
            />
            <div className={styles['swatch-name']}>{c.name}</div>
            <div className={styles['swatch-hex']}>{c.hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}