# 🍵 TeaShop – Słownik Funkcji

---

## 📌 Jak czytać ten dokument

| Kolumna | Znaczenie |
|---|---|
| **ID** | Unikalny identyfikator funkcji |
| **Funkcja** | Nazwa funkcjonalności |
| **Opis** | Co robi i jak działa |
| **Aktorzy** | Kto korzysta (Gość / User / Admin) |
| **Priorytet** | MVP / v2 / v3 |
| **Zależności** | Inne funkcje wymagane do działania |

---

## 1. 🧠 Quiz Nastrojowy

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| Q-01 | **Start quizu** | Rozpoczęcie quizu bez wymogu logowania. Dostępne z: strony głównej (CTA), nawigacji, pop-upu zachęcającego, widgetu w sklepie. | Gość, User | MVP | — |
| Q-02 | **Pytania o nastrój** | 3–4 pytania kafelkowe z ikonami dotyczące aktualnego samopoczucia i kontekstu (pora dnia, sytuacja). Jedna odpowiedź na pytanie. | Gość, User | MVP | Q-01 |
| Q-03 | **Pytania o preferencje** | 2–3 pytania o ulubione smaki, tolerancję kofeiny, doświadczenie z herbatą. Jedno pytanie może być wielokrotnego wyboru. | Gość, User | MVP | Q-01 |
| Q-04 | **Pytanie o cel** | Jedno pytanie: „Dopasuj do nastroju" / „Popraw nastrój" / „Zaskocz mnie". Wpływa na kierunek algorytmu. | Gość, User | MVP | Q-01 |
| Q-05 | **Algorytm scoringowy** | Oblicza `score = Σ (answer_tag_weight × tea_tag_weight)` dla każdego produktu. Zwraca top 3–5 posortowanych malejąco. | System | MVP | Q-02, Q-03, Q-04, P-05 |
| Q-06 | **Wyświetlenie wyników** | Ekran z rekomendowanymi herbatami: zdjęcie, nazwa, mood badge, score dopasowania, CTA „Do koszyka" i „Zobacz więcej". | Gość, User | MVP | Q-05 |
| Q-07 | **Filtr post-quizowy** | Na ekranie wyników: możliwość zawężenia po rodzaju herbaty (np. tylko zielone). Lista aktualizuje się dynamicznie. | Gość, User | MVP | Q-06 |
| Q-08 | **Fallback – brak dopasowania** | Gdy żaden produkt nie przekracza progu score: (1) obniż próg → „Najbliższe dopasowanie", (2) pokaż bestsellery, (3) zaproponuj powtórzenie quizu. Nigdy pusty ekran. | System | MVP | Q-05 |
| Q-09 | **Zapis wyniku (gość)** | Wynik quizu zapisywany w `localStorage.quizResult`. Dane: data, odpowiedzi, rekomendacje. | Gość | MVP | Q-06 |
| Q-10 | **Zapis wyniku (zalogowany)** | Wynik zapisywany w bazie danych, dostępny w profilu → historia quizów. | User | MVP | Q-06, U-01 |
| Q-11 | **Migracja wyniku** | Przy rejestracji/logowaniu dane z `localStorage.quizResult` przenoszone do konta. | System | MVP | Q-09, U-02 |
| Q-12 | **CTA powtórzenia quizu** | Widget w profilu i na stronie głównej: „Twój ostatni quiz był X dni temu – sprawdź nowe rekomendacje!" | User | v2 | Q-10 |
| Q-13 | **Historia nastrojów** | Mini-timeline w profilu pokazująca poprzednie wyniki quizów z datami. | User | v2 | Q-10 |

---

