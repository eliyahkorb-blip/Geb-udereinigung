# König Gebäudereinigung — Website

Komplett neu aufgebaute, responsive Website für König Gebäudereinigung (Inhaber: Leart Spahiu), Würzburg. Statisches HTML/CSS/JavaScript ohne Frameworks oder externe Abhängigkeiten.

## Design (aktueller Stand)

Die Website wurde auf ein dunkles, redaktionelles Premium-Design umgestellt, orientiert an der Atmosphäre der früheren König-Gebäudereinigung-Seite (nicht kopiert, nur als Stimmungsvorlage genutzt):

- **Farben:** Hintergrund `#0B0F14`, Sektionen `#121821`, Flächen `#1A2330`, dezente Gold-Akzentfarbe `#C9A96A`, keine grellen Farben.
- **Typografie:** Überschriften in Playfair Display (Serif), Fließtext in Inter. Beide Schriften sind **lokal selbst gehostet** (`/assets/fonts/*.woff2`, SIL-Open-Font-License), es wird zu keinem Zeitpunkt Google Fonts oder ein anderer externer Font-Dienst geladen.
- **Layout:** Editoriale Abschnitte mit dünnen Trennlinien statt bunter, stark abgerundeter Karten. Maximaler Radius 8 px. Dünne Linien-Icons statt bunter Icon-Kreise.
- **Hero:** Großes dunkles Gebäudefoto als Hintergrund mit weichem Verlauf von links (Text) nach rechts (Bild sichtbar), linksbündige Headline, zwei klare Buttons.
- **Bilder:** Reale Fotos vom Auftraggeber (siehe Abschnitt „Bilder" unten), einheitlich leicht abgedunkelt/entsättigt (`filter: saturate(0.92) brightness(0.94)`) für einen konsistenten Bildlook.
- **Animationen:** Sehr dezentes Fade-In beim Scrollen (IntersectionObserver), reagiert auf `prefers-reduced-motion`. Wichtig: Der versteckte Ausgangszustand wird ausschließlich über eine Klasse aktiviert, die JavaScript zur Laufzeit setzt (`js-fade-armed`) — bleibt JavaScript aus (Fehler, Blocker, Crawler ohne JS), ist der komplette Inhalt sofort sichtbar. Das war ursprünglich ein Bug (Inhalte blieben unsichtbar, wenn kein Scroll-Trigger ausgelöst wurde) und wurde behoben.
- **Accessibility-Pille:** Kleiner, dezenter (40 px, halbtransparent mit Blur), bleibt an allen Breakpoints vollständig bedienbar. Auf sehr kleinen Mobilgeräten wurde ein Layout-Bug behoben, bei dem der Hero-Inhalt so weit nach unten reichte, dass der sekundäre Hero-Button („Jetzt anrufen") von der Pille verdeckt wurde — Hero-Abstände auf Mobile wurden gezielt reduziert, bis in allen getesteten Breakpoints (360/390/430 px) mindestens 18 px Abstand bestehen.

## GitHub-Pages-Kompatibilität (Pfade)

Diese Website ist aktuell als GitHub-Pages-**Projekt-Repository** veröffentlicht unter:

```
https://eliyahkorb-blip.github.io/Geb-udereinigung/
```

Alle internen Links sowie CSS-, JavaScript-, Bild- und Favicon-Referenzen verwenden **absolute Pfade mit Repo-Namen-Präfix**, z. B. `/Geb-udereinigung/assets/css/style.css?v=10`, `/Geb-udereinigung/leistungen.html`. Der Präfix wird zentral über die Konstante `PAGES_BASE_PATH` im Generator-Skript gesteuert.

**Warum nicht einfach root-relative Pfade (`assets/css/style.css` ohne führenden Schrägstrich)?** Das war der erste Fix-Versuch und ist auf den ersten Blick einfacher — er hat aber eine Schwachstelle: Reine relative Pfade lösen sich abhängig davon auf, ob die aktuell aufgerufene URL mit oder ohne abschließenden Schrägstrich endet (`/Geb-udereinigung` vs. `/Geb-udereinigung/`). Fehlt der Schrägstrich an irgendeiner Stelle (z. B. durch einen geteilten Link, Safari-Adressleisten-Verhalten auf iOS oder eine App, die Weiterleitungen nicht befolgt), lösen sich relative Pfade eine Ebene zu hoch auf und zeigen wieder auf `https://eliyahkorb-blip.github.io/assets/...` (ohne Repo-Namen) — exakt der ursprüngliche Fehler, und zwar unabhängig vom Browser-Cache. Das erklärt, warum das Problem auf manchen Geräten auch nach Cache leeren/Privatem Fenster bestehen blieb.

Absolute Pfade mit Repo-Präfix (`/Geb-udereinigung/assets/...`) sind von dieser Mehrdeutigkeit **komplett unabhängig**: Sie lösen sich immer exakt gleich auf, egal ob mit/ohne abschließenden Schrägstrich aufgerufen, von welcher Unterseite aus oder über welchen Einstiegspunkt (geteilter Link, Lesezeichen, Startbildschirm-Icon usw.).

- Ausgenommen bleiben bewusst die vollständig absoluten Produktions-URLs (`canonical`-Tags, Open-Graph-/Twitter-Bilder, JSON-LD), die weiterhin auf `https://www.koenig-gebaeudereinigung.com/` zeigen — das ist korrektes SEO-Verhalten für die künftige eigene Domain und unabhängig vom aktuellen Hosting-Ort.
- **Umzug auf eigene Domain / GitHub-User-Page (Root-Hosting):** Sobald die Seite unter `www.koenig-gebaeudereinigung.com` (oder einer GitHub-User-Page ohne Unterpfad) läuft, muss `PAGES_BASE_PATH` im Generator-Skript auf einen leeren String (`""`) gesetzt und die Seite neu erzeugt werden — alle Referenzen werden dann automatisch wieder zu einfachen `/assets/...`-Pfaden ohne Repo-Präfix.
- `ASSET_VERSION` (aktuell `10`) wird bei jeder CSS/JS-Änderung hochgezählt, damit Browser die neue Version garantiert laden statt eine gecachte Kopie zu verwenden (`style.css?v=10`, `main.js?v=10`).

### Testverfahren (da direkter Internetzugriff aus dieser Umgebung nicht möglich ist)

In der Entwicklungsumgebung, in der diese Änderungen erstellt wurden, ist **kein Zugriff auf das öffentliche Internet möglich** — jede ausgehende Verbindung zu externen Domains wird von der Sandbox mit `403 Forbidden` blockiert, nachweislich auch zu domänenfremden Testzielen (`example.com`, `google.com`), nicht nur zu `github.io`. Die echte Live-URL konnte daher zu keinem Zeitpunkt direkt im Browser aufgerufen werden. Stattdessen wurde zweigleisig verifiziert:

1. **Deployter Quelltext über die GitHub-API** (separater, nicht blockierter Zugang): `index.html` und alle Asset-Verzeichnisse wurden nach jedem Push direkt aus dem GitHub-Repository abgerufen und mit dem erwarteten, lokal erzeugten Stand verglichen — Pfade, Groß-/Kleinschreibung und Dateiendungen stimmen exakt überein. Die GitHub-Actions-Logs bestätigen zusätzlich, dass die „pages build and deployment"-Pipeline lediglich `Checkout → Upload artifact → Deploy` ausführt, also den kompletten Repo-Inhalt unverändert hochlädt (kein Jekyll-Build, keine Dateiausschlüsse).
2. **Lokale 1:1-Simulation der Live-URL-Struktur**: Der komplette Repo-Inhalt wurde lokal unter einem `/Geb-udereinigung/`-Unterpfad ausgeliefert (identisch zur echten Pfadstruktur) und mit einem Headless-Browser (Playwright) getestet — explizit **inklusive der Variante ohne abschließenden Schrägstrich**, also genau des Szenarios, das mit reinen relativen Pfaden zum gemeldeten Fehler führte. Ergebnis nach Umstellung auf Repo-Präfix-Pfade: alle 10 Seiten, mit und ohne abschließenden Schrägstrich, 0 fehlgeschlagene Requests, 0 Console-Errors, CSS wird angewendet, Logo/Bilder laden, 0 WCAG-2A/AA-Verstöße (axe-core).

**Bitte nach dem Deployment einmal die Live-URL aufrufen und bestätigen, dass CSS/Bilder jetzt laden.** Sollte weiterhin ein Problem auftreten, hilft am meisten: Safari → Teilen-Symbol → „Seite neu laden" bzw. ein vollständiger Aufruf der URL `https://eliyahkorb-blip.github.io/Geb-udereinigung/` (mit abschließendem Schrägstrich) in einem neuen Tab.

## Was wurde gebaut

**Seiten**
- `index.html` — Startseite mit Hero, Leistungsübersicht, Zielgruppen, „Warum König Gebäudereinigung“, Ablauf, CTA-Bereichen und Links zu den lokalen Landingpages
- `leistungen.html` — alle sechs Leistungen im Detail (Unterhalts-, Glas-, Sanitär-, Treppenhaus-, Boden-, Sonderreinigung)
- `ueber-uns.html` — Über uns, Werte, Hintergrund (Fehler „Unsere Anspruch“ zu „Unser Anspruch“ korrigiert)
- `kontakt.html` — Kontaktdaten, Routen-Button (externer Link statt eingebetteter Karte), vollständiges Kontaktformular
- `impressum.html` — vollständiges Impressum nach § 5 DDG
- `datenschutz.html` — vollständige Datenschutzerklärung (Hosting, Logfiles, Formular, Cookies, Google-Maps-Link, externe Dienste)
- `bueroreinigung-wuerzburg/`, `treppenhausreinigung-wuerzburg/`, `glasreinigung-wuerzburg/`, `praxisreinigung-wuerzburg/` — SEO-Landingpages mit eigenem Title, eigener Meta Description, eigener H1 und Service-JSON-LD
- `robots.txt`, `sitemap.xml`

**Technik**
- Reines HTML/CSS/JavaScript, keine Frameworks, keine externen Libraries, keine Google Fonts (nur Systemschriften)
- Mobile-first, getestet auf 360/390/430/768/1024/1440 px, keine horizontale Scrollbar
- Sticky Header, mobiles Vollbild-Menü, mobile Sticky-CTA-Leiste („Anrufen“ / „Anfrage“)
- Accessibility-Pille unten links: Schriftgröße +/− (3 Stufen) und Kontrastmodus, Einstellungen werden in `localStorage` gespeichert und nach Reload wiederhergestellt; vollständig per Tastatur bedienbar, sichtbare Fokuszustände, `aria-label`/`aria-pressed`/`aria-expanded`
- Cookie-Consent-Banner mit vier Kategorien (Notwendig, Statistik, Externe Medien, Übersetzung), Auswahl wird in `localStorage` gespeichert; aktuell sind **keine** Tracking-/Analyse-/Kartendienste eingebunden — das System ist nur technisch vorbereitet
- JSON-LD strukturierte Daten: `CleaningService`/`LocalBusiness` auf den Hauptseiten, `Service` mit `provider` auf den vier Landingpages
- Open-Graph- und Twitter-Card-Tags, eindeutiger Title/Meta-Description/Canonical je Seite, genau eine `<h1>` pro Seite
- Kontaktformular: Da diese Website **kein serverseitiges Backend** hat, öffnet das Absenden einen vorausgefüllten `mailto:`-Entwurf an `info@koenig-gebaeudereinigung.com`. Siehe Abschnitt „Formular-Versand“ unten für eine echte Serverlösung.

**Qualitätssicherung (automatisiert durchgeführt)**
- Alle 10 Seiten in Chromium gerendert: HTTP 200, 0 Console-Errors, keine horizontale Scrollbar bei 360 px
- Alle internen Links, Anker-Sprungziele und Bildpfade auf Gültigkeit geprüft (keine Broken Links)
- `axe-core` (WCAG 2A/2AA) auf allen 10 Seiten ausgeführt: **0 Verstöße**, auch im aktivierten Kontrastmodus mit maximaler Schriftgröße
- Dabei gefundene und behobene Probleme:
  - Farbkontrast der Gold-Akzentfarbe auf Text (Eyebrow-Labels, aktiver Navigationslink) war zu niedrig — dafür wurde die Textvariante `--color-accent-text` (dunkler, WCAG-AA-konform) ergänzt
  - Footer-Absätze erbten fälschlich die dunkle Fließtextfarbe und waren auf dem dunklen Footer-Hintergrund kaum lesbar — behoben
  - Mobiles Menü ließ sich nicht per Klick auf den Menü-Button wieder schließen, da der Vollbild-Overlay im Stapelkontext über dem Button lag — behoben
  - `backdrop-filter` am Header erzeugte einen neuen Containing Block für das `position: fixed`-Menü und ließ es auf ca. 120 px Höhe kollabieren, statt den Bildschirm zu füllen — Header nutzt jetzt eine deckende Hintergrundfarbe statt Blur-Effekt
  - Leistungs-Karten-Raster sprang bei 768 px (Tablet) fälschlich auf eine Spalte zurück — Zwischenschritt mit zwei Spalten ergänzt

## Bilder — Status

Die echte Website `www.koenig-gebaeudereinigung.com` war für automatisierten Abruf durchgehend nicht erreichbar (HTTP 403 bei jedem Zugriffsversuch). Der Inhaber hat daraufhin **Original-Fotos und ein Logo direkt von der alten Website zur Verfügung gestellt**, die inzwischen eingebaut wurden.

**Bereits mit echten Fotos/Logo ersetzt** (als WebP optimiert, korrekte `width`/`height` zur Vermeidung von Layout-Verschiebungen, `loading="lazy"` außer bei Logo und Hero-Bild):

| Datei | Zeigt | Verwendet in |
|---|---|---|
| `logo.webp` | Transparentes Logo, Schriftzug „König Gebäudereinigung“ | Header und Footer aller Seiten |
| `hero-building.webp` | Modernes Bürogebäude mit Glasfassade, Dämmerung | Hero-Hintergrund Startseite, Leistungskarte „Unterhaltsreinigung“, Landingpage Büroreinigung |
| `about.webp` | Beleuchteter Markenschriftzug in einem Eingangsbereich | Über-uns-Seite |
| `glasreinigung.webp` | Eingangsbereich mit durchgehenden Glasfronten | Startseite, Leistungen, Landingpage Glasreinigung |
| `sanitaerreinigung.webp` | Waschraum mit Waschbecken, Armaturen, Handtüchern | Startseite, Leistungen, Landingpage Praxisreinigung |
| `treppenhausreinigung.webp` | Treppenhaus mit Geländer und Eingangstür | Startseite, Leistungen, Landingpage Treppenhausreinigung |
| `bodenreinigung.webp` | Leerer Büroraum mit Bodenbelag in Nahaufnahme | Startseite, Leistungen |
| `og-image.png` | Logo auf dunklem Grund, generiert aus dem echten Logo | Open-Graph-/Twitter-Vorschaubild (PNG statt SVG, da nicht alle Social-Plattformen SVG-Vorschaubilder zuverlässig rendern) |

Diese Bilder stammen nachweislich vom Auftraggeber selbst (Logo und Fotos von der bisherigen Website) — es handelt sich also **nicht um Stockfotos oder KI-generierte Bilder**, wie in der Aufgabenstellung gefordert. Damit zeigen 5 der 6 Leistungs-Karten im Startseiten-Grid echte Fotos.

**Weiterhin als klar gekennzeichneter Platzhalter aktiv** (dunkle SVG-Grafik mit Icon im Corporate-Design, Hinweistext „Platzhalter — ersetzen durch …"), da dafür kein passendes Foto vorlag:

| Datei (Platzhalter) | Ersetzen durch | Verwendet in |
|---|---|---|
| `sonderreinigung.svg` | `sonderreinigung.webp` | Startseite, Leistungen |

Empfehlung für das letzte Motiv: ein Foto von einer Sonderreinigungssituation (z. B. nach Umbauarbeiten) nachreichen, als WebP exportieren (Dateiname exakt `sonderreinigung.webp`), danach `width`/`height` im betroffenen `<img>`-Tag an die tatsächlichen Pixelmaße anpassen.

## Rechtliche Punkte — vom Inhaber/Anwalt final prüfen lassen

- **Impressum/Datenschutz**: Die Texte basieren auf den im Auftrag angegebenen Firmendaten. Bitte durch den Inhaber bzw. einen Rechtsbeistand gegenprüfen lassen, insbesondere die Angabe zur zuständigen Datenschutz-Aufsichtsbehörde (aktuell: Bayerisches Landesamt für Datenschutzaufsicht, angenommen aufgrund des Firmensitzes in Bayern).
- **Kleinunternehmerstatus (§ 19 UStG)**: Wurde wie angegeben übernommen — bitte regelmäßig prüfen, ob der Status weiterhin zutrifft (Umsatzgrenzen).
- **WhatsApp-Kontakt**: Da nicht bestätigt war, ob WhatsApp tatsächlich angeboten wird, wurde **kein** WhatsApp-Kontaktweg eingebaut oder in der Datenschutzerklärung beschrieben. Falls WhatsApp künftig genutzt wird, muss die Datenschutzerklärung entsprechend ergänzt werden (Anbieter Meta/WhatsApp Ireland, Rechtsgrundlage, Datenübermittlung in Drittländer).
- **IONOS SiteAnalytics / Website-Übersetzer / Google Maps**: Aktuell **nicht** eingebunden. Die Cookie-Consent-Struktur ist technisch vorbereitet (Kategorien „Statistik“, „Externe Medien“, „Übersetzung“), es fließen aber noch keine Daten an diese Dienste. Vor einer tatsächlichen Aktivierung ist die Datenschutzerklärung um Anbieter, Zweck und Rechtsgrundlage zu ergänzen.
- **Verbraucherstreitbeilegung**: Wie vorgegeben als „nicht bereit/verpflichtet“ übernommen — bitte bestätigen, dass dies weiterhin zutrifft.
- **Gewerbeanmeldung/Handwerkskammer-Angaben**: Falls für die Gebäudereinigung eine Eintragung (z. B. Handwerksrolle/-kammer) besteht, sollte geprüft werden, ob diese zusätzlich im Impressum anzugeben ist.
- **Kontaktformular ohne Backend**: Rechtlich unkritisch, aber technisch wichtig — siehe nächster Abschnitt. Nutzer müssen klar erkennen, dass sich ein E-Mail-Programm öffnet (im Formular als Hinweistext hinterlegt).

## Formular-Versand — aktueller Stand und Optionen

Diese Website ist rein statisch (kein Server, kein Datenbank-Backend). Das Kontaktformular in `kontakt.html` nutzt daher aktuell einen **mailto-Fallback**: Beim Absenden öffnet JavaScript (`assets/js/main.js`, Funktion `initContactForm`) das Standard-E-Mail-Programm des Besuchers mit einem vorausgefüllten Entwurf an `info@koenig-gebaeudereinigung.com`. Der Nutzer muss die E-Mail dort noch selbst abschicken. Das ist transparent im Formular vermerkt.

Für einen echten, direkten Versand ohne Zutun des Nutzers wird eine der folgenden Optionen benötigt:
1. **Formular-Backend-Dienst** (z. B. Formspree, Getform, Basin) — Formular-`action` auf den Dienst zeigen lassen, kein eigener Server nötig.
2. **IONOS-eigenes Formular-/Mail-Skript**, falls im Hosting-Paket enthalten (z. B. PHP-`mail()`-Skript auf dem IONOS-Webspace).
3. **Eigenes kleines Backend** (z. B. serverless Function), das die Formulardaten per SMTP an die Firmenadresse sendet.

In jedem Fall: Nach Einrichtung eines echten Backends muss Abschnitt 4.1 der Datenschutzerklärung (`datenschutz.html`) entsprechend aktualisiert werden.

## Deployment

Die Website besteht ausschließlich aus statischen Dateien und kann auf jedem Webspace bzw. Static-Hosting ausgeliefert werden (z. B. IONOS-Webhosting, wie in der Datenschutzerklärung angegeben).

**Allgemein**
1. Gesamten Inhalt dieses Repositories (alle `.html`-Dateien, `robots.txt`, `sitemap.xml`, `/assets/`) in das Root-Verzeichnis des Webspace hochladen.
2. Sicherstellen, dass die Domain `www.koenig-gebaeudereinigung.com` auf dieses Root-Verzeichnis zeigt — alle internen Links, Canonical-Tags, `sitemap.xml` und die JSON-LD-Daten verwenden absolute Pfade ab `/` bzw. die volle Domain.
3. HTTPS/SSL-Zertifikat aktivieren (bei IONOS in der Regel automatisch verfügbar).
4. Die vier SEO-Landingpages liegen als `Ordnername/index.html` vor, damit sie unter sauberen URLs wie `/bueroreinigung-wuerzburg/` erreichbar sind — das setzt voraus, dass der Server `index.html` als Verzeichnis-Standarddatei ausliefert (bei praktisch jedem Standard-Webhosting inkl. IONOS der Fall).
5. Platzhalterbilder gemäß obiger Tabelle durch echte Fotos ersetzen, bevor die Seite live geht.
6. Formular-Backend gemäß obigem Abschnitt einrichten (optional, aber empfohlen).

**Falls stattdessen GitHub Pages genutzt werden soll**
- Repository-Einstellungen → Pages → Branch auswählen, der diese Dateien enthält.
- Da GitHub Pages ebenfalls rein statisch ist, bleibt der mailto-Fallback bzw. ein externer Formular-Dienst (siehe oben) erforderlich.
- Bei Nutzung einer Custom Domain (`www.koenig-gebaeudereinigung.com`) eine `CNAME`-Datei mit der Domain im Root anlegen und den DNS-Eintrag beim Domain-Provider entsprechend setzen.

## Lokale Vorschau

Da es sich um reines HTML/CSS/JS ohne Build-Schritt handelt, reicht ein einfacher statischer Server im Projektverzeichnis, z. B.:

```
python3 -m http.server 8000
```

Anschließend `http://localhost:8000/index.html` im Browser öffnen.
