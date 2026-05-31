# 🍵 TeaShop – Architektura Informacji

---

## 1. Mapa strony (sitemap)

```mermaid
flowchart TD
    ROOT["/ Strona główna"]

    ROOT --> SHOP["/sklep – Sklep"]
    ROOT --> QUIZ["/quiz – Quiz"]
    ROOT --> ABOUT["/o-nas – O nas"]
    ROOT --> CONTACT["/kontakt – Kontakt"]
    ROOT --> BLOG["/blog – Blog v2"]
    ROOT --> AUTH_L["/logowanie"]
    ROOT --> AUTH_R["/rejestracja"]
    ROOT --> CART["/koszyk – Koszyk"]
    ROOT --> PROFILE["/profil – Profil"]
    ROOT --> FAVS["/ulubione – Ulubione"]
    ROOT --> TERMS["/regulamin"]
    ROOT --> PRIVACY["/polityka-prywatnosci"]
    ROOT --> E404["/* – 404"]

    SHOP --> CATEGORY["/sklep/:kategoria"]
    CATEGORY --> PRODUCT["/sklep/:slug – Produkt"]

    QUIZ --> QUIZ_R["/quiz/wyniki – Wyniki"]

    CART --> CHECKOUT["/zamowienie – Checkout"]

    PROFILE --> ORDERS["Zamówienia"]
    PROFILE --> QUIZ_HIST["Historia quizów v2"]
    PROFILE --> PROFILE_EDIT["Edycja danych"]

    BLOG --> BLOG_POST["/blog/:slug v2"]

    style ROOT fill:#2d6a4f,color:#fff
    style SHOP fill:#f57c00,color:#fff
    style QUIZ fill:#388e3c,color:#fff
    style CART fill:#1976d2,color:#fff
    style PROFILE fill:#7b1fa2,color:#fff
    style AUTH_L fill:#546e7a,color:#fff
    style AUTH_R fill:#546e7a,color:#fff
```

---

## 2. Hierarchia nawigacji

### 2.1 Header (sticky, wszystkie strony)

```
┌──────────────────────────────────────────────────────────────┐
│  🍵 Logo    Sklep ▾   Quiz   O nas   Blog     🔍  👤  🛒(3) │
│              ├─ Czarna                                       │
│              ├─ Zielona                                      │
│              ├─ Biała                                        │
│              ├─ Oolong                                       │
│              ├─ Ziołowa                                      │
│              ├─ Matcha                                       │
│              ├─ Pu-erh                                       │
│              ├─ Blendy                                       │
│              └─ Wszystkie                                    │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Mobile (hamburger)

```
┌─────────────────┐
│  🍵 Logo   🔍 🛒 │
│  ☰                │
│  ├─ Sklep         │
│  │  ├─ Czarna     │
│  │  ├─ Zielona    │
│  │  ├─ ...        │
│  ├─ Quiz          │
│  ├─ O nas         │
│  ├─ Blog          │
│  ├─ Kontakt       │
│  ├─ ────────────  │
│  ├─ 👤 Profil     │
│  ├─ 📦 Zamówienia │
│  ├─ ❤️ Ulubione   │
│  └─ 🚪 Wyloguj   │
└───────────────────┘
```

### 2.3 Footer

```
┌─────────────────────────────────────────────────────────────────┐
│  🍵 TeaShop                                                     │
│                                                                 │
│  Sklep           Pomoc              Firma          Social       │
│  ├─ Wszystkie    ├─ FAQ             ├─ O nas       ├─ Instagram │
│  ├─ Bestsellery  ├─ Dostawa         ├─ Kontakt     ├─ Facebook  │
│  ├─ Nowości      ├─ Zwroty          ├─ Blog        └─ TikTok   │
│  └─ Zestawy     └─ Regulamin       └─ Praca                   │
│                                                                 │
│  💳 BLIK  Visa  MC  P24    📦 InPost  DPD  Poczta Polska       │
│  © 2026 TeaShop  |  Polityka prywatności  |  Regulamin          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Struktura stron – wireframe informacyjny

