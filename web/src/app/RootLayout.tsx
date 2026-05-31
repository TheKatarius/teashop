import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/app/Header/Header';
import { Footer } from '@/app/Footer/Footer';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { ToastViewport } from '@/features/toast/ToastViewport';
import styles from './RootLayout.module.css';

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ToastViewport />
    </div>
  );
}
