import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Podaj imię'),
  lastName: z.string().min(2, 'Podaj nazwisko'),
  email: z.string().min(1, 'Podaj e-mail').email('Nieprawidłowy adres e-mail'),
  phone: z.string().min(9, 'Podaj numer telefonu'),
  street: z.string().min(3, 'Podaj adres'),
  city: z.string().min(2, 'Podaj miasto'),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Kod w formacie 00-000'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
