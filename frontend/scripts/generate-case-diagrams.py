#!/usr/bin/env python3
"""Generate the case-study architecture diagrams as standalone SVGs."""

from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parents[1] / "public/assets/case-studies"
W, H = 1200, 600
BG = "#100b1c"
PANEL = "#171126"
LINE = "#3a284f"
CREAM = "#f5efe0"
MUTED = "#9b8fb3"
TEAL = "#5eead4"
AMBER = "#fbbf24"
VIOLET = "#c4b5fd"
PINK = "#f472b6"


def text(x, y, value, size=18, fill=CREAM, weight="400", anchor="start", spacing=0):
    return (
        f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" '
        f'font-weight="{weight}" text-anchor="{anchor}" '
        f'font-family="ui-monospace, SFMono-Regular, Menlo, monospace" '
        f'letter-spacing="{spacing}">{escape(value)}</text>'
    )


def box(x, y, w, h, title, lines, color=TEAL, dashed=False):
    dash = ' stroke-dasharray="8 7"' if dashed else ""
    parts = [
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{PANEL}" '
        f'stroke="{LINE}" stroke-width="2"{dash}/>',
        f'<rect x="{x}" y="{y}" width="8" height="{h}" fill="{color}"/>',
        text(x + 22, y + 38, title, 20, CREAM, "700"),
    ]
    for index, line in enumerate(lines):
        parts.append(text(x + 22, y + 68 + index * 24, line, 15, MUTED))
    return "".join(parts)


def arrow(points, color=TEAL):
    d = "M " + " L ".join(f"{x} {y}" for x, y in points)
    return (
        f'<path d="{d}" fill="none" stroke="{color}" stroke-width="3" '
        'marker-end="url(#arrow)"/>'
    )


def label(x, y, value, color=MUTED, anchor="start"):
    return text(x, y, value, 14, color, "400", anchor, "1")


def frame(title, subtitle, body, caption):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="{escape(title)} architecture diagram">
<defs>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M40 0H0V40" fill="none" stroke="#2a1b3d" stroke-width="1"/>
  </pattern>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0L10 5L0 10z" fill="{TEAL}"/>
  </marker>
