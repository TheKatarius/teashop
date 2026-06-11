import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/app/RootLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { ShopPage } from '@/pages/Shop/ShopPage';
import { ProductPage } from '@/pages/Product/ProductPage';
import { CartPage } from '@/pages/Cart/CartPage';
import { FavoritesPage } from '@/pages/Favorites/FavoritesPage';
import { QuizPage } from '@/pages/Quiz/QuizPage';
import { QuizResultsPage } from '@/pages/Quiz/QuizResultsPage';
import { CheckoutPage } from '@/pages/Checkout/CheckoutPage';
import { OrderSuccessPage } from '@/pages/Checkout/OrderSuccessPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';
import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { AboutPage } from '@/pages/Static/AboutPage';
import { ContactPage } from '@/pages/Static/ContactPage';
import { TermsPage } from '@/pages/Static/TermsPage';
import { PrivacyPage } from '@/pages/Static/PrivacyPage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'sklep', element: <ShopPage /> },
        { path: 'sklep/:kategoria', element: <ShopPage /> },
        { path: 'produkt/:slug', element: <ProductPage /> },
        { path: 'koszyk', element: <CartPage /> },
        { path: 'ulubione', element: <FavoritesPage /> },
        { path: 'quiz', element: <QuizPage /> },
        { path: 'quiz/wyniki', element: <QuizResultsPage /> },
        { path: 'zamowienie', element: <CheckoutPage /> },
        { path: 'zamowienie/sukces/:orderId', element: <OrderSuccessPage /> },
        { path: 'logowanie', element: <LoginPage /> },
        { path: 'rejestracja', element: <RegisterPage /> },
        { path: 'profil', element: <ProfilePage /> },
        { path: 'o-nas', element: <AboutPage /> },
        { path: 'kontakt', element: <ContactPage /> },
        { path: 'regulamin', element: <TermsPage /> },
        { path: 'polityka-prywatnosci', element: <PrivacyPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