### 3.1 Strona główna `/`

```
┌─────────────────────────────────────────┐
│ [HEADER]                                │
├─────────────────────────────────────────┤
│ HERO                                    │
│ "Znajdź herbatę dopasowaną              │
│  do Twojego nastroju"                   │
│ [Zrób quiz – 60s]  [Przejdź do sklepu] │
├─────────────────────────────────────────┤
│ KATEGORIE                               │
│ [☕Czarna] [🍵Zielona] [🤍Biała]        │
│ [🌀Oolong] [🌿Ziołowa] [🍵Matcha]      │
├─────────────────────────────────────────┤
│ BESTSELLERY                             │
│ ← [Karta][Karta][Karta][Karta] →       │
├─────────────────────────────────────────┤
│ QUIZ CTA                                │
│ "Nie wiesz, co wybrać?"                 │
│ "12 483 osoby już znalazły swoją herbatę│
│ [Zrób quiz]                             │
├─────────────────────────────────────────┤
│ NOWOŚCI                                 │
│ ← [Karta][Karta][Karta][Karta] →       │
├─────────────────────────────────────────┤
│ OPINIE KLIENTÓW                         │
│ "..." – Anna  |  "..." – Marek         │
├─────────────────────────────────────────┤
│ NEWSLETTER                              │
│ [email        ] [Zapisz się]            │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 3.2 Sklep `/sklep`

```
┌─────────────────────────────────────────┐
│ [HEADER]                                │
├──────────┬──────────────────────────────┤
│ FILTRY   │ Sortuj: [Popularność ▾]      │
│          │ Wyników: 47                  │
│ Rodzaj   │                              │
│ ☑ Czarna │ [Karta] [Karta] [Karta]     │
│ ☑ Zielona│                              │
│ ☐ Biała  │ [Karta] [Karta] [Karta]     │
│ ...      │                              │
│          │ [Karta] [Karta] [Karta]     │
│ Nastrój  │                              │
│ ☑ Relaks │ ← 1 2 3 ... →               │
│ ☐ Energia│                              │
│ ...      │                              │
│          │                              │
│ Smak     │                              │
│ ☑ Kwiat. │                              │
│ ...      │                              │
│          │                              │
│ Cena     │                              │
│ [===●==] │                              │
│ 10–150zł │                              │
│          │                              │
│ Kofeina  │                              │
│ ○ Tak    │                              │
│ ○ Mało   │                              │
│ ○ Nie    │                              │
├──────────┴──────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 3.3 Strona produktu `/sklep/:slug`

```
┌─────────────────────────────────────────┐
│ [HEADER]                                │
├─────────────────────────────────────────┤
│ Sklep > Zielona > Sencha Fukujyu        │
├───────────────┬─────────────────────────┤
│               │ Sencha Fukujyu          │
│   [Galeria]   │ ★★★★☆ (23 opinie)      │
│   📸 1/4      │                         │
│               │ 😌 Relaks  🧠 Fokus     │
│               │                         │
│               │ 29,90 zł / 100g         │
│               │                         │
│               │ Gramatura:              │
│               │ [50g] [100g●] [250g]    │
│               │                         │
│               │ Ilość: [- 1 +]          │
│               │                         │
│               │ [🛒 Dodaj do koszyka]   │
│               │ [♥ Dodaj do ulubionych] │
├───────────────┴─────────────────────────┤
│ ☕ PARZENIE                              │
│ 🌡️ 70°C  |  ⏱️ 1–2 min  |  ⚖️ 3g/200ml │
│ 🔄 Max 3 zaparzenia  |  Trudność: easy │
├─────────────────────────────────────────┤
│ 📝 OPIS                                 │
│ Delikatna japońska zielona herbata...   │
│ Pochodzenie: Japonia, pref. Shizuoka    │
├─────────────────────────────────────────┤
│ 🏷️ TAGI SMAKOWE                         │
│ [trawiasta] [umami] [morska]            │
├─────────────────────────────────────────┤
│ ☕ KOFEINA                               │
│ [▓▓▓░░] Średnia                         │
├─────────────────────────────────────────┤
│ 💬 RECENZJE (23)                         │
│ ★★★★★ "Świetna poranna herbata..." – A. │
│ ★★★★☆ "Dobra, ale delikatna" – M.      │
├─────────────────────────────────────────┤
│ 🤝 PASUJE DO                             │
│ [Karta] [Karta] [Karta]                │
├─────────────────────────────────────────┤
│ [FOOTER]                                │
└─────────────────────────────────────────┘
```

