# ax-studio.pl v2 — Etap 1: Poprzeczka (research benchmarków)

> Cel etapu: ustalić, **z kim się mierzymy**. Zanim zaprojektujemy cokolwiek, chcemy
> mieć listę stron, które naprawdę wprawiają w osłupienie, i rozumieć, *dlaczego* działają.
> v2 ma być „popisówką": motion, przejścia, zmiany designu w locie, dowód, że odnajdujemy
> się w każdej estetyce.

Data researchu: 2026-10-25. Źródła na dole. Część pozycji pochodzi z listingów Awwwards
pobranych przez wyszukiwarkę. **Przed cytowaniem w ofercie/pitchu sprawdź każdą datę i nagrodę
bezpośrednio na awwwards.com**, bo listingi bywają niespójne.

---

## 1. Tier S — „to jest poziom, który chcemy dogonić"

Studia i strony, które ustawiają światową poprzeczkę w motion i WebGL.

| # | Strona / studio | Co jest w niej wyjątkowe | Czego się uczymy |
|---|---|---|---|
| 1 | **Lusion** (lusion.co), Bristol | Strona studia z tytułem Site of the Year od FWA, Awwwards i CSSDA. Real-time 3D, fizyka, płynne przejścia między scenami. W kwietniu 2026 ich projekt **Oryzo AI** zdobył Awwwards Site of the Month. | Strona studia sama jest case study. Jedna spójna scena 3D, przez którą „przelatuje" cała nawigacja. |
| 2 | **Immersive Garden** (immersive-g.com), Paryż | **Agency of the Year 2025** na Awwwards. Marzec 2026: Site of the Month za *GQ & AP The Extraordinary Lab*. | Kinowa reżyseria, kolor i światło jak w filmie. Luksusowa estetyka bez kiczu. |
| 3 | **abeto** (Messenger, Igloo Inc) | *Messenger* z odznaką **Site of the Year 2025** + Developer Award. *Igloo Inc*: Developer Site of the Year 2024. | Interaktywne mikroświaty. Strona jako „gra", którą chce się eksplorować. |
| 4 | **Bruno Simon — portfolio** (bruno-simon.com) | Awwwards **Site of the Month, styczeń 2026**. Portfolio jako jeżdżalny świat 3D. | Odwaga konceptu: portfolio nie musi wyglądać jak portfolio. Zapamiętywalność > konwencja. |
| 5 | **Active Theory** (activetheory.net) | Studio WebGL, fizyka, futurystyczne immersyjne storytelling. v4 portfolio: SOTM. | Własny engine i pipeline. Pokazuje, że za efektem stoi technologia, a nie tylko plugin. |
| 6 | **Locomotive** (locomotive.ca), Montreal | Agency of the Year na Awwwards 7 lat z rzędu (do lutego 2025). | Typografia + smooth scroll + rytm. Autorzy Locomotive Scroll. Poziom craftu w detalach. |
| 7 | **Resn** (resn.co.nz) | Nominacja Agency of the Year 2025. Każdy projekt w portfolio podany jak krótki film. | Storytelling: każdy case study ma swoją dramaturgię. |

## 2. Tier A — studia, które świetnie pokazują *range* (różne estetyki)

To jest najbliżej Twojego briefu: **„pokazać, że odnajdujemy się w każdym designie"**.

| Strona / studio | Dlaczego pasuje do briefu |
|---|---|
| **Malvah** (RPA), **Studio of the Year 2025** | Branding + digital. Wyróżnieni za jakość i *konsekwencję* przez cały rok, czyli za szeroki wachlarz, a nie jeden hit. |
| **Exo Ape** (Holandia) | 17 wyróżnień SOTD/SOTM. Ostatnio *Fluid Glass* (mar 2026), *Inversa* (SOTD, gru 2025). Każdy projekt w innej estetyce, ta sama jakość ruchu. |
| **The First The Last** | Dwa Site of the Month w 2026: *Son Daven* (czerwiec) i *ERA Residence* (sierpień). Premium real estate / lifestyle. |
| **Bürocratik** | *Floema*: Site of the Month, maj 2026. |
| **Unseen Studio** | Hover-scaling miniatur, przejścia stron między case study. Wzór „jak studio powinno się prezentować". |
| **Dogstudio / DEPT** | WebGL, kinowy hero reel. |
| **Epic Agency** | Typografia jako główny bohater, płynne przejścia sekcji. |
| **Upperquad** | Full-screen video hero, case studies animowane zmieniającymi się kształtami. |
| **Shopify Design — The Renaissance Edition** | SOTM, luty 2026. Dowód, że ogromna ilość treści (ponad 150 aktualizacji) może być spektakularna. |

## 3. Portfolia solo devów/designerów — świeże (2026)

Dobry benchmark dla *mikrointerakcji* i *osobowości* strony.

| Portfolio | Wyróżnienie (wg listingów Awwwards) |
|---|---|
| Brandon Yasin | SOTD + Developer Award, 24.10.2026 |
| Maria Vasilyeva (Mia Renard) | SOTD + Dev Award, 09.10.2026 |
| Jesper Landberg | SOTD 29.09.2026 + Portfolio Honors |
| Gil Huybrecht | SOTD 21.09.2026 |
| Léo Parpeix — Portfolio 2026 | SOTD 14.09.2026 |
| Corentin Bernadou | SOTD 25.03.2026 |
| Why Zero (Sindhur Dutta) | Site of the Month, wrzesień 2026 |

