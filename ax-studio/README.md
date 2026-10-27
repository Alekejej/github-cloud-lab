# AX Studio

Prosty system dla małych firm: **klienci, faktury, przychody i koszty oraz przypomnienia** w jednym miejscu.
Wygląd w identyfikacji AX Studio (tło `#e6e9f0`, tekst `#0c0f1c`, akcent `#2c46ff`, Bricolage Grotesque,
Geist, JetBrains Mono), dostosowany do starszych użytkowników: duży tekst (20 px), kontrast min. 4.5:1, duże
przyciski, polskie nazwy bez żargonu i pytanie „Czy na pewno?” przed każdym usunięciem.

## Co potrafi (MVP)

| Ekran | Co robi |
| --- | --- |
| **Pulpit** | Zadania na dziś, nieopłacone faktury (z wyróżnieniem tych po terminie), bilans miesiąca. |
| **Klienci** | Kartoteka: dane kontaktowe, NIP, notatki, wyszukiwarka, historia faktur, przycisk „Zadzwoń”. |
| **Faktury** | Faktury VAT (23/8/5/0%), numeracja `FV/n/MM/RRRR`, wydruk / zapis do PDF, „Klient zapłacił” → wpłata trafia do przychodów. |
| **Przychody i koszty** | Wpisy z kwotą i opisem, podsumowanie miesiąca, przechodzenie między miesiącami. |
| **Przypomnienia** | Zadania z datą i opcjonalnym klientem, odhaczanie „Zrobione”. |
| **Moja firma** | Dane sprzedawcy i numer konta drukowane na fakturach. |

## Technologia

- Next.js 16 (App Router, Server Actions) + Tailwind CSS 4
- Supabase: logowanie (e-mail + hasło) i baza Postgres
- Każdy użytkownik widzi tylko własne dane (Row Level Security — `supabase/migrations/0001_init.sql`)
- Kwoty trzymane w groszach (liczby całkowite), żeby uniknąć błędów zaokrągleń

## Uruchomienie

1. Projekt Supabase **AX Studio** (`ujenbpkqtakhxnfsremy`, Frankfurt) jest już założony i ma wgrane migracje
   z `supabase/migrations/`. Dla nowego projektu: wykonaj te pliki po kolei (SQL Editor albo `supabase db push`).
2. W Supabase → Authentication → URL Configuration dodaj `http://localhost:3000/auth/confirm` do Redirect URLs.
3. Skopiuj `.env.example` do `.env.local` (wartości dla projektu AX Studio są już w nim wpisane).
4. Uruchom:

```bash
cd ax-studio
npm install
npm run dev
```

## Polecenia

```bash
npm test          # testy logiki (kwoty, VAT, numeracja, daty)
npm run typecheck
npm run lint
npm run build
```

## Następne kroki (poza MVP)

- Wysyłka faktury e-mailem do klienta i przypomnienia o płatności
- Integracja z KSeF (Krajowy System e-Faktur)
- Faktury korygujące i proformy
- Eksport zestawienia dla księgowej (CSV / PDF)