### 3.4 Quiz `/quiz` → `/quiz/wyniki`

```
QUIZ FLOW:

┌────────────────────────────────────┐
│ Pytanie 1/7         [Pasek postępu]│
│                                    │
│ "Jak się dziś czujesz?"           │
│                                    │
│ [😌 Spokojnie] [😤 Zmęczony/a]    │
│ [😊 Energicznie] [🤔 Zamyślony/a] │
│                                    │
│                        [Dalej →]   │
└────────────────────────────────────┘
        ↓ (po 7 pytaniach)
┌────────────────────────────────────┐
│ 🍵 Twoje herbaty na dziś!          │
│                                    │
│ Nastrój: 😌 Relaks                 │
│ Cel: Dopasuj do nastroju           │
│                                    │
│ Filtruj: [Wszystkie●][Zielona]     │
│          [Biała][Oolong]           │
│                                    │
│ 🥇 Sencha Fukujyu        96% match │
│    😌🧠  29,90zł  [Do koszyka]     │
│                                    │
│ 🥈 Biała Bai Mu Dan      91% match │
│    😌🌙  34,90zł  [Do koszyka]     │
│                                    │
│ 🥉 Oolong Dong Ding      87% match │
│    😌🤗  39,90zł  [Do koszyka]     │
│                                    │
│ [Powtórz quiz] [Przejdź do sklepu]│
│                                    │
│ 💾 Wynik zapisany!                  │
│ [Załóż konto, by zachować historię]│
└────────────────────────────────────┘
```

### 3.5 Koszyk & Checkout

```
KOSZYK /koszyk:

┌─────────────────────────────────────────┐
│ 🛒 Twój koszyk (3)                      │
├─────────────────────────────────────────┤
│ [📸] Sencha Fukujyu  100g  [- 1 +]  29,90│
│ [📸] Bai Mu Dan      50g   [- 2 +]  49,80│
│ [📸] Rooibos Wanilia 100g  [- 1 +]  19,90│
├─────────────────────────────────────────┤
│ Kod rabatowy: [________] [Zastosuj]     │
├─────────────────────────────────────────┤
│ Produkty:                       99,60 zł│
│ Dostawa:              ✅ DARMOWA (>99zł) │
│ ─────────────────────────────────       │
│ RAZEM:                          99,60 zł│
│                                         │
│ [Do kasy →]                             │
└─────────────────────────────────────────┘

CHECKOUT /zamowienie:

┌─────────────────────────────────────────┐
│ ① Dane ──── ② Dostawa ──── ③ Podsumo.  │
│ ●━━━━━━━━━━━○━━━━━━━━━━━━━○            │
├─────────────────────────────────────────┤
│ Imię:     [____________]                │
│ Nazwisko: [____________]                │
│ E-mail:   [____________]                │
│ Telefon:  [____________]                │
│ Adres:    [____________]                │
│ Miasto:   [____________]                │
│ Kod:      [______]                      │
│                                         │
│ ☐ Zapamiętaj adres                      │
│                                         │
│ [← Wróć]                    [Dalej →]  │
└─────────────────────────────────────────┘
```

---

## 4. Taksonomia treści

### 4.1 Kategorie produktów

