import styles from './Static.module.css';

export function PrivacyPage() {
  return (
    <div className="container">
      <article className={styles.page}>
        <p className={styles.eyebrow}>Polityka prywatności</p>
        <h1 className={styles.title}>Polityka prywatności i cookies</h1>
        <p className={styles.lead}>
          Dbamy o Twoje dane. Poniżej wyjaśniamy, jakie informacje zbieramy i w jakim celu, zgodnie
          z RODO.
        </p>

        <h2 className={styles.h2}>Administrator danych</h2>
        <p className={styles.body}>
          Administratorem danych osobowych jest TeaShop sp. z o.o. Kontakt w sprawach danych:
          rodo@teashop.pl.
        </p>

        <h2 className={styles.h2}>Zakres przetwarzania</h2>
        <p className={styles.body}>
          Przetwarzamy dane niezbędne do realizacji zamówień (imię, adres, e-mail, telefon) oraz —
          za zgodą — adres e-mail do wysyłki newslettera.
        </p>

        <h2 className={styles.h2}>Pliki cookies</h2>
        <p className={styles.body}>
          Używamy cookies niezbędnych do działania koszyka i ulubionych oraz — opcjonalnie —
          analitycznych. Możesz zarządzać nimi w ustawieniach przeglądarki.
        </p>

        <h2 className={styles.h2}>Twoje prawa</h2>
        <p className={styles.body}>
          Masz prawo dostępu do danych, ich sprostowania, usunięcia oraz przeniesienia. Wystarczy
          napisać na rodo@teashop.pl.
        </p>
      </article>
    </div>
  );
}
