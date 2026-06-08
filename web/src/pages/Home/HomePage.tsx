import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_META } from '@/features/catalog/categoryMeta';
import { useProducts } from '@/features/catalog/api';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import styles from './HomePage.module.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  return (
    <form
      className={styles.newsletterForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        toast.success('Dziękujemy! Sprawdź skrzynkę, by potwierdzić zapis.');
        setEmail('');
      }}
    >
      <label htmlFor="nl-email" className="visually-hidden">
        Adres e-mail
      </label>
      <input
        id="nl-email"
        type="email"
        required
        className={styles.newsletterInput}
        placeholder="Twój e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="primary-dark">
        Zapisz się
      </Button>
    </form>
  );
}

export function HomePage() {
  const bestsellers = useProducts({ sort: 'popularnosc' });
  const fresh = useProducts({ sort: 'nowosci' });

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Nowa kolekcja · Wiosna 2026</p>
              <h1 className={styles.heroTitle}>Znajdź herbatę dopasowaną do Twojego nastroju</h1>
              <p className={styles.heroLead}>
                Odpowiedz na 7 pytań, a nasz quiz dobierze herbaty pod Twój dzisiejszy nastrój,
                porę dnia i smak. Bez logowania, w 60 sekund.
              </p>
              <div className={styles.heroCtas}>
                <Button to="/quiz" variant="primary-dark" size="lg">
                  Zrób quiz — 60 s
                </Button>
                <Button to="/sklep" variant="ghost" size="lg">
                  Zobacz wszystkie herbaty →
                </Button>
              </div>
            </div>
            <div className={styles.heroArt} aria-hidden>
              <Leaf className={styles.heroArtIcon} />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className={styles.sectionTitle}>Odkryj kategorie</h2>
        <ul className={styles.categories}>
          {CATEGORY_META.map((c) => (
            <li key={c.slug}>
              <Link to={`/sklep/${c.slug}`} className={styles.categoryTile}>
                <c.Icon className={styles.categoryIcon} size={40} aria-hidden />
                <span className={styles.categoryName}>{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Bestsellery</h2>
          <Link to="/sklep?sort=popularnosc" className={styles.seeAll}>
            Zobacz wszystkie →
          </Link>
        </div>
        <ProductGrid
          products={bestsellers.data?.items.slice(0, 6) ?? []}
          loading={bestsellers.isLoading}
          skeletonCount={3}
        />
      </section>

      <section className={styles.quizBand}>
        <div className="container">
          <p className={styles.eyebrow}>Quiz nastroju</p>
          <h2 className={styles.quizTitle}>Nie wiesz, co wybrać?</h2>
          <p className={styles.quizLead}>
            12 483 osoby znalazły już swoją idealną herbatę dzięki naszemu quizowi nastrojowemu.
          </p>
          <Button to="/quiz" variant="primary-solid" size="lg">
            Zrób quiz
          </Button>
        </div>
      </section>

      <section className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Nowości</h2>
          <Link to="/sklep?sort=nowosci" className={styles.seeAll}>
            Zobacz wszystkie →
          </Link>
        </div>
        <ProductGrid
          products={fresh.data?.items.slice(0, 3) ?? []}
          loading={fresh.isLoading}
          skeletonCount={3}
        />
      </section>

      <section className="container">
        <ul className={styles.reviews}>
          <li className={styles.review}>
            <p>„Quiz trafił idealnie — Sencha Uji to teraz moja codzienna poranna herbata."</p>
            <span className={styles.reviewAuthor}>— Anna z Krakowa</span>
          </li>
          <li className={styles.review}>
            <p>„Wreszcie sklep, który tłumaczy, jak parzyć. Rooibos Wanilia rozgrzewa wieczory."</p>
            <span className={styles.reviewAuthor}>— Marek z Wrocławia</span>
          </li>
        </ul>
      </section>

      <section className={styles.newsletter}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Zapisz się po porady i nowości</h2>
          <p className={styles.newsletterLead}>
            Sezonowe kolekcje, rytuały parzenia i kody rabatowe — raz w tygodniu.
          </p>
          <Newsletter />
        </div>
      </section>
    </>
  );
}
