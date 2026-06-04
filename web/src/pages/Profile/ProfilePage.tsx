import { Heart, LogOut, Package, User as UserIcon } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // Route guard (U-04): guests are redirected to login.
  if (!user) return <Navigate to="/logowanie" replace />;

  const handleLogout = () => {
    logout();
    toast.info('Wylogowano. Koszyk i ulubione pozostają zapisane.');
    navigate('/');
  };

  return (
    <div className="container">
      <header className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Twój profil</p>
          <h1 className={styles.title}>{user.name}</h1>
          <p className={styles.email}>{user.email}</p>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut size={16} /> Wyloguj
        </Button>
      </header>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <UserIcon size={18} /> Dane osobowe
          </h2>
          <dl className={styles.data}>
            <dt>Imię i nazwisko</dt>
            <dd>{user.name}</dd>
            <dt>E-mail</dt>
            <dd>{user.email}</dd>
          </dl>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>📍 Zapisany adres</h2>
          {user.savedAddress ? (
            <p className={styles.address}>
              {user.savedAddress.street}
              <br />
              {user.savedAddress.postalCode} {user.savedAddress.city}
              <br />
              {user.savedAddress.phone}
            </p>
          ) : (
            <p className={styles.muted}>Brak zapisanego adresu — dodasz go przy kolejnym zamówieniu.</p>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Package size={18} /> Historia zamówień
          </h2>
          <p className={styles.muted}>
            Twoje zamówienia pojawią się tutaj po pierwszym zakupie.
          </p>
          <Button to="/sklep" variant="secondary-outline" size="sm">
            Zacznij zakupy
          </Button>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Heart size={18} /> Ulubione
          </h2>
          <p className={styles.muted}>Twoje zapisane herbaty.</p>
          <Button to="/ulubione" variant="secondary-outline" size="sm">
            Zobacz ulubione
          </Button>
        </section>
      </div>
    </div>
  );
}
