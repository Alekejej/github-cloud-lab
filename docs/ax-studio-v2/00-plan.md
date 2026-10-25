# ax-studio.pl v2 — Plan główny

> **Ambicja:** strona-popisówka na poziomie światowych studiów (Lusion, Immersive Garden,
> Locomotive). Dużo motion, przejść i zmian designu. Ma wprawiać w osłupienie i
> *udowadniać*, że ax-studio odnajduje się w każdej estetyce.
>
> **Cel mierzalny:** Awwwards Site of the Day + Developer Award w ciągu 3 miesięcy od
> premiery. Ambitnie: nominacja do Site of the Month.

## Roadmapa etapów

| Etap | Nazwa | Rezultat | Status |
|---|---|---|---|
| 1 | **Poprzeczka** | Lista benchmarków + wzorce + luka rynkowa → [`01-poprzeczka-research.md`](01-poprzeczka-research.md) | ✅ wersja robocza, czeka na Twoje oceny |
| 2 | Koncept i narracja | Big idea „Dwa światy. Jedno studio.", storyboard 7 ekranów, działający prototyp → [`02-koncept-storyboard.md`](02-koncept-storyboard.md), [`prototyp/`](prototyp/index.html) | 🟡 prototyp gotowy, czeka na ocenę |
| 3 | Design system „zmiennokształtny" | Tokeny, które pozwalają przełączać całe estetyki. 4–6 „skórek" | ⏳ |
| 4 | Prototypy motion (R&D) | 3–5 technicznych spike'ów: przejście shaderem, morph skórek, persistent canvas | ⏳ |
| 5 | Produkcja | Pełna strona, case studies, treści PL/EN | ⏳ |
| 6 | Optymalizacja i QA | Performance budget, a11y, fallbacki mobile, `prefers-reduced-motion` | ⏳ |
| 7 | Launch i zgłoszenia | Awwwards, CSSDA, FWA, Behance, case study „making of" | ⏳ |

## Robocza big idea (do walidacji w etapie 2)

### „Shapeshifter" — jedno studio, wiele twarzy
Strona, która **zmienia cały język projektowy na oczach użytkownika**: typografię, siatkę,
kolor, sposób ruchu, nawet dźwięk. Te same treści, a kolejne „skórki" pokazują range:

- **Swiss / editorial**: siatka, Helvetica-like, czerń i biel, precyzyjny ruch
- **Luxury**: serif, dużo powietrza, wolne, kinowe przejścia, ciepłe światło 3D
- **Brutalism**: surowe bloki, mono, ostre cięcia bez easingu
- **Y2K / chrome**: metaliczne shadery, bańki, przesycone kolory
- **Organic / 3D**: płynne kształty WebGL, miękka fizyka
- **Tech / terminal**: ASCII, glitch, kod jako estetyka

Mechaniki przełączania (do prototypu):
1. **Scroll**: każda sekcja to inna estetyka, a granica między nimi to efektowny morph shaderem.
2. **„Remix" button / kursor**: użytkownik sam przełącza styl strony w dowolnym momencie.
3. **Case study w swoim stylu**: wchodząc w projekt, cała strona przybiera estetykę tego projektu.

Uwaga: to *hipoteza*. Etap 2 może ją potwierdzić albo zastąpić czymś lepszym.

## Wstępny stack technologiczny (do potwierdzenia w etapie 4)

| Obszar | Propozycja | Po co |
|---|---|---|
| Framework | Astro lub Next.js | SSR/SSG, SEO, szybki first paint |
| Przejścia stron | View Transitions API + własny router dla sceny WebGL | Ciągłość między podstronami |
| 3D / shadery | Three.js (WebGPU renderer + TSL, fallback WebGL2) lub OGL | Persistent canvas, przejścia shaderem |
| Animacje | GSAP (ScrollTrigger, SplitText, Flip) | Standard branżowy, precyzyjny timeline |
| Smooth scroll | Lenis | Płynność bez łamania natywnego scrolla |
| Design tokens | CSS custom properties + `@property` | Animowalne przełączanie skórek |
| Motion prototyping | Rive / Theatre.js | Złożone sekwencje i ręczna reżyseria |
| CMS | Sanity lub Payload | Case studies bez dotykania kodu |
| Hosting | Netlify / Vercel / Cloudflare | Edge, preview deploys |

## Nieprzekraczalne zasady jakości

- **Performance budget**: LCP < 2,5 s na 4G, 60 fps na średnim laptopie, JS initial < 200 KB gz.
- **Mobile nie jest „wersją gorszą"**: osobna, przemyślana reżyseria ruchu.
- **Dostępność**: `prefers-reduced-motion`, nawigacja klawiaturą, kontrasty w *każdej* skórce.
- **SEO**: treść w HTML, a nie tylko w canvasie.

## Otwarte pytania do Ciebie

1. Jakie realne projekty/case studies mamy do pokazania (i ile)?
2. Czy strona ma być PL + EN od startu?
3. Budżet czasowy: kiedy chcemy premierę?
4. Czy robimy własne 3D/ilustracje, czy korzystamy z generatywnych narzędzi do assetów?
5. Dźwięk: tak czy nie?
