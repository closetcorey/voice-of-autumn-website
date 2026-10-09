# Voices of Autumn — event mini-site

Bilingual (English / 中文) site for **Voices of Autumn**, CAPA-TE's free community concert at Wilson Farm Park on Saturday, October 10, 2026, 2–5 pm.

Plain HTML, CSS and JavaScript. There is no build step: upload the folder as-is.

```
index.html      Home: hero, event facts, program, choir, visit info, CAPA-TE, partner logos
donate.html     Donate (GlueUp link + QR code)
partners.html   Partners by tier + "Become a partner"
css/style.css   All styles (colors and fonts are set at the top)
js/i18n.js      Chinese translations
js/program.js   Concert program and choir/band/crew roster (English + Chinese)
js/main.js      Language toggle, mobile menu, partner logos, partner popup
images/         Photos, poster, logos, QR code
```

## Publishing at concert.capate.org (Bluehost)

The site lives at **https://concert.capate.org**, the "AutumnConcert" site in CAPA-TE's Bluehost account.

1. In Bluehost, go to **Websites**. On the **AutumnConcert** row, click **File Manager**. This opens that site's folder.
2. Download a backup of anything already there, then delete it. That's probably an old `index.html`.
3. Upload a zip of the site files, where `index.html`, `donate.html`, `partners.html`, `css/`, `js/` and `images/` sit at the top level of the zip. Leave out `README.md` and `.git`.
4. Right-click the zip and choose **Extract** into the same folder. Then delete the zip.
5. Open https://concert.capate.org and hard-refresh (Ctrl+Shift+R).
6. In the capate.org WordPress admin, add a **Custom Link** to `https://concert.capate.org` in the menu (Appearance → Menus).

To update the site later, repeat steps 3–5. Extracting overwrites the old files.

Every link and image path is relative, so the files also work in any folder or on any other host. If the address changes, update the `og:image` address in the `<head>` of the three HTML pages. It is the image Facebook and similar apps show when someone shares the link.

### If the site shows "403 Forbidden"

The zip includes a hidden `.htaccess` file that tells the server to open `index.html` as the home page. If you still get a 403:

1. Open `https://concert.capate.org/index.html`. If that works but the bare address doesn't, the `.htaccess` file didn't upload. In File Manager, turn on **Settings → Show Hidden Files** and check that it's there.
2. Check permissions in File Manager: the site folder needs **755**, folders inside it **755**, and files **644**.
3. If it still fails, ask Bluehost support to check the document root and security settings (ModSecurity) for `concert.capate.org`.

## Sharing in Chinese

Add `?lang=zh` to any link to open it in Chinese, e.g. `https://concert.capate.org/?lang=zh` for WeChat. Visitors can switch with the 中文 / English button, and their choice is remembered.

## Editing

| To change… | Edit |
|---|---|
| English text | the HTML page itself |
| Chinese text | `js/i18n.js`: find the key used by the element's `data-i18n` attribute |
| Songs, performers, order | `PROGRAM` in `js/program.js` |
| Choir/band/crew lists | `ROSTER` in `js/program.js` (`NAMES` holds English spellings of Chinese names) |
| Partners | the tier sections in `partners.html` **and** the `PARTNERS` list in `js/main.js` (logo strip + popup; add `popup: false` to keep a logo out of the popup) |
| Donation link | the `Donate now` button in `donate.html` |
| Hero photo | replace `images/hero-autumn.jpg` (a wider, higher-resolution photo, ~1600×800, will look sharper) |

The partner popup appears once per browser session on the Home and Donate pages. It never appears on the Partners page.

## Previewing locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```
