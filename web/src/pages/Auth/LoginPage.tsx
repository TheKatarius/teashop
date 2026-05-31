import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLogin } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { TextField } from '@/components/TextField/TextField';
import styles from './Auth.module.css';

const schema = z.object({
  email: z.string().min(1, 'Podaj adres e-mail').email('Nieprawidłowy adres e-mail'),
  password: z.string().min(1, 'Podaj hasło'),
});
type LoginForm = z.infer<typeof schema>;

export function LoginPage() {
  const { register, handleSubmit, formState, setError } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const login = useLogin();
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  const onSubmit = (values: LoginForm) => {
    login.mutate(values, {
      onSuccess: (res) => {
        setSession(res.user, res.token);
        toast.success(`Witaj z powrotem, ${res.user.name}!`);
        navigate('/profil');
      },
      onError: () => setError('password', { message: 'Nieprawidłowy e-mail lub hasło' }),
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>Zaloguj się</h1>
        <p className={styles.demo}>
          Demo: <strong>anna@teashop.pl</strong> / hasło <strong>password</strong>
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
            autoComplete="current-password"
            {...register('password')}
            error={formState.errors.password?.message}
          />
          <Button type="submit" fullWidth size="lg" disabled={login.isPending}>
            {login.isPending ? 'Logowanie…' : 'Zaloguj się'}
          </Button>
        </form>
        <p className={styles.alt}>
          Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}
