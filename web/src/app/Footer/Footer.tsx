import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    heading: 'Sklep',
    links: [
      { to: '/sklep', label: 'Wszystkie' },
      { to: '/sklep?sort=popularnosc', label: 'Bestsellery' },
      { to: '/sklep?sort=nowosci', label: 'Nowości' },
    ],
  },
  {
    heading: 'Pomoc',
    links: [
      { to: '/kontakt', label: 'Kontakt' },
      { to: '/regulamin', label: 'Dostawa i zwroty' },
      { to: '/regulamin', label: 'Regulamin' },
    ],
  },
  {
    heading: 'Firma',
    links: [
      { to: '/o-nas', label: 'O nas' },
      { to: '/quiz', label: 'Quiz nastroju' },
      { to: '/polityka-prywatnosci', label: 'Polityka prywatności' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.inner)}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>🍵 TeaShop</span>
          <p className={styles.tagline}>Herbata dopasowana do Twojego nastroju.</p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} className={styles.col} aria-label={col.heading}>
            <h2 className={styles.heading}>{col.heading}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={cn('container', styles.bottom)}>
        <span>© 2026 TeaShop</span>
        <span className={styles.pay}>BLIK · Visa · Mastercard · InPost · DPD · Poczta Polska</span>
      </div>
    </footer>
  );
}
