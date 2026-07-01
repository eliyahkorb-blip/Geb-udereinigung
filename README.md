# König Gebäudereinigung — Website

Komplett neu aufgebaute, responsive Website für König Gebäudereinigung (Inhaber: Leart Spahiu), Würzburg. Statisches HTML/CSS/JavaScript ohne Frameworks oder externe Abhängigkeiten.

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

## Fehlende Bilder (Platzhalter aktiv)

Die echte Website `www.koenig-gebaeudereinigung.com` konnte **nicht automatisiert ausgelesen werden**: Jeder Zugriffsversuch (direkter Abruf und über das Web-Fetch-Werkzeug, mit und ohne `www.`, per HTTP und HTTPS) wurde mit **HTTP 403 (Forbidden)** abgewiesen. Auch die Websuche fand keine im Web archivierte/indexierte Version dieser konkreten Domain in Würzburg (die Suchtreffer zu „König Gebäudereinigung“ gehören zu einem anderen, nicht verwandten Betrieb in Krefeld). Es konnten daher **keine echten Fotos extrahiert** werden.

Alle Bildinhalte dieser Website sind aktuell **klar gekennzeichnete Platzhalter** (beschriftete SVG-Grafiken mit Icon, gestricheltem Rahmen und Hinweistext „Platzhalter — ersetzen durch …“). Es wurden **keine Stockfotos und keine KI-generierten Bilder** verwendet.

Folgende Dateien in `/assets/img/` müssen durch echte, für das Unternehmen aufgenommene Fotos ersetzt werden (gleicher Dateiname, Endung `.webp` statt `.svg`, danach den `src`-Pfad in den jeweiligen HTML-Dateien anpassen):

| Datei (Platzhalter) | Ersetzen durch | Verwendet in |
|---|---|---|
| `hero-reinigung.svg` | `hero-reinigung.webp` (min. 1600×1000 px) | Hero-Bereich Startseite |
| `about.svg` | `about.webp` (min. 1200×900 px) | Über-uns-Seite |
| `unterhaltsreinigung.svg` | `unterhaltsreinigung.webp` | Startseite, Leistungen |
| `glasreinigung.svg` | `glasreinigung.webp` | Startseite, Leistungen |
| `sanitaerreinigung.svg` | `sanitaerreinigung.webp` | Startseite, Leistungen, Praxisreinigung-Landingpage |
| `treppenhausreinigung.svg` | `treppenhausreinigung.webp` | Startseite, Leistungen, Treppenhausreinigung-Landingpage |
| `bodenreinigung.svg` | `bodenreinigung.webp` | Startseite, Leistungen |
| `sonderreinigung.svg` | `sonderreinigung.webp` | Startseite, Leistungen |
| `logo.svg` | echtes Firmenlogo, falls vorhanden | Header, Footer aller Seiten |
| `og-image.svg` | `og-image.png`/`.jpg`, 1200×630 px | Open-Graph-Vorschaubild (viele Social-Plattformen rendern SVG nicht zuverlässig) |

`logo.svg` und `og-image.svg` sind eigens gestaltete, einfache Wort-/Bildmarken (kein Stockmaterial), damit die Seite nicht mit generischen Platzhaltern wirkt — sollte der Inhaber ein offizielles Firmenlogo besitzen, bitte damit ersetzen.

Empfehlung: Fotos vom eigenen Reinigungsteam/-objekten in Würzburg machen (Außenansicht Gebäude, Team bei der Arbeit, Detailaufnahmen der sechs Leistungen), als WebP exportieren, `width`/`height`-Attribute in den `<img>`-Tags entsprechend der echten Pixelmaße anpassen und `loading="lazy"` (außer Hero-Bild) beibehalten.

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
