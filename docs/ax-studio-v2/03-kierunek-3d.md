# ax-studio.pl v2 — Kierunek 3D (po feedbacku)

> Feedback do pierwszego prototypu: typ strony jest dobry (historia przeplatana reklamą),
> ale wykonanie to zbiór płaskich stylów, które każdy umie zrobić. Kierunek: **realistyczne
> grafiki 3D, generacje i efekty wow**.

## Co się zmienia

| Było (prototyp 1) | Jest (prototyp 3D) |
|---|---|
| 7 płaskich stylów zrobionych w CSS | 7 fotorealistycznych światów 3D (generacje AI) w jednej kinowej estetyce |
| Przejścia jako maski clip-path | Przejścia shaderami WebGL **na pikselach kadrów**: piasek, roztopiony chrom, rozcięcie, tunel, glitch, fala uderzeniowa |
| Różne fonty w każdym rozdziale | Jedna spokojna typografia (Geist + Instrument Serif), kolor akcentu zmienia się z kadrem |
| Statyczne tło | Soczewka i fala pod kursorem, powolny najazd kamery, aberracja chromatyczna zależna od prędkości scrolla, ziarno filmowe |

Pierwszy prototyp zostaje w repo (`prototyp/`) jako odrzucona wersja.

## Kadry (Higgsfield, 7 × 2 kredyty)

Wspólne DNA: ciemne studio, twarde światło, **płynny chrom** (wyobraźnia) kontra **czarny bazalt** (logika).

| Rozdział | Kadr | Przejście na ten kadr |
|---|---|---|
| 0 Start | Kula z płynnego chromu i kula z bazaltu, między nimi ostrze światła | — |
| 1 Geneza | Piaskownica nocą w snopie światła, zamek z piasku, dwie łopatki: chromowa i czarna | ziarnisty rozpad z żarzącą się krawędzią |
| 2 Dwa światy | Monolit przecięty na pół: chrom płynie, kamień ma wygrawerowane obwody | roztopiony chrom spływa w dół |
| 3 Realizacje | Ciemna galeria, monolity, szklane panele ze światłem | rozcięcie od szwu |
| 4 Opinie | Salon z zielonym aksamitem, rzeźba ze złota i chromu na marmurze | wlot w tunel z rozmyciem radialnym |
| 5 Automatyzacje | Mechanizm jak werk zegarka w skali architektury, bursztynowe impulsy | cyfrowy glitch |
| 6 Kontakt | Chrom i bazalt zlane w jedną rzeźbę | chromowa fala od środka |

Kadry mają trafić do `prototyp-3d/assets/k0.jpg` … `k6.jpg`.

## Następny krok: wideo

Po akceptacji kadrów: 6 przejść wideo (Kling 3.0, pierwsza i ostatnia klatka = sąsiednie kadry,
ok. 8,75 kredytu za sztukę). Przewijanie steruje filmem klatka po klatce, a shadery zostają jako warstwa na wierzchu.
