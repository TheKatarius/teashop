import { Button } from '@/components/Button/Button';
import styles from './Static.module.css';

export function AboutPage() {
  return (
    <div className="container">
      <article className={styles.page}>
        <p className={styles.eyebrow}>O nas</p>
        <h1 className={styles.title}>Herbata to rytuał, nie pośpiech</h1>
        <p className={styles.lead}>
          TeaShop powstał z prostego przekonania: dobra herbata potrafi zmienić cały dzień. Łączymy
          jednoźródłowe liście od sprawdzonych plantatorów z technologią, która pomaga dobrać napar
          do Twojego nastroju.
        </p>

        <h2 className={styles.h2}>Nasza misja</h2>
        <p className={styles.body}>
          Chcemy, by wybór herbaty był przyjemnością, a nie zgadywanką. Dlatego stworzyliśmy quiz
          nastrojowy, opisujemy każdy parametr parzenia i tłumaczymy, skąd pochodzą nasze liście.
        </p>

        <h2 className={styles.h2}>Wartości</h2>
        <div className={styles.values}>
          <div className={styles.value}>
            <p className={styles.valueTitle}>🌱 Pochodzenie</p>
            <p>Współpracujemy bezpośrednio z plantacjami i znamy historię każdej herbaty.</p>
          </div>
          <div className={styles.value}>
            <p className={styles.valueTitle}>🤝 Uczciwość</p>
            <p>Jasne opisy, realne zdjęcia i przejrzyste ceny za 100 g.</p>
          </div>
          <div className={styles.value}>
            <p className={styles.valueTitle}>🍵 Rzemiosło</p>
            <p>Małe partie, świeże zbiory i szacunek dla tradycji parzenia.</p>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Button to="/quiz">Dobierz swoją herbatę</Button>
          <Button to="/sklep" variant="secondary-outline">
            Przeglądaj sklep
          </Button>
        </div>
      </article>
    </div>
  );
}