## 2. 🛍️ Sklep / Katalog

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| S-01 | **Listing produktów** | Siatka produktów: 3 kolumny desktop, 2 tablet, 1 mobile. Lazy loading / paginacja. | Gość, User | MVP | P-01 |
| S-02 | **Karta produktu (listing)** | Miniaturka: zdjęcie, mood badge'e, nazwa, cena/100g, rating (gwiazdki), przycisk Quick Add. | Gość, User | MVP | P-01, P-05 |
| S-03 | **Filtry** | Sidebar (desktop) / drawer (mobile). Filtry: rodzaj herbaty, nastrój, smak, cena (range slider), kofeina, ocena, dostępność. Wielokrotny wybór, dynamiczne odświeżanie listy. | Gość, User | MVP | P-01, P-05, P-06 |
| S-04 | **Sortowanie** | Opcje: popularność, cena ↑↓, nowości, ocena. Dropdown nad listingiem. | Gość, User | MVP | S-01 |
| S-05 | **Strona produktu** | Pełna strona: galeria (zoom, carousel), nazwa, cena, gramatury, mood badge (klikalne → tooltip), opis krótki, sekcja parzenia (ikony), pochodzenie, opis długi/storytelling, tagi smakowe, skala kofeiny, selektor gramatury + ilości, „Dodaj do koszyka" (sticky mobile), „Dodaj do ulubionych". | Gość, User | MVP | P-01 |
| S-06 | **Cross-sell** | Sekcja „Pasuje do" na stronie produktu – 3–4 sugerowane produkty na bazie wspólnych tagów. | Gość, User | MVP | P-05, P-06 |
| S-07 | **Strona kategorii** | Filtrowany listing po wybranej kategorii (`/sklep/:kategoria`). Widget zachęty do quizu. | Gość, User | MVP | S-01, S-03 |
| S-08 | **Oznaczenie Bestseller** | Auto: top 10 wg sprzedaży z ostatnich 30 dni. Ręczny override przez admina. Badge „Bestseller" na karcie. | System, Admin | MVP | P-01, A-02 |
| S-09 | **Oznaczenie Nowość** | Badge „Nowość" na produktach dodanych w ciągu ostatnich 14 dni (konfigurowalny próg). | System | MVP | P-01 |

---

## 3. 🔍 Wyszukiwarka

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| SR-01 | **Pole wyszukiwania** | Ikona lupy w headerze → kliknięcie rozwija overlay z polem input. Dostępne na każdej stronie. | Gość, User | MVP | — |
| SR-02 | **Autocomplete** | Sugestie po wpisaniu 2+ znaków. Debounce 300ms. Wyniki: miniaturka + nazwa + kategoria. | Gość, User | MVP | P-01 |
| SR-03 | **Zakres wyszukiwania** | Przeszukuje: nazwę, kategorię, tagi smakowe, tagi nastrojowe, pochodzenie. | System | MVP | P-01, P-05, P-06 |
| SR-04 | **Strona wyników** | Lista produktów z tymi samymi filtrami co sklep. | Gość, User | MVP | S-03 |
| SR-05 | **Brak wyników** | Komunikat + sugestia: „Spróbuj quizu nastrojowego" + sekcja popularnych herbat. Nigdy pusty ekran. | System | MVP | Q-01, S-08 |

---

## 4. 📦 Produkty (dane)

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| P-01 | **Struktura produktu** | Pola: id, name, slug, category, subcategory, price, weight_options, description_short, description_long, origin, brewing (temp/czas/ilość), caffeine_level, images, stock, is_bestseller, is_new, is_available, reviews_avg, reviews_count, timestamps. | System | MVP | — |
| P-02 | **Gramatury** | Produkt dostępny w kilku wariantach wagowych (np. 50g, 100g, 250g). Cena przeliczana dynamicznie. | Gość, User | MVP | P-01 |
| P-03 | **Sekcja parzenia** | Każdy produkt ma: temperatura (70–100°C), czas (1–10 min), ilość (g/ml), max zaparzań, trudność (easy/medium/hard). Wyświetlane z ikonami. | Gość, User | MVP | P-01 |
| P-04 | **Galeria zdjęć** | Min. 2 zdjęcia na produkt. Zoom, carousel. Hosting na CDN. | Gość, User | MVP | P-01 |
| P-05 | **Mood tagi** | Każdy produkt ma `mood_tags` z wagami: `[{tag, weight}]`. Tagi: 😌 Relaks, ⚡ Energia, 🧠 Fokus, 🤗 Comfort, 🌙 Wieczór, 🌿 Detox. Przypisywane ręcznie. Widoczne jako kolorowe badge'e. | Admin | MVP | P-01 |
| P-06 | **Flavor tagi** | Tagi smakowe: kwiatowa, owocowa, orzechowa, ziemista, trawiasta, przyprawowa, umami, słodowa, słodka, gorzka. | Admin | MVP | P-01 |
| P-07 | **Skala kofeiny** | Wizualna skala na stronie produktu: bezkofeinowa / niska / średnia / wysoka. | Gość, User | MVP | P-01 |

---

