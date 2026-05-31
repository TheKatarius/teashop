import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useRegister } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { TextField } from '@/components/TextField/TextField';
import styles from './Auth.module.css';

const schema = z.object({
  name: z.string().min(2, 'Podaj imię'),
  email: z.string().min(1, 'Podaj adres e-mail').email('Nieprawidłowy adres e-mail'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
});
type RegisterForm = z.infer<typeof schema>;

export function RegisterPage() {
  const { register, handleSubmit, formState, setError } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });
  const registerMutation = useRegister();
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  const onSubmit = (values: RegisterForm) => {
    registerMutation.mutate(values, {
      onSuccess: (res) => {
        setSession(res.user, res.token);
        toast.success('Konto utworzone! Twój koszyk i ulubione są zachowane.');
        navigate('/profil');
      },
      onError: () => setError('email', { message: 'Konto z tym adresem już istnieje' }),
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Załóż konto</h1>
        <p className={styles.lead}>
          Zachowaj koszyk, ulubione i historię quizów na wszystkich urządzeniach.
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Imię"
            autoComplete="given-name"
            {...register('name')}
            error={formState.errors.name?.message}
          />
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={formState.errors.email?.message}
          />
          <TextField
            label="Hasło"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            error={formState.errors.password?.message}
          />
          <Button type="submit" fullWidth size="lg" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Tworzę konto…' : 'Zarejestruj się'}
          </Button>
        </form>
        <p className={styles.alt}>
          Masz już konto? <Link to="/logowanie">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}
