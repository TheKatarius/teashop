# 🍵 TeaShop – Schemat Powiązań

```mermaid
erDiagram
    USER ||--o{ ORDER : "składa"
    USER ||--o{ QUIZ_RESULT : "wykonuje"
    USER ||--o{ FAVORITE : "dodaje"
    USER ||--o{ REVIEW : "pisze"
    USER ||--o{ CART : "posiada"
    USER {
        uuid id PK
        string name
        string email
        string password_hash
        string avatar
        json saved_address
        timestamp created_at
    }

    CART ||--|{ CART_ITEM : "zawiera"
    CART {
        uuid id PK
        uuid user_id FK
        string status
        timestamp updated_at
    }

    CART_ITEM }o--|| PRODUCT : "dotyczy"
    CART_ITEM {
        uuid id PK
        uuid cart_id FK
        uuid product_id FK
        int quantity
        string weight_option
    }

    ORDER ||--|{ ORDER_ITEM : "zawiera"
    ORDER ||--|| DELIVERY : "ma"
    ORDER ||--|| PAYMENT : "ma"
    ORDER {
        uuid id PK
        uuid user_id FK
        string guest_email
        decimal total_price
        decimal delivery_cost
        string coupon_code
        string status
        timestamp created_at
    }

    ORDER_ITEM }o--|| PRODUCT : "dotyczy"
    ORDER_ITEM {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        string weight_option
        decimal unit_price
    }

    DELIVERY {
        uuid id PK
        uuid order_id FK
        string method
        string address_line
        string city
        string postal_code
        string paczkomat_id
        string tracking_number
        string status
    }

    PAYMENT {
        uuid id PK
        uuid order_id FK
        string provider
        string method
        string transaction_id
        string status
        timestamp paid_at
    }

    PRODUCT ||--|{ PRODUCT_MOOD_TAG : "ma"
    PRODUCT ||--|{ PRODUCT_FLAVOR_TAG : "ma"
    PRODUCT ||--o{ REVIEW : "otrzymuje"
    PRODUCT ||--o{ ORDER_ITEM : "w zamówieniach"
    PRODUCT ||--o{ CART_ITEM : "w koszykach"
    PRODUCT ||--o{ FAVORITE : "ulubiony"
    PRODUCT }o--|| CATEGORY : "należy do"
    PRODUCT }o--o{ GIFT_SET : "w zestawie"
    PRODUCT {
        uuid id PK
        string name
        string slug
        uuid category_id FK
        string subcategory
        decimal price
        json weight_options
        string description_short
        text description_long
        string origin
        json brewing
        string caffeine_level
        string strength
        boolean is_bestseller
        boolean is_new
        boolean is_available
        int stock
        float reviews_avg
        int reviews_count
        timestamp created_at
    }

    CATEGORY {
        uuid id PK
        string name
        string slug
        string icon
    }

    PRODUCT_MOOD_TAG }o--|| MOOD_TAG : "referencja"
    PRODUCT_MOOD_TAG {
        uuid id PK
        uuid product_id FK
        uuid mood_tag_id FK
        float weight
    }

    MOOD_TAG {
        uuid id PK
        string name
        string emoji
        string color
    }

    PRODUCT_FLAVOR_TAG }o--|| FLAVOR_TAG : "referencja"
    PRODUCT_FLAVOR_TAG {
        uuid id PK
        uuid product_id FK
        uuid flavor_tag_id FK
    }

    FLAVOR_TAG {
        uuid id PK
        string name
    }

    QUIZ_RESULT ||--|{ QUIZ_ANSWER : "zawiera"
    QUIZ_RESULT ||--o{ QUIZ_RECOMMENDATION : "generuje"
    QUIZ_RESULT {
        uuid id PK
        uuid user_id FK
        string session_id
        string goal
        timestamp created_at
    }

    QUIZ_ANSWER }o--|| QUIZ_QUESTION : "na pytanie"
    QUIZ_ANSWER {
        uuid id PK
        uuid quiz_result_id FK
        uuid question_id FK
        string selected_option
        json generated_tags
    }

    QUIZ_QUESTION ||--|{ QUIZ_OPTION : "ma opcje"
    QUIZ_QUESTION {
        uuid id PK
        string text
        string type
        int order
    }

    QUIZ_OPTION {
        uuid id PK
        uuid question_id FK
        string label
        string icon
        json tag_weights
    }

    QUIZ_RECOMMENDATION }o--|| PRODUCT : "sugeruje"
    QUIZ_RECOMMENDATION {
        uuid id PK
        uuid quiz_result_id FK
        uuid product_id FK
        float score
        int rank
    }

    REVIEW {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        int rating
        text content
        timestamp created_at
    }

    FAVORITE {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        timestamp created_at
    }

    GIFT_SET ||--|{ GIFT_SET_ITEM : "zawiera"
    GIFT_SET {
        uuid id PK
        string name
        string slug
        decimal price
        string description
        string image
    }

    GIFT_SET_ITEM }o--|| PRODUCT : "produkt"
    GIFT_SET_ITEM {
        uuid id PK
        uuid gift_set_id FK
        uuid product_id FK
        string weight_option
    }
```

