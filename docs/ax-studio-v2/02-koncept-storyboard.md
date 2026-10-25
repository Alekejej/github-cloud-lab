# ax-studio.pl v2 — Etap 2: Koncept i storyboard

> Kierunek od klienta: **przekaz wizualny jak Lusion**, ale strona opowiada **historię przeplataną
> reklamą**. Każdy ekran ma inny styl, żeby pokazać, ile estetyk potrafimy zrobić.
> Przez wszystkie ekrany przeplata się przycisk zachęcający do rozmowy z Kubą.

Działający prototyp: [`prototyp/index.html`](prototyp/index.html) (opublikowany też jako artefakt, link w PR).

## Big idea: „Dwa światy. Jedno studio."

Na stronie głównej, jak u Lusion, na żywo renderują się dwie błyszczące krople (WebGL):
**niebieska** (wyobraźnia, design) i **czarna** (logika, kod). Gdy przewijasz historię, krople się
zbliżają, a w finale zlewają w jedną. Cała narracja strony zamyka się w jednym obiekcie 3D.

## Storyboard

| # | Rozdział | Styl wizualny | Przejście *na* ten ekran | Ruch w środku |
|---|---|---|---|---|
| 0 | **Strona główna**: „Dwa światy. Jedno studio." + opis SEO | Lusion: chłodna jasna szarość, granatowy atrament, elektryczny błękit, krople 3D | Wejście tytułu linia po linii | Krople reagują na kursor i zbliżają się przy scrollu |
| 1 | **Geneza**: „Wszystko zaczęło się w piaskownicy" | Dziecięcy, kredkowy: żółty piasek, granat, czerwień, pismo ręczne, naklejki | **Rozsypany piasek**: koło rozlewa się od dołu ekranu | Rysunki kredką rysują się podczas scrolla, naklejki wskakują z odbiciem |
| 2 | **Dwa skrajne światy** | Ekran przecięty na pół: różowy serif (emocja) / granatowy mono z cyjanem (logika) | **Rozcięcie**: szew otwiera ekran od środka | Szew podąża za kursorem (na telefonie poziomo, za palcem) |
| 3 | **Realizacje** | Szwajcarski editorial: biel, czerń, czerwień, siatka, rozciągany grotesk | **Żaluzje**: 12 kolumn siatki odsłania się kaskadowo | Tytuł rozciąga się w poziomie, podgląd projektu leci za kursorem |
| 4 | **Opinie** | Luksus: butelkowa zieleń, szampan, złoto, klasyczny serif kursywą | **Kurtyna teatralna**: rozsuwa się pionowo, treść lekko się oddala | Wolne przenikanie cytatów |
| 5 | **Automatyzacje** | Terminal CRT: bursztynowy fosfor na czerni, linie skanowania | **Włączenie monitora**: najpierw jasna kreska, potem cały obraz | Impulsy płyną między węzłami, dziennik zapisuje się linia po linii |
| 6 | **Finał / kontakt** | Powrót do Lusion: krople zlane w jedną | **Przelot**: terminal powiększa się i rozmywa | Duży przycisk „Umów rozmowę z Kubą" |

### Przycisk-kameleon („Umów rozmowę z Kubą")
Pływający przycisk jest widoczny na każdym ekranie i **przebiera się w styl danego rozdziału**:
- hero: niebieska pigułka, „Umów rozmowę z Kubą"
- piaskownica: krzywa ramka kredką, „Chodź do piaskownicy, pogadaj z Kubą"
- dwa światy: pół serif, pół mono, „Kuba połączy oba_swiaty"
- realizacje: czerwony prostokąt wersalikami, „ROZMOWA Z KUBĄ →"
- opinie: złota ramka, kursywa, „Zarezerwuj rozmowę z Kubą"
- terminal: `> umow --z kuba_` z migającym kursorem

Sam przycisk też pokazuje range studia. Chowa się, gdy na ekranie jest duży przycisk w treści, żeby nie było dwóch naraz.

## Robocza treść SEO strony głównej

**Title:** AX Studio | Strony internetowe, branding, motion design i automatyzacje

**Meta description:** AX Studio projektuje i koduje strony internetowe, identyfikacje wizualne,
grafiki i motion design oraz buduje automatyzacje dla firm.

**Akapit pod H1 (jak u Lusion):**
> AX Studio projektuje i koduje strony internetowe, identyfikacje wizualne, grafiki i motion design.
> Budujemy też automatyzacje, które zdejmują z firm powtarzalną pracę. Łączymy wyobraźnię projektanta
> z precyzją inżyniera, żeby Twoja marka wyglądała świetnie i działała sprawniej.

Każdy rozdział ma prawdziwy nagłówek H2 w HTML, a canvas jest tylko dekoracją, więc treść jest w pełni indeksowalna.

## Co w prototypie jest robocze (do podmiany)

- **[imię wspólnika]** w Genezie: nie wiem, jak ma na imię kolega z piaskownicy.
- **Dwa światy** zinterpretowałem jako *design/emocje* kontra *kod/logika*. Jeśli to inne światy
  (np. sport i sztuka, ulica i korpo), zmienia się tekst i styl rozdziału 2.
- **Realizacje**: 5 przykładowych pozycji, oznaczonych na stronie jako przykłady.
- **Opinie**: 3 przykładowe cytaty, podpisane jako przykładowe. Nie publikujemy ich jako prawdziwych.
- **Formularz** niczego nie wysyła. W produkcji podpinamy kalendarz Kuby (np. Cal.com) albo formularz do CRM.
- Kroje pisma to Google Fonts dobrane pod prototyp. W produkcji warto rozważyć licencjonowane kroje premium.

## Claude Motion a przejścia na stronie

Prośba była, żeby przejścia generować w Claude Motion. W tej sesji Claude Motion nie jest dostępny.
Z dostępnych opisów wynika też, że to narzędzie eksportujące **filmy MP4** (animowane explainery),
a nie żywe przejścia, które reagują na scroll i kursor. Dlatego przejścia w prototypie są
napisane w kodzie (GSAP ScrollTrigger + clip-path + shader WebGL). Claude Motion przyda się
za to do:
- reelsów i krótkich filmów promujących premierę strony,
- animowanych case studies (MP4 wstawiane jako wideo na stronie),
- materiałów „making of" do zgłoszenia na Awwwards.

## Następne kroki

1. Ocena prototypu: które przejścia i style zostają, co zmienić.
2. Uzupełnienie treści: imię wspólnika, prawdziwe „dwa światy", realne projekty i opinie.
3. Etap 3: design system „zmiennokształtny" (tokeny dla każdego świata) w Figmie / Claude Design.
4. Etap 4: produkcyjny stack (Astro/Next + Three.js), wydajność, wersja z ograniczonym ruchem.
