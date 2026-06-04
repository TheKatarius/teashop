import { useState } from 'react';
import { toast } from '@/features/toast/store';
import { Button } from '@/components/Button/Button';
import { TextField } from '@/components/TextField/TextField';
import styles from './Static.module.css';

export function ContactPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="container">
      <article className={styles.page}>
        <p className={styles.eyebrow}>Kontakt</p>
        <h1 className={styles.title}>Napisz do nas</h1>
        <p className={styles.lead}>
          Masz pytanie o herbatę, zamówienie albo parzenie? Odpowiadamy w ciągu jednego dnia
          roboczego.
        </p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            toast.success('Dziękujemy! Odezwiemy się wkrótce.');
            setMessage('');
            e.currentTarget.reset();
          }}
        >
          <TextField label="Imię" name="name" required />
          <TextField label="E-mail" type="email" name="email" required />
          <label className={styles.form}>
            <span>Wiadomość</span>
            <textarea
              className={styles.textarea}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <Button type="submit">Wyślij wiadomość</Button>
        </form>

        <div className={styles.contactInfo}>
          <strong>TeaShop sp. z o.o.</strong>
          <br />
          ul. Herbaciana 1, 00-001 Warszawa
          <br />
          kontakt@teashop.pl · +48 22 000 00 00
        </div>
      </article>
    </div>
  );
}