---

## 🔗 Schemat przepływu danych

```mermaid
flowchart LR
    subgraph CLIENT["🖥️ Frontend"]
        LS["localStorage\n─────────\ncart\nfavorites\nquizResult\nsavedAddress"]
        UI["React / Next.js"]
    end

    subgraph API["⚙️ Backend / API"]
        AUTH["/auth\nlogin | register | logout"]
        PRODUCTS["/products\nCRUD | filtrowanie | search"]
        QUIZ_API["/quiz\npytania | submit | wyniki"]
        CART_API["/cart\nadd | update | remove"]
        ORDERS["/orders\ncreate | status | history"]
        FAVS["/favorites\nadd | remove | list"]
        REVIEWS_API["/reviews\ncreate | list"]
        GIFTS["/giftSets\nlist | detail"]
    end

    subgraph DB["🗄️ Baza danych"]
        PG["PostgreSQL\n─────────\nusers\nproducts\norders\nquiz_results\nreviews\nfavorites"]
    end

    subgraph EXTERNAL["🌐 Zewnętrzne"]
        P24["Przelewy24 / Stripe\n💳 Płatności"]
        INPOST["InPost API\n📦 Paczkomaty"]
        CDN["Cloudinary / S3\n🖼️ Zdjęcia"]
        MAIL["Serwer e-mail\n📧 Powiadomienia"]
    end

    UI <-->|REST / fetch| AUTH
    UI <-->|REST / fetch| PRODUCTS
    UI <-->|REST / fetch| QUIZ_API
    UI <-->|REST / fetch| CART_API
    UI <-->|REST / fetch| ORDERS
    UI <-->|REST / fetch| FAVS
    UI <-->|REST / fetch| REVIEWS_API
    UI <-->|REST / fetch| GIFTS
    UI <-->|read/write| LS

    AUTH <--> PG
    PRODUCTS <--> PG
    QUIZ_API <--> PG
    CART_API <--> PG
    ORDERS <--> PG
    FAVS <--> PG
    REVIEWS_API <--> PG

    ORDERS -->|webhook| P24
    ORDERS -->|tracking| INPOST
    PRODUCTS -->|img src| CDN
    ORDERS -->|potwierdzenie| MAIL

    LS -.->|migracja przy rejestracji| AUTH

    style CLIENT fill:#e3f2fd,stroke:#1565c0
    style API fill:#e8f5e9,stroke:#2e7d32
    style DB fill:#fff3e0,stroke:#ef6c00
    style EXTERNAL fill:#fce4ec,stroke:#c62828
```

---

## 🔄 Kluczowe powiązania – podsumowanie

| Relacja | Typ | Opis |
|---|---|---|
| User → Cart | 1:1 | Każdy user ma jeden aktywny koszyk |
| User → Order | 1:N | User może mieć wiele zamówień |
| User → Quiz Result | 1:N | User może robić quiz wielokrotnie |
| User → Favorite | 1:N | Wiele ulubionych produktów |
| User → Review | 1:N | Wiele recenzji |
| Product → Mood Tag | N:M | Produkt ma wiele tagów z wagami |
| Product → Flavor Tag | N:M | Produkt ma wiele tagów smakowych |
| Product → Category | N:1 | Produkt należy do jednej kategorii |
| Product → Gift Set | N:M | Produkt może być w wielu zestawach |
| Quiz Result → Quiz Answer | 1:N | Wynik zawiera odpowiedzi na pytania |
| Quiz Option → Product | pośrednia | Opcja generuje tagi → scoring → rekomendacja produktu |
| Order → Delivery | 1:1 | Jedno zamówienie = jedna dostawa |
| Order → Payment | 1:1 | Jedno zamówienie = jedna płatność |
| localStorage → User | migracja | Dane gościa migrują do konta przy rejestracji |