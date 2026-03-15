# Dokumentation — Code-Dokumentationen Crawler

## Überblick

Der Crawler lädt Dokumentationsseiten herunter, wandelt sie in Markdown um und speichert sie als Knowledge Base für Claude Projects.

**Flow:**
```
URL crawlen → HTML extrahieren → Markdown/PDF speichern → (optional) Anthropic Files API hochladen
```

---

## Installation

```bash
npm install
cp .env.example .env     # ANTHROPIC_API_KEY eintragen
```

---

## Verwendung

### 1. Einzelne Seite crawlen

```bash
node src/index.js <url>
```

**Beispiel:**
```bash
node src/index.js https://developers.facebook.com/docs/graph-api/overview
```

---

### 2. Komplette Dokumentationssektion crawlen (Link-Follow)

Mit `--follow-links` folgt der Crawler automatisch allen internen Links innerhalb desselben URL-Pfadpräfixes (BFS-Algorithmus).

```bash
node src/index.js <url> --follow-links [optionen]
```

**Beispiele:**

```bash
# Standard (50 Seiten, Tiefe 3)
node src/index.js https://developers.facebook.com/docs/graph-api/ --follow-links

# Mehr Seiten und tiefere Verlinkung
node src/index.js https://developers.facebook.com/docs/graph-api/ --follow-links --max-pages 150 --depth 4

# Als eine kombinierte Datei speichern (ideal für Claude Projects Upload)
node src/index.js https://developers.facebook.com/docs/graph-api/ --follow-links --combine

# Direkt in die Anthropic Files API hochladen
node src/index.js https://developers.facebook.com/docs/graph-api/ --follow-links --combine --upload
```

---

## Alle Optionen

| Option | Standard | Beschreibung |
|---|---|---|
| `--follow-links` | aus | Interne Links automatisch folgen |
| `--max-pages <n>` | 50 | Maximale Anzahl crawlbarer Seiten |
| `--depth <n>` | 3 | Maximale Link-Tiefe (Ebenen) |
| `--delay <ms>` | 800 | Pause zwischen Requests (höfliches Crawling) |
| `--combine` | aus | Alle Seiten in eine einzige Markdown-Datei mergen |
| `--pdf` | aus | Zusätzlich PDF-Kopien speichern |
| `--upload` | aus | Datei(en) in Anthropic Files API hochladen |
| `--output <dir>` | `./kb-files` | Ausgabeverzeichnis |

---

## Ausgabe-Dateien

| Modus | Dateiname | Beschreibung |
|---|---|---|
| Einzelseite | `developers-facebook-com-docs-....md` | Eine MD-Datei pro Seite |
| Multi-Page | `developers-facebook-com-docs-....md` | Je eine MD-Datei pro gecrawlter Seite |
| Multi-Page + `--combine` | `developers-facebook-com-docs-...--combined.md` | Alle Seiten in einer Datei |
| `--pdf` | `*.pdf` | PDF-Kopie parallel zur MD-Datei |

---

## Link-Filter-Logik (`shouldFollow`)

Der Crawler folgt nur Links, die **dasselbe Hostname + denselben Pfadpräfix** wie die Start-URL haben.

**Beispiel:**
Start-URL: `https://developers.facebook.com/docs/graph-api/`
→ wird gecrawlt: `https://developers.facebook.com/docs/graph-api/reference/`
→ wird ignoriert: `https://developers.facebook.com/docs/instagram/` *(anderer Pfad)*
→ wird ignoriert: `https://example.com/docs/` *(anderer Hostname)*

Um das Verhalten anzupassen, siehe Kommentare in [`src/site-crawler.js`](src/site-crawler.js) — Zeile ~44: drei vorkonfigurierte Strategien (Pfadpräfix / Hostname-only / Blocklist).

---

## Knowledge Base in Claude verwenden

### Option A — claude.ai Projects (manuell)

> **Hinweis:** Der Datei-Upload in Projects ist nur für **Pro- und Team-Abonnenten** verfügbar und möglicherweise nicht in allen Konten sichtbar.

1. Projekt auf [claude.ai](https://claude.ai) öffnen
2. Im Projekt oben links auf **„Add content"** (oder das Büroklammer-Symbol) klicken
3. Datei aus `./kb-files/` auswählen und hochladen
4. Claude nutzt den Inhalt als Kontext in allen Chats dieses Projekts

Falls der Upload-Button nicht sichtbar ist:

- Prüfe ob du ein **Pro- oder Team-Abo** hast
- Alternativ den Dateiinhalt direkt als **Nachricht** in den Chat einfügen (für kleinere Dateien)

### Option B — Anthropic Files API (programmatisch)

```bash
node src/index.js <url> --upload
```

Die `file_id` aus der Ausgabe direkt im Code verwenden:

```js
{
  type: 'document',
  source: {
    type: 'file',
    file_id: 'file_011CNha...'
  }
}
```

---

## Projektstruktur

```
src/
  index.js          ← CLI-Einstiegspunkt, Orchestrierung
  crawler.js        ← Puppeteer: Seite laden, HTML + PDF exportieren
  site-crawler.js   ← BFS-Crawler: Links folgen, Seiten sammeln
  extractor.js      ← HTML → sauberes Markdown (Turndown)
  uploader.js       ← Anthropic Files API Upload
kb-files/           ← Ausgabe (MD + PDF)
```