```mermaid
flowchart TD
    TEA["🍵 Herbaty"]
    TEA --> BLACK["☕ Czarna"]
    TEA --> GREEN["🍵 Zielona"]
    TEA --> WHITE["🤍 Biała"]
    TEA --> OOLONG["🌀 Oolong"]
    TEA --> PUERH["🪵 Pu-erh"]
    TEA --> MATCHA["🍵 Matcha"]
    TEA --> HERBAL["🌿 Ziołowa"]
    TEA --> BLEND["🎨 Blendy"]

    BLACK --> B1["Klasyczna\nAssam, Ceylon"]
    BLACK --> B2["Aromatyzowana\nEarl Grey, Chai"]

    GREEN --> G1["Chińska\nLong Jing, Gunpowder"]
    GREEN --> G2["Japońska\nSencha, Gyokuro, Bancha"]

    WHITE --> W1["Bai Mu Dan"]
    WHITE --> W2["Silver Needle"]

    HERBAL --> H1["Mięta"]
    HERBAL --> H2["Rumianek"]
    HERBAL --> H3["Rooibos"]
    HERBAL --> H4["Owocowe"]
```

### 4.2 System tagów

```mermaid
flowchart LR
    PRODUCT["📦 Produkt"]

    PRODUCT --- MOOD["😌 Mood Tags\n(z wagami 0.0–1.0)"]
    PRODUCT --- FLAVOR["🏷️ Flavor Tags"]
    PRODUCT --- TIME["🕐 Pora dnia"]
    PRODUCT --- STRENGTH["💪 Moc"]
    PRODUCT --- CAFFEINE["☕ Kofeina"]
    PRODUCT --- GOAL["🎯 Cel"]

    MOOD --- M1["😌 Relaks"]
    MOOD --- M2["⚡ Energia"]
    MOOD --- M3["🧠 Fokus"]
    MOOD --- M4["🤗 Comfort"]
    MOOD --- M5["🌙 Wieczór"]
    MOOD --- M6["🌿 Detox"]

    FLAVOR --- F1["kwiatowa"]
    FLAVOR --- F2["owocowa"]
    FLAVOR --- F3["orzechowa"]
    FLAVOR --- F4["ziemista"]
    FLAVOR --- F5["trawiasta"]
    FLAVOR --- F6["przyprawowa"]
    FLAVOR --- F7["umami"]
    FLAVOR --- F8["słodowa"]

    TIME --- T1["poranna"]
    TIME --- T2["popołudniowa"]
    TIME --- T3["wieczorna"]

    STRENGTH --- ST1["delikatna"]
    STRENGTH --- ST2["średnia"]
    STRENGTH --- ST3["mocna"]

    CAFFEINE --- C1["bezkofeinowa"]
    CAFFEINE --- C2["niska"]
    CAFFEINE --- C3["średnia"]
    CAFFEINE --- C4["wysoka"]

    GOAL --- GO1["na-stres"]
    GOAL --- GO2["na-energię"]
    GOAL --- GO3["na-trawienie"]
    GOAL --- GO4["na-odporność"]
    GOAL --- GO5["na-sen"]
```

---

## 5. Ścieżki użytkownika (User Flows)

