# Front End Dev Demo: See What CSS Does

A small website that helps front-end students understand CSS in about five seconds:
press one button and watch the page fall back to plain HTML.

**Live site:** https://alonktz.github.io/CssToggleWebsite/

## What you can do

- **Switch all CSS off and on** with the big button, or press <kbd>C</kbd>.
- **Peel the CSS layer by layer.** The styles are split into four files, and each one can be switched on its own
  (or with <kbd>1</kbd>–<kbd>4</kbd>):

  | Layer | File | What it does |
  | --- | --- | --- |
  | Colors & type | `css/colors.css` | fonts, colors, backgrounds, gradient text |
  | Spacing & boxes | `css/boxes.css` | the box model: margin, padding, borders, rounded corners |
  | Layout | `css/layout.css` | Flexbox, Grid, sticky header, media queries |
  | Effects | `css/effects.css` | shadows, transitions, hover states, animations |

  Each layer has a **view** link that opens its file, so students can match what disappeared to the code that made it.
- **Change the accent color.** The swatches change one CSS custom property (`--color-accent`),
  and every heading, button and gradient on the page follows. It's a quick way to show why variables matter.
- **Try the live example.** "How They Work Together" shows the HTML, CSS and JavaScript for a button
  next to a working copy of it.

The demo panel keeps its own small stylesheet (`css/panel.css`) that is never switched off,
so the controls are always easy to find even when the page is plain HTML.

## How it works

Every page stylesheet is a `<link>` tagged with `data-layer`. `script.js` switches a file off by setting its
`media` attribute to `not all`, which matches no screen, so the browser ignores the whole file.
`css/tokens.css` holds the shared custom properties and only follows the main switch.

No build step and no dependencies: plain HTML, CSS and JavaScript.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx http-server . -p 8080
```

## Project layout

```
index.html        page markup and the demo panel
script.js         CSS switches, keyboard shortcuts, accent color, live example
css/tokens.css    custom properties (colors, spacing, fonts)
css/colors.css    layer 1: colors & type
css/boxes.css     layer 2: spacing & boxes
css/layout.css    layer 3: layout
css/effects.css   layer 4: effects
css/panel.css     the demo panel (always on)
```

## Support

If this helped you or your students, you can [buy me a coffee](https://www.paypal.com/paypalme/Alonkatz14) ☕