## 5. 🛒 Koszyk

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| C-01 | **Dodanie do koszyka** | Quick Add z listingu lub przycisk na stronie produktu. Wybór gramatury + ilości. Toast potwierdzający. | Gość, User | MVP | P-01, T-01 |
| C-02 | **Badge koszyka** | Ikonka koszyka w headerze z czerwonym kółkiem (liczba produktów). Widoczny na każdej stronie. Aktualizacja dynamiczna. | Gość, User | MVP | — |
| C-03 | **Podgląd koszyka (drawer)** | Kliknięcie ikony → drawer/dropdown z listą produktów, miniaturkami, cenami, przyciskiem „Do kasy". Bez przeładowania strony. | Gość, User | MVP | C-01 |
| C-04 | **Pełna strona koszyka** | `/koszyk` – lista produktów, edycja ilości, usuwanie (z undo via toast), podsumowanie ceny, pole kodu rabatowego, info o darmowej dostawie, przycisk „Do kasy". | Gość, User | MVP | C-01 |
| C-05 | **Kod rabatowy** | Pole tekstowe w koszyku. Walidacja inline. Rabat kwotowy lub procentowy. | Gość, User | MVP | C-04 |
| C-06 | **Darmowa dostawa** | Pasek postępu: „Dodaj jeszcze X zł do darmowej dostawy (próg: 99 zł)". | System | MVP | C-04 |
| C-07 | **Persistencja koszyka (gość)** | Zapis w `localStorage.cart`. | Gość | MVP | — |
| C-08 | **Persistencja koszyka (user)** | Zapis w bazie. Synchronizacja między urządzeniami. Merge z localStorage przy logowaniu. | User | MVP | U-01 |
| C-09 | **Porzucony koszyk – toast** | Powracający user z niepustym koszykiem → toast: „Masz produkty w koszyku – dokończ zakupy!" | User | v2 | C-08, T-03 |
| C-10 | **Porzucony koszyk – e-mail** | E-mail po 24h (za zgodą RODO). Drugi e-mail po 72h z rabatem 5%. | System | v2 | C-08, U-01 |

---

## 6. 💳 Checkout

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| CH-01 | **Guest checkout** | Zakup bez rejestracji – obowiązkowy. Wymagane: e-mail, dane dostawy. Po zakupie CTA: „Załóż konto jednym kliknięciem". | Gość | MVP | C-04 |
| CH-02 | **Krok 1: Dane dostawy** | Formularz: imię, nazwisko, adres, miasto, kod pocztowy, telefon. Walidacja inline. Zalogowani: autouzupełnienie z profilu. | Gość, User | MVP | — |
| CH-03 | **Krok 2: Wybór dostawy** | Opcje: InPost Paczkomat (9,99 zł), Kurier DPD/DHL (14,99 zł), Poczta Polska (12,99 zł). Darmowa od 99 zł. Mapa paczkomatów (InPost widget). | Gość, User | MVP | — |
| CH-04 | **Krok 3: Podsumowanie** | Lista produktów, adres, metoda dostawy, koszt całkowity, pole kodu rabatowego (jeśli nie użyto), przycisk „Zamawiam i płacę". | Gość, User | MVP | CH-02, CH-03 |
| CH-05 | **Płatność** | Integracja z Przelewy24 / Stripe. Metody: BLIK, karta (Visa/MC), szybki przelew, Apple Pay, Google Pay. Przekierowanie do providera → callback → potwierdzenie. | Gość, User | MVP | — |
| CH-06 | **Potwierdzenie zamówienia** | Pełnoekranowy widok sukcesu: numer zamówienia, podsumowanie, CTA „Załóż konto" (gość) / „Zobacz zamówienie" (user). E-mail z potwierdzeniem. | Gość, User | MVP | CH-05 |
| CH-07 | **Walidacja inline** | Każde pole formularza walidowane na bieżąco (blur/change). Komunikaty błędów pod polem. Blokada przycisku „Dalej" przy błędach. | System | MVP | — |

---

## 7. ❤️ Ulubione

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| F-01 | **Dodanie do ulubionych** | Ikona serduszka na karcie produktu i stronie produktu. Toggle on/off. Toast potwierdzający. | Gość, User | MVP | P-01, T-01 |
| F-02 | **Strona ulubionych** | `/ulubione` – grid identyczny jak listing sklepu. Usuwanie z poziomu listy. | Gość, User | MVP | F-01 |
| F-03 | **Persistencja (gość)** | `localStorage.favorites` – tablica product ID. | Gość | MVP | — |
| F-04 | **Persistencja (user)** | Baza danych. Synchronizacja między urządzeniami. Migracja z localStorage przy rejestracji. | User | MVP | U-01 |

---

## 8. 👤 Użytkownik / Auth

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| U-01 | **Rejestracja** | Formularz: imię, e-mail, hasło. Walidacja inline. Po rejestracji → migracja danych z localStorage (koszyk, ulubione, quiz). | Gość | MVP | — |
| U-02 | **Logowanie** | E-mail + hasło. Merge localStorage z bazą. | Gość | MVP | — |
| U-03 | **OAuth** | Logowanie przez Google / Facebook. | Gość | v2 | — |
| U-04 | **Profil** | `/profil` – dane osobowe (edycja), zapisany adres dostawy, zmiana hasła. | User | MVP | U-01 |
| U-05 | **Historia zamówień** | Lista zamówień z datą, statusem, kwotą. Kliknięcie → szczegóły zamówienia. | User | MVP | CH-06 |
| U-06 | **Historia quizów** | Lista wyników quizów z datami i rekomendacjami. CTA powtórzenia. | User | v2 | Q-10 |
| U-07 | **Ikona profilu** | W headerze obok koszyka. Dropdown: Profil, Zamówienia, Ulubione, Wyloguj. Mobile: w hamburger menu. | User | MVP | — |
| U-08 | **Wylogowanie** | Czyszczenie sesji. Koszyk/ulubione pozostają w bazie. | User | MVP | — |