Klasyki do przejrzenia (z własnej wiedzy, bez weryfikacji dat): Dennis Snellenberg,
Aristide Benoist, Robin Noguier, Cuberto, Obys Agency, darkroom.engineering
(ex-Studio Freight, autorzy Lenis).

## 4. Polski kontekst

- **Huncwot** (Warszawa): kilka SOTD (m.in. *Where is Poland?*, Ogród Pendereckiego, Nowy Teatr). Daty niezweryfikowane.
- **Properly Studio**: świeży rebrand Axi na 100+ rynkach (paź 2026).
- Wniosek: w Polsce **nie ma jeszcze studia, które konsekwentnie gra w lidze Lusion/Immersive Garden**.
  To jest nisza, którą v2 może zająć wizerunkowo.

---

## 5. Wzorce, które się powtarzają u najlepszych

1. **Jedna ciągła scena zamiast „podstron".** Persistent WebGL canvas pod DOM-em, a przejście między stronami to ruch kamery lub morph obiektu, nie przeładowanie. (Codrops, czerwiec 2026: *Persistent Page Transitions with WebGPU*.)
2. **Typografia jako animowany bohater.** Split text, variable fonts animowane osią wagi/szerokości.
3. **Smooth scroll + scroll-driven timeline.** Lenis + GSAP ScrollTrigger albo natywne CSS scroll-driven animations.
4. **Shader-based przejścia obrazów.** Dystorsja, płyny, „szkło" (Exo Ape *Fluid Glass*).
5. **Kursor jako narzędzie.** Reaguje, deformuje, odsłania.
6. **Dźwięk (opcjonalny).** Subtelny sound design z wyraźnym toggle.
7. **Preloader jako zapowiedź.** Pierwsze 2–3 s budują oczekiwanie.
8. **Case study = mini-film.** Każdy projekt ma własny rytm, kolor i muzykę ruchu.
9. **Performance jako część craftu.** Developer Award ocenia też kod, a nie tylko efekt.

## 6. Luka, którą możemy zająć: „Shapeshifter"

W researchu **nie znalazłem strony studia, której główną mechaniką jest zmiana całej estetyki
w locie**, np. ta sama treść, a strona płynnie przechodzi z brutalizmu w luksusowy minimalizm,
potem w Y2K, potem w editorial. Najbliżej są scrollytellingowe strony typu *Nomadic Tribe*,
ale tam zmienia się scena, a nie *język projektowy*.

**To jest nasz potencjalny koncept-wyróżnik:** strona, która *dosłownie demonstruje*
„odnajdujemy się w każdym designie", zamiast o tym mówić.

---

## 7. Zadanie dla Ciebie (zamknięcie etapu 1)

Przejdź przez strony z sekcji 1–3 (najlepiej na desktopie, z dźwiękiem) i dla każdej daj:

- ⭐ **1–5** — jak bardzo „wow"
- ✅ / ❌ — czy to kierunek dla ax-studio
- 1 zdanie — *co konkretnie* Cię ruszyło (przejście? typografia? 3D? dźwięk?)

Na tej podstawie zbudujemy moodboard i wybierzemy 3 kierunki do etapu 2.

---

## Źródła

- Awwwards — Sites of the Month: https://www.awwwards.com/websites/sites_of_the_month/
- Awwwards — Agency of the Year 2025: https://www.awwwards.com/annual-awards-2025/agency-of-the-year
- Awwwards — Studio of the Year 2025: https://www.awwwards.com/annual-awards-2025/studio-of-the-year
- LBB — Malvah Studio of the Year 2025: https://lbbonline.com/news/Malvah-Studio-of-the-Year-2025-Awwwards
- PR Newswire — Locomotive Agency of the Year 7. raz: https://www.prnewswire.com/news-releases/locomotive-crowned-awwwards-agency-of-the-year-for-the-7th-year-in-a-row-and-wins-a-second-webby-award-302559750.html
- Awwwards — Best WebGL Websites: https://www.awwwards.com/websites/webgl/
- Awwwards — Exo Ape: https://www.awwwards.com/exo-ape/
- Awwwards — case study Lusion: https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html
- Awwwards — Immersive Garden interview: https://awwwards.com/interview-immersive-garden-win-studio-and-developer-site-of-the-year.html
- Codrops — Lusion profile (2026): https://tympanus.net/codrops/2026/04/13/lusion-where-digital-craft-meets-ambitious-experimentation/
- Codrops — Persistent Page Transitions with WebGPU (2026): https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript/
- School of Motion — 10 Websites with Great Animation in 2026: https://schoolofmotion.com/blog/10-websites-with-great-animation-in-2026
- Colorlib — Creative agency website examples 2026: https://colorlib.com/wp/creative-agency-website-examples/
- Hontran — Best award-winning websites 2026: https://www.hontran.dev/blog/best-award-winning-websites-2026
- Digital Cultures — Best of Poland (Huncwot): https://2019.digitalcultures.pl/en/program/best-of-poland-part-iv
- PAP — Axi / Properly Studio: https://www.pap.pl/mediaroom/axi-odswieza-marke-na-ponad-100-rynkach-we-wspolpracy-z-properly-studio
