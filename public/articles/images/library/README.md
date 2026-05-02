# S&B Image Library

This is YOUR curated image bank. Drop images here, they get used by the article generator.

## How it works

1. Article tags = `["drake", "future", "album"]`
2. Engine looks for `library/drake/*.jpg` first → uses first image alphabetically
3. If no `library/drake/`, tries `library/future/`
4. If no `library/future/`, tries `library/{pillar}/` (e.g. `library/hiphop/`)
5. If still nothing → falls through to og:image scrape from source URL → AI generation → designed placeholder

## How to add images

Just drop files into the right folder. Filename can be anything. Supported: `.jpg .jpeg .png .webp .gif`.

```
library/drake/
  drake_studio_2024.jpg
  drake_certified_lover.png
  drake_ovo_concert.webp
```

## Priority order within a folder

Files are picked alphabetically. So if you want a specific image picked first, prefix it:

```
library/drake/
  00_main.jpg              ← always picked first
  01_alt.jpg
  drake_studio_2024.jpg
```

## How to retire an image

Move it to `library/_archive/` (folders starting with `_` are ignored).

## How to override per article

If you want a SPECIFIC image on a SPECIFIC article and nothing else, drop it at:

```
public/articles/images/{pillar}/{slug}-hero.jpg
```

Example for the Cap & Gown 7 article:

```
public/articles/images/sneakers/2026-05-01-air-jordan-7-cap-and-gown-graduation-drop-hero.jpg
```

That overrides the library + AI + everything else.

## Folders to start with

Hip-hop:
  `drake/`, `future/`, `kendrick-lamar/`, `travis-scott/`, `metro-boomin/`,
  `tyler-the-creator/`, `tee-grizzley/`, `sauce-walka/`, `lil-baby/`,
  `21-savage/`, `young-thug/`, `playboi-carti/`, `j-cole/`, `nicki-minaj/`,
  `hiphop/` (generic studio/concert shots)

Battle rap:
  `url-tv/`, `rapgrid/`, `tay-roc/`, `geechi-gotti/`, `loaded-lux/`,
  `hollow-da-don/`, `k-shine/`, `tsu-surf/`, `battle-rap/` (generic)

Sneakers:
  `jordan/`, `jordan-1/`, `jordan-3/`, `jordan-4/`, `jordan-5/`, `jordan-6/`,
  `jordan-7/`, `jordan-11/`, `cap-and-gown/`, `toro-bravo/`, `bred/`,
  `nike/`, `nike-dunk/`, `nike-sb/`, `air-force-1/`, `air-max/`,
  `yeezy/`, `adidas/`, `adidas-samba/`, `new-balance/`, `new-balance-9060/`,
  `sneakers/` (generic)

Anime:
  `demon-slayer/`, `jjk/`, `one-piece/`, `naruto/`, `attack-on-titan/`,
  `chainsaw-man/`, `solo-leveling/`, `frieren/`, `bape/`, `anime/` (generic)

Gaming:
  `gta-6/`, `rockstar/`, `ff7/`, `nintendo-switch/`, `playstation/`, `xbox/`,
  `fortnite/`, `tekken/`, `street-fighter/`, `mortal-kombat/`,
  `nba-2k/`, `madden/`, `gaming/` (generic)