</defs>
<rect width="{W}" height="{H}" fill="{BG}"/>
<rect width="{W}" height="{H}" fill="url(#grid)" opacity="0.55"/>
<rect x="24" y="24" width="{W - 48}" height="{H - 48}" fill="none" stroke="{LINE}" stroke-width="2"/>
{text(56, 74, title, 24, CREAM, "700", spacing=2)}
{text(56, 102, subtitle, 14, MUTED, spacing=1)}
{body}
{text(56, 560, "SAMVIVAN.MY.ID  /  CASE STUDY", 13, MUTED, spacing=1)}
{text(1144, 560, caption, 13, AMBER, anchor="end", spacing=1)}
</svg>
'''


def lyra():
    body = [
        box(60, 200, 190, 110, "ListenBrainz", ["recommendations"], VIOLET),
        box(310, 180, 230, 150, "Lidarr", ["primary acquisition", "torrents / usenet"], TEAL),
        box(600, 205, 170, 100, "Found?", ["wait window"], AMBER),
        box(920, 200, 220, 110, "Library", ["Navidrome / Jellyfin"], PINK),
        box(600, 390, 170, 100, "yt-dlp", ["fallback audio"], AMBER, dashed=True),
        box(830, 390, 200, 100, "MusicBrainz", ["tags + cover art"], VIOLET),
        box(60, 400, 400, 90, "SQLite", ["artist state · dedup · fallback status"], TEAL),
        arrow([(250, 255), (310, 255)]),
        label(256, 238, "artists"),
        arrow([(540, 255), (600, 255)]),
        label(545, 238, "release"),
        arrow([(770, 255), (920, 255)]),
        label(812, 244, "yes"),
        arrow([(685, 305), (685, 390)], AMBER),
        label(700, 354, "no / missing", AMBER),
        arrow([(770, 440), (830, 440)], AMBER),
        label(780, 424, "tag"),
        arrow([(930, 390), (930, 310)], VIOLET),
        label(944, 354, "tagged"),
        label(60, 360, "PRIMARY", TEAL),
        label(600, 366, "FALLBACK", AMBER),
        label(920, 170, "FINAL", PINK),
        label(60, 520, "The primary path keeps quality. The fallback path keeps the library complete.", MUTED),
    ]
    return frame(
        "LYRA",
        "MUSIC AUTOMATION  /  LISTENBRAINZ -> LIDARR -> FALLBACK -> TAGGED LIBRARY",
        "".join(body),
        "SELF-HOSTED",
    )


def octopad():
    body = [
        box(60, 220, 220, 140, "8 mechanical keys", ["single click · double click", "long press · LED"], AMBER),
        box(320, 195, 220, 180, "ESP32-C3", ["BLE HID + USB Serial", "dual layer switch", "standalone HID mode"], TEAL),
        box(650, 120, 250, 105, "Desktop mode", ["shortcuts · navigation"], VIOLET),
        box(650, 265, 250, 105, "Home Assistant", ["REST calls · IoT actions"], PINK),
        box(650, 410, 250, 105, "Native apps", ["GTK4 · PySide6 / Qt6", "profiles · event monitor"], TEAL),
        box(320, 430, 220, 85, "No web server", ["no Docker · no daemon"], AMBER, dashed=True),
        arrow([(280, 290), (320, 290)]),
        arrow([(540, 240), (650, 172)]),
        label(552, 220, "BLE"),
        arrow([(540, 320), (650, 317)]),
        label(552, 308, "BLE"),
        arrow([(540, 350), (600, 350), (600, 462), (650, 462)]),
        label(548, 392, "serial"),
        label(60, 400, "DUAL LAYER", AMBER),
        label(60, 540, "The pad keeps working after the config app closes.", MUTED),
    ]
    return frame(
        "OCTOPAD",
        "ESP32-C3  /  8 KEYS  /  BLE HID + USB SERIAL  /  NATIVE APPS",
        "".join(body),
        "OPEN SOURCE",
    )


def n8n():
    body = [
        box(50, 200, 170, 110, "Schedule", ["cron trigger"], VIOLET),
        box(260, 200, 190, 110, "Retrieve", ["active workflows"], TEAL),
        box(490, 200, 180, 110, "List files", ["target GitHub repo"], TEAL),
        box(710, 200, 160, 110, "Exists?", ["IF node"], AMBER),
        box(920, 130, 210, 100, "Update file", ["existing workflow"], TEAL, dashed=True),
        box(920, 290, 210, 100, "Upload file", ["new workflow"], TEAL, dashed=True),
        box(710, 430, 420, 90, "Git history", ["one JSON per workflow · timestamped commit"], PINK),
        arrow([(220, 255), (260, 255)]),
        arrow([(450, 255), (490, 255)]),
        arrow([(670, 255), (710, 255)]),
        arrow([(870, 230), (920, 180)]),
        label(880, 208, "true"),
        arrow([(870, 280), (920, 340)]),
        label(880, 322, "false"),
        arrow([(1130, 180), (1155, 180), (1155, 475), (1130, 475)]),
        arrow([(1025, 390), (1025, 430)]),
        label(50, 520, "No manual exports after the initial setup.", MUTED),
    ]
    return frame(
        "N8N WORKFLOWS BACKUP",
        "SCHEDULE -> RETRIEVE -> COMPARE -> UPDATE / UPLOAD -> COMMIT",
        "".join(body),
        "RUNNING IN THE HOMELAB",
    )


def portfolio():
    body = [
        box(50, 210, 170, 120, "Push", ["main branch"], VIOLET),
        box(250, 210, 190, 120, "Verify", ["lint · type-check", "production build"], TEAL),
        box(470, 210, 190, 120, "Deploy", ["exact commit SHA"], TEAL),
        box(690, 210, 190, 120, "Health", ["container healthy"], AMBER),
        box(910, 210, 210, 120, "Smoke + live", ["routes · sitemap", "canonical · audio"], PINK),
        box(690, 420, 430, 100, "On failure: rollback", ["portfolio:previous · health + smoke"], AMBER, dashed=True),
        arrow([(220, 270), (250, 270)]),
        arrow([(440, 270), (470, 270)]),
        arrow([(660, 270), (690, 270)]),
        arrow([(880, 270), (910, 270)]),
        label(884, 250, "ok"),
        arrow([(785, 330), (785, 375), (900, 375), (900, 420)], AMBER),
        arrow([(1015, 330), (1015, 420)], AMBER),
        label(810, 368, "fail", AMBER),
        label(1024, 388, "fail", AMBER),
        label(50, 520, "A failing verify job never reaches the server.", MUTED),
    ]
    return frame(
        "PORTFOLIO DEPLOY PIPELINE",
        "PUSH -> VERIFY -> DEPLOY SHA -> HEALTH -> SMOKE -> LIVE / ROLLBACK",
        "".join(body),
        "GITHUB ACTIONS",
    )


def main():
    (OUT / "lyra-flow.svg").write_text(lyra())
    (OUT / "octopad-flow.svg").write_text(octopad())
    (OUT / "n8n-flow.svg").write_text(n8n())
    (OUT / "portfolio-pipeline.svg").write_text(portfolio())
    print("wrote lyra-flow.svg, octopad-flow.svg, n8n-flow.svg, portfolio-pipeline.svg")


if __name__ == "__main__":
    main()
