import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';

export function NotFoundPage() {
  return (
    <div className="container">
      <EmptyState
        icon="🍵"
        title="404 — tu pusto jak w pustej puszce"
        description="Strona, której szukasz, nie istnieje lub została przeniesiona."
        actions={
          <>
            <Button to="/sklep">Wróć do sklepu</Button>
            <Button to="/quiz" variant="secondary-outline">
              Zrób quiz
            </Button>
          </>
        }
      />
    </div>
  );
}
