import { useMemo, useState } from 'react';
import { Brain, Leaf, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoryName } from '@/features/catalog/categoryMeta';
import { MOOD_META } from '@/features/catalog/moodMeta';
import { useQuizDraft, useQuizResult } from '@/features/quiz/store';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { FilterChip } from '@/components/FilterChip/FilterChip';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import styles from './QuizResultsPage.module.css';

export function QuizResultsPage() {
  const result = useQuizResult((s) => s.result);
  const resetDraft = useQuizDraft((s) => s.reset);
  const navigate = useNavigate();
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!result) return [];
    return [...new Set(result.recommendations.map((r) => r.product.categorySlug))];
  }, [result]);

  if (!result) {
    return (
      <div className="container">
        <EmptyState
          icon={<Brain size={48} />}
          title="Nie masz jeszcze wyniku quizu"
          description="Odpowiedz na 7 pytań, a dobierzemy herbaty pod Twój nastrój."
          actions={<Button to="/quiz">Zacznij quiz</Button>}
        />
      </div>
    );
  }

  const visible = category
    ? result.recommendations.filter((r) => r.product.categorySlug === category)
    : result.recommendations;

  const retake = () => {
    resetDraft();
    navigate('/quiz');
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>Twój wynik</p>
          <h1 className={styles.title}>
            <Leaf size={28} aria-hidden /> Twoje herbaty na dziś
          </h1>
          <div className={styles.moodTags}>
            {result.moodSummary.map((slug) => {
              const mood = MOOD_META[slug];
              return mood ? (
                <span key={slug} className={styles.moodTag}>
                  <mood.Icon size={16} aria-hidden /> {mood.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <div className="container">
        {result.isFallback && (
          <div className={styles.fallback} role="status">
            <strong>Najbliższe dopasowanie.</strong> Nie znaleźliśmy idealnego trafienia, więc
            pokazujemy nasze bestsellery. Możesz też powtórzyć quiz z innymi odpowiedziami.
          </div>
        )}

        {categories.length > 1 && (
          <div className={styles.filters}>
            <FilterChip selected={category === null} onClick={() => setCategory(null)}>
              Wszystkie
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} selected={category === c} onClick={() => setCategory(c)}>
                {categoryName(c)}
              </FilterChip>
            ))}
          </div>
        )}

        <ol className={styles.recommendations}>
          {visible.map((rec) => (
            <li key={rec.product.id} className={styles.recommendation}>
              <span className={styles.rank} aria-label={`Pozycja ${rec.rank}`}>
                {rec.rank}
              </span>
              <ProductCard product={rec.product} matchScore={rec.score} />
            </li>
          ))}
        </ol>

        <div className={styles.ctas}>
          <Button onClick={retake} variant="secondary-outline">
            Powtórz quiz
          </Button>
          <Button to="/sklep">Przejdź do sklepu</Button>
        </div>

        <p className={styles.save}>
          <Save size={14} aria-hidden /> Wynik zapisany na tym urządzeniu.{' '}
          <a href="/rejestracja">Załóż konto, by zachować historię quizów.</a>
        </p>
      </div>
    </>
  );
}
