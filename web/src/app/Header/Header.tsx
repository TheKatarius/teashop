import { useState } from 'react';
import { Heart, Leaf, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { CATEGORY_META } from '@/features/catalog/categoryMeta';
import { selectCount, useCartStore } from '@/features/cart/store';
import { useCartDrawer } from '@/features/cart/uiStore';
import { cn } from '@/lib/cn';
import { SearchOverlay } from './SearchOverlay';
import { MobileMenu } from './MobileMenu';
import styles from './Header.module.css';

const NAV = [
  { to: '/quiz', label: 'Quiz' },
  { to: '/o-nas', label: 'O nas' },
  { to: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore(selectCount);
  const openCart = useCartDrawer((s) => s.open);

  return (
    <header className={styles.header}>
      <div className={cn('container', styles.inner)}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label="Otwórz menu"
        >
          <Menu size={24} />
        </button>

        <Link to="/" className={styles.brand}>
          <Leaf size={20} aria-hidden /> TeaShop
        </Link>

        <nav className={styles.nav} aria-label="Główna nawigacja">
          <div className={styles.shopMenu}>
            <NavLink to="/sklep" className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}>
              Sklep
            </NavLink>
            <div className={styles.dropdown}>
              {CATEGORY_META.map((c) => (
                <Link key={c.slug} to={`/sklep/${c.slug}`} className={styles.dropdownItem}>
                  <c.Icon size={16} aria-hidden /> {c.name}
                </Link>
              ))}
              <Link to="/sklep" className={cn(styles.dropdownItem, styles.dropdownAll)}>
                Wszystkie →
              </Link>
            </div>
          </div>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSearchOpen(true)}
            aria-label="Szukaj"
          >
            <Search size={22} />
          </button>
          <Link to="/ulubione" className={styles.iconButton} aria-label="Ulubione">
            <Heart size={22} />
          </Link>
          <Link to="/profil" className={cn(styles.iconButton, styles.profileButton)} aria-label="Profil">
            <User size={22} />
          </Link>
          <button
            type="button"
            className={styles.iconButton}
            onClick={openCart}
            aria-label={`Koszyk, produktów: ${cartCount}`}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
