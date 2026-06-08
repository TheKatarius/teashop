import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { QuizGoal, QuizQuestion } from '@/types';
import { useQuizQuestions, useSubmitQuiz } from '@/features/quiz/api';
import { useQuizDraft, useQuizResult } from '@/features/quiz/store';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Icon } from '@/components/Icon/Icon';
import { Skeleton } from '@/components/Skeleton/Skeleton';
import { cn } from '@/lib/cn';
import styles from './QuizPage.module.css';

function buildSubmission(questions: QuizQuestion[], answers: Record<string, string[]>) {
  const goalQuestion = questions.find((q) => q.type === 'goal');
  const goal = (goalQuestion && answers[goalQuestion.id]?.[0]) as QuizGoal | undefined;
  return {
    answers: questions
      .filter((q) => q.type !== 'goal')
      .map((q) => ({ questionId: q.id, optionIds: answers[q.id] ?? [] })),
    goal: goal ?? 'dopasuj',
  };
}

export function QuizPage() {
  const { data: questions, isLoading, isError } = useQuizQuestions();
  const answers = useQuizDraft((s) => s.answers);
  const setAnswer = useQuizDraft((s) => s.setAnswer);
  const setResult = useQuizResult((s) => s.setResult);
  const submit = useSubmitQuiz();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const question = questions?.[step];
  const selected = question ? (answers[question.id] ?? []) : [];
  const canProceed = selected.length > 0;
  const isLast = questions ? step === questions.length - 1 : false;

  const choose = (optionId: string) => {
    if (!question) return;
    if (question.multiple) {
      const next = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
      setAnswer(question.id, next);
    } else {
      setAnswer(question.id, [optionId]);
    }
  };

  const goNext = () => {
    if (!questions || !canProceed) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    const submission = buildSubmission(questions, { ...answers });
    submit.mutate(submission, {
      onSuccess: (result) => {
        setResult(result);
        toast.success('Wynik zapisany!');
        navigate('/quiz/wyniki');
      },
      onError: () => toast.error('Nie udało się przeliczyć wyniku. Spróbuj ponownie.'),
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!question) return;
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < question.options.length) {
        choose(question.options[idx].id);
      } else if (e.key === 'Enter' && canProceed) {
        goNext();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, selected, canProceed]);

  if (isLoading) {
    return (
      <div className={cn('container', styles.wrap)}>
        <div className={styles.card}>
          <Skeleton width="40%" height="14px" />
          <Skeleton width="80%" height="40px" />
          <Skeleton height="180px" />
        </div>
      </div>
    );
  }

  if (isError || !questions || !question) {
    return (
      <div className="container">
        <EmptyState
          title="Quiz jest chwilowo niedostępny"
          description="Spróbuj ponownie za moment."
          actions={<Button to="/sklep">Przeglądaj herbaty</Button>}
        />
      </div>
    );
  }

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className={cn('container', styles.wrap)}>
      <div className={styles.card}>
        <div className={styles.progressHead}>
          <span className={styles.stepLabel}>
            Krok {step + 1} z {questions.length}
          </span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>

        <h1 className={styles.question}>{question.text}</h1>
        {question.multiple && <p className={styles.hint}>Możesz wybrać kilka odpowiedzi.</p>}

        <div className={cn(styles.options, question.options.length <= 3 && styles.optionsStack)}>
          {question.options.map((option, i) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                className={cn(styles.option, isSelected && styles.optionSelected)}
                onClick={() => choose(option.id)}
                aria-pressed={isSelected}
              >
                <span className={styles.optionKey} aria-hidden>
                  {i + 1}
                </span>
                <Icon name={option.icon} size={28} className={styles.optionIcon} aria-hidden />
                <span className={styles.optionLabel}>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.back}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft size={18} /> Wstecz
          </button>
          <Button onClick={goNext} disabled={!canProceed || submit.isPending}>
            {isLast ? (submit.isPending ? 'Liczę…' : 'Zobacz wyniki') : 'Dalej'}
            {!isLast && <ArrowRight size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
