import { useEffect } from 'react';
import { Heart, Leaf, Package, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_META } from '@/features/catalog/categoryMeta';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  onClose: () => void;
}

/** Slide-in mobile navigation drawer (information architecture §2.2). */
export function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <nav
        className={styles.drawer}
        aria-label="Menu mobilne"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <span className={styles.brand}>
            <Leaf size={18} aria-hidden /> TeaShop
          </span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Zamknij menu">
            <X size={24} />
          </button>
        </div>

        <Link to="/sklep" className={styles.primaryLink} onClick={onClose}>
          Sklep
        </Link>
        <ul className={styles.categories}>
          {CATEGORY_META.map((c) => (
            <li key={c.slug}>
              <Link to={`/sklep/${c.slug}`} className={styles.categoryLink} onClick={onClose}>
                <c.Icon size={16} aria-hidden /> {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/quiz" className={styles.primaryLink} onClick={onClose}>
          Quiz
        </Link>
        <Link to="/o-nas" className={styles.primaryLink} onClick={onClose}>
          O nas
        </Link>
        <Link to="/kontakt" className={styles.primaryLink} onClick={onClose}>
          Kontakt
        </Link>

        <hr className={styles.divider} />

        <Link to="/profil" className={styles.iconLink} onClick={onClose}>
          <User size={18} /> Profil
        </Link>
        <Link to="/profil" className={styles.iconLink} onClick={onClose}>
          <Package size={18} /> Zamówienia
        </Link>
        <Link to="/ulubione" className={styles.iconLink} onClick={onClose}>
          <Heart size={18} /> Ulubione
        </Link>
      </nav>
    </div>
  );
}
