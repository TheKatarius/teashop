import styles from './Static.module.css';

export function TermsPage() {
  return (
    <div className="container">
      <article className={styles.page}>
        <p className={styles.eyebrow}>Regulamin</p>
        <h1 className={styles.title}>Regulamin sklepu</h1>
        <p className={styles.lead}>
          Niniejszy regulamin określa zasady korzystania ze sklepu internetowego TeaShop oraz
          warunki zawierania umów sprzedaży.
        </p>

        <h2 className={styles.h2}>§1. Postanowienia ogólne</h2>
        <p className={styles.body}>
          Sklep prowadzony jest przez TeaShop sp. z o.o. z siedzibą w Warszawie. Złożenie zamówienia
          oznacza akceptację niniejszego regulaminu.
        </p>

        <h2 className={styles.h2}>§2. Zamówienia i płatności</h2>
        <p className={styles.body}>
          Zamówienia można składać 24/7. Dostępne metody płatności to BLIK, karta płatnicza oraz
          szybki przelew. Realizacja rozpoczyna się po zaksięgowaniu wpłaty.
        </p>

        <h2 className={styles.h2}>§3. Dostawa</h2>
        <p className={styles.body}>
          Wysyłka realizowana jest za pośrednictwem InPost, Poczty Polskiej oraz kuriera DPD. Przy
          zamówieniach powyżej 99 zł dostawa jest bezpłatna.
        </p>

        <h2 className={styles.h2}>§4. Zwroty</h2>
        <p className={styles.body}>
          Konsument ma prawo odstąpić od umowy w terminie 14 dni bez podania przyczyny, zgodnie z
          obowiązującymi przepisami.
        </p>
      </article>
    </div>
  );
}