---

## 9. ⭐ Recenzje

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| R-01 | **Wyświetlanie recenzji** | Na stronie produktu: średnia ocena, liczba recenzji, lista z tekstem i gwiazdkami. | Gość, User | MVP | P-01 |
| R-02 | **Dodawanie recenzji** | Formularz: 1–5 gwiazdek + opcjonalny tekst. Tylko zalogowani. Jedna recenzja per user per produkt. | User | v2 | U-01, P-01 |

---

## 10. 🎁 Zestawy podarunkowe

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| G-01 | **Listing zestawów** | Osobna sekcja / strona z zestawami podarunkowymi. Grid jak produkty. | Gość, User | v2 | — |
| G-02 | **Strona zestawu** | Skład zestawu (produkty z linkami), cena, opis, „Dodaj do koszyka". | Gość, User | v2 | P-01 |

---

## 11. 🔔 Toast System

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| T-01 | **Toast success** | Zielony toast: dodano do koszyka, dodano do ulubionych, quiz zapisany. Prawy górny róg. | System | MVP | — |
| T-02 | **Toast error** | Czerwony toast: błąd płatności, błąd sieciowy. Nie auto-dismiss – wymaga zamknięcia. | System | MVP | — |
| T-03 | **Toast info** | Niebieski toast: porzucony koszyk, przypomnienie. Górny pasek, dismissable. | System | MVP | — |
| T-04 | **Reguły wyświetlania** | Auto-dismiss po 4s (oprócz error). Max 1 na raz – kolejkowanie. Ręczne zamknięcie (×). | System | MVP | — |

---

## 12. 📄 Strony statyczne

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| ST-01 | **Strona główna** | Hero + CTA quiz + CTA sklep, kafelki kategorii, karuzela bestsellerów, sekcja quizu, nowości, social proof, newsletter, footer. | Gość, User | MVP | — |
| ST-02 | **O nas** | Historia, misja, wartości, zespół (opcj.), pochodzenie herbat, CTA. | Gość, User | MVP | — |
| ST-03 | **Regulamin** | Regulamin sklepu. | Gość, User | MVP | — |
| ST-04 | **Polityka prywatności** | RODO, cookies. | Gość, User | MVP | — |
| ST-05 | **Kontakt** | Formularz kontaktowy + dane firmy. | Gość, User | MVP | — |
| ST-06 | **Blog** | Artykuły o herbatach, parzeniu, kulturze. Linki do produktów. | Gość, User | v2 | — |
| ST-07 | **Strona 404** | Komunikat błędu + CTA: „Wróć do sklepu" / „Zrób quiz". | Gość, User | MVP | — |

---

## 13. 🛠️ Panel Admina

| ID | Funkcja | Opis | Aktorzy | Priorytet | Zależności |
|---|---|---|---|---|---|
| A-01 | **CRUD produktów** | Dodawanie, edycja, usuwanie produktów. Wszystkie pola z P-01 + tagi (P-05, P-06). Upload zdjęć → CDN. | Admin | MVP | P-01 |
| A-02 | **Override bestsellerów** | Ręczne oznaczanie / odznaczanie produktów jako bestseller. | Admin | MVP | S-08 |
| A-03 | **Zarządzanie zamówieniami** | Lista zamówień, zmiana statusu, podgląd szczegółów. | Admin | MVP | CH-06 |
| A-04 | **Zarządzanie quizem** | Edycja pytań, opcji i wag tagów w quizie. | Admin | v2 | Q-02, Q-03, Q-04 |
| A-05 | **Zarządzanie zestawami** | CRUD zestawów podarunkowych, przypisywanie produktów. | Admin | v2 | G-01 |

---

## 📊 Podsumowanie priorytetów

| Priorytet | Liczba funkcji | Moduły |
|---|---|---|
| **MVP** | 58 | Quiz, Sklep, Wyszukiwarka, Produkty, Koszyk, Checkout, Ulubione, Auth, Toasty, Strony statyczne, Admin (CRUD) |
| **v2** | 13 | Historia quizów, porzucony koszyk (e-mail), OAuth, recenzje (dodawanie), zestawy, blog, admin quiz/zestawy |