```mermaid
flowchart TD
    START((Wejście))

    START --> A["Ścieżka A\n🧠 Quiz-first\n(nowy klient)"]
    START --> B["Ścieżka B\n🛍️ Browse\n(doświadczony)"]
    START --> C["Ścieżka C\n🔍 Search\n(wie czego szuka)"]
    START --> D["Ścieżka D\n🔄 Repeat\n(powracający)"]
    START --> E["Ścieżka E\n📖 Edukacyjna"]

    A --> A1["Landing / Home"]
    A1 --> A2["Quiz (6-8 pytań)"]
    A2 --> A3["Wyniki + rekomendacje"]
    A3 --> A4["Strona produktu"]
    A4 --> A5["Koszyk"]
    A5 --> A6["Checkout"]
    A6 --> DONE["✅ Zamówienie"]

    B --> B1["Strona główna"]
    B1 --> B2["Sklep / Kategoria"]
    B2 --> B3["Filtry + Sortowanie"]
    B3 --> B4["Strona produktu"]
    B4 --> A5

    C --> C1["Header → Wyszukiwarka"]
    C1 --> C2["Wyniki wyszukiwania"]
    C2 --> C3["Strona produktu"]
    C3 --> A5

    D --> D1["Logowanie"]
    D1 --> D2["Profil → Historia / Ulubione"]
    D2 --> D3["Powtórz zamówienie"]
    D3 --> A5

    E --> E1["Blog / Poradnik parzenia"]
    E1 --> E2["Link do produktu"]
    E2 --> A5

    style A fill:#e8f5e9,stroke:#388e3c
    style B fill:#fff3e0,stroke:#f57c00
    style C fill:#e3f2fd,stroke:#1976d2
    style D fill:#f3e5f5,stroke:#7b1fa2
    style E fill:#fce4ec,stroke:#c62828
    style DONE fill:#2d6a4f,color:#fff
```

---

## 6. Matryca treści × strona

| Treść / Komponent | Główna | Sklep | Produkt | Quiz | Wyniki | Koszyk | Checkout | Profil | O nas |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Header + nawigacja | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Footer | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Wyszukiwarka | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Badge koszyka | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hero / CTA quiz | ✅ | | | | | | | | |
| Kafelki kategorii | ✅ | | | | | | | | |
| Karuzela bestsellerów | ✅ | | | | | | | | |
| Listing produktów | | ✅ | | | ✅ | | | | |
| Filtry | | ✅ | | | ✅ | | | | |
| Sortowanie | | ✅ | | | ✅ | | | | |
| Mood badge'e | ✅ | ✅ | ✅ | | ✅ | ✅ | | | |
| Galeria zdjęć | | | ✅ | | | | | | |
| Sekcja parzenia | | | ✅ | | | | | | |
| Recenzje | | | ✅ | | | | | | |
| Cross-sell | | | ✅ | | | | | | |
| Pytania quizu | | | | ✅ | | | | | |
| Pasek postępu | | | | ✅ | | | ✅ | | |
| Rekomendacje | | | | | ✅ | | | | |
| Score dopasowania | | | | | ✅ | | | | |
| Edycja koszyka | | | | | | ✅ | | | |
| Kod rabatowy | | | | | | ✅ | ✅ | | |
| Formularz danych | | | | | | | ✅ | ✅ | |
| Wybór dostawy | | | | | | | ✅ | | |
| Historia zamówień | | | | | | | | ✅ | |
| Historia quizów | | | | | | | | ✅ | |
| Ulubione | | | | | | | | ✅ | |
| Newsletter | ✅ | | | | | | | | |
| Social proof | ✅ | | | | | | | | |
| Toast system | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 7. Priorytet widoczności elementów (Visual Hierarchy)

```
STRONA GŁÓWNA – kolejność skanowania wzroku:

1. 🔴 HERO + CTA QUIZ          ← Główne działanie
2. 🟠 Kategorie herbat          ← Orientacja
3. 🟡 Bestsellery               ← Social proof + sprzedaż
4. 🟢 Sekcja quizu              ← Drugie CTA
5. 🔵 Nowości                   ← Odkrywanie
6. ⚪ Newsletter + footer       ← Retencja

STRONA PRODUKTU – kolejność:

1. 🔴 Zdjęcie + Nazwa + Cena   ← Identyfikacja
2. 🟠 Mood badge'e              ← Emocjonalne dopasowanie
3. 🟡 Parzenie (temp/czas)      ← Praktyczna wartość
4. 🟢 Dodaj do koszyka          ← Konwersja
5. 🔵 Opis + storytelling       ← Budowanie wartości
6. ⚪ Recenzje + cross-sell     ← Walidacja + upsell
```