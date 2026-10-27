import json, html, base64, subprocess, os
d = json.load(open('/tmp/vunjo.json'))
crest = base64.b64encode(open('/home/claude/nyumba/public/crest.png','rb').read()).decode()
e = html.escape

def row3(ch, sw, en, extra=""):
    return f'<tr><td class="ch">{e(ch)}</td><td class="sw">{e(sw or "")}</td><td class="en">{e(en)}{extra}</td></tr>'

parts = []
parts.append(f'''
<section class="cover">
  <img src="data:image/png;base64,{crest}" alt="">
  <p class="kicker">Nyumba ya Wachagga · Vijana wa Kichagga</p>
  <h1>Jifunze Kivunjo</h1>
  <p class="sub">Kitabu cha misemo · Phrasebook<br>Kivunjo · Kiswahili · English</p>
  <p class="area">Marangu · Kilema · Mamba · Mwika · Kirua Vunjo</p>
  <p class="foot">Kizazi Kipya · Kilimanjaro ni Kwetu</p>
</section>
''')

# Intro + pronunciation
pron = "".join(f'<li><span class="big">{e(p["sound"])}</span> {e(p["note"])}</li>' for p in d.get("pronunciation", []))
parts.append(f'''
<section>
  <h2>Karibu · Welcome</h2>
  <p>Kitabu hiki kina misemo zaidi ya 300 ya <b>Kivunjo</b>, lahaja ya Kichagga inayozungumzwa Marangu, Kilema, Mamba, Mwika na Kirua Vunjo. Kila msemo umeandikwa kwa Kivunjo, Kiswahili na Kiingereza. Soma kwa sauti, rudia na mzee wako, na utuambie neno linalosemwa tofauti kwenu.</p>
  <p>This phrasebook holds over 300 Vunjo phrases drawn from <i>{e(d["source"]["title"])}</i> by {e(d["source"]["authors"])} ({e(d["source"]["year"])}), reproduced with the authors' permission. Read aloud, practise with an elder, and send us the words your area says differently.</p>
  <h3>Sauti za kufanyia mazoezi · Sounds to practise</h3>
  <ul class="pron">{pron}</ul>
  <div class="tip"><b>Yee</b> = ndiyo / yes &nbsp;·&nbsp; <b>Ote</b> = hapana / no &nbsp;·&nbsp; <b>-pfo</b> mwishoni mwa neno = kukanusha / makes it negative</div>
</section>
''')

for i, l in enumerate(d["lessons"], 1):
    rows = []
    for it in l.get("items", []):
        extra = f'<div class="reply">↳ {e(it["reply"])}</div>' if it.get("reply") else ""
        rows.append(row3(it["ch"], it.get("sw"), it["en"], extra))
    for dr in l.get("drills", []):
        extra = f'<div class="yn"><span class="yee">Yee</span> {e(dr["yes"])}' + (f' &nbsp;<span class="ote">Ote</span> {e(dr["no"])}' if dr.get("no") else "") + '</div>'
        rows.append(row3(dr["q"], dr.get("sw"), dr["en"], extra))
    intro = f'<p class="intro">{e(l["intro"])}</p>' if l.get("intro") else ""
    parts.append(f'''
<section class="lesson">
  <h2><span class="num">{i}</span> {e(l["title"])}</h2>
  {intro}
  <table><thead><tr><th>Kivunjo</th><th>Kiswahili</th><th>English</th></tr></thead><tbody>{"".join(rows)}</tbody></table>
</section>''')

# Grammar
g = []
for card in d.get("grammar", []):
    ex = "".join(f'<tr><td class="ch">{e(a)}</td><td class="en">{e(b)}</td></tr>' for a, b in card["examples"])
    g.append(f'<div class="gcard"><h3>{e(card["title"])}</h3><p>{e(card["body"])}</p><table class="g">{ex}</table></div>')
parts.append(f'<section><h2>Sarufi · Grammar notes</h2><div class="grid">{"".join(g)}</div></section>')

# Conversations
for c in d.get("conversations", []):
    lines = "".join(f'<div class="line"><p class="ch">{e(x[0])}</p>' + (f'<p class="sw">{e(x[2])}</p>' if len(x) > 2 and x[2] else "") + f'<p class="en">{e(x[1])}</p></div>' for x in c["lines"])
    parts.append(f'<section class="conv"><h2>{e(c["title"])}</h2>{lines}</section>')

for t in d.get("texts", []):
    parts.append(f'<section class="text"><h2>{e(t["title"])}</h2>' + "".join(f'<p class="ch">{e(x)}</p>' for x in t["lines"]) + '</section>')

parts.append(f'''
<section class="back">
  <img src="data:image/png;base64,{crest}" alt="">
  <h2>Changia · Contribute</h2>
  <p>Unajua Kimachame, Kikibosho, Kiuru au Kirombo? Rekodi salamu na methali kwa simu yako na tuma kwenye Nyumba ya Wachagga. Kila mchango unathibitishwa na wazungumzaji wawili kabla ya kuchapishwa, na mzungumzaji anatajwa kwa jina.</p>
  <p class="small">Chanzo / Source: {e(d["source"]["title"])}, {e(d["source"]["authors"])}, {e(d["source"]["year"])}. {e(d["source"].get("note",""))}<br>Tafsiri za Kiswahili ni za Nyumba ya Wachagga — tuambie makosa.</p>
  <p class="foot">Vijana wa Kichagga · Kilimanjaro ni Kwetu · Kizazi Kipya</p>
</section>''')

css = '''
@page { size: A5; margin: 14mm 12mm 16mm 12mm; }
@page :first { margin: 0; }
* { box-sizing: border-box; }
body { font-family: "DejaVu Sans", sans-serif; color: #14202b; font-size: 9.2pt; line-height: 1.35; margin: 0; }
h1, h2, h3, .ch, .big { font-family: "DejaVu Serif", Georgia, serif; }
section { page-break-after: always; }
section:last-child { page-break-after: auto; }
.cover { height: 210mm; width: 148mm; background: #0b1f33; color: #f3f0e6; text-align: center; padding: 18mm 12mm; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.cover img { width: 86mm; height: 86mm; }
.cover .kicker { color: #e07a2f; letter-spacing: .25em; text-transform: uppercase; font-size: 8pt; margin: 8mm 0 2mm; }
.cover h1 { font-size: 30pt; margin: 0; }
.cover .sub { font-size: 11pt; margin: 4mm 0 0; color: #c9d3dd; }
.cover .area { font-size: 9pt; color: #c9d3dd; margin: 3mm 0 0; }
.cover .foot { margin-top: auto; font-family: "DejaVu Serif"; letter-spacing: .15em; font-size: 8pt; color: #c9d3dd; }
h2 { font-size: 15pt; color: #0b1f33; margin: 0 0 3mm; border-bottom: 2px solid #0b1f33; padding-bottom: 1.5mm; }
h2 .num { display: inline-block; background: #0b1f33; color: #f3f0e6; border-radius: 50%; width: 7mm; height: 7mm; line-height: 7mm; text-align: center; font-size: 10pt; margin-right: 2mm; vertical-align: middle; }
h3 { font-size: 10.5pt; color: #0b1f33; margin: 4mm 0 1.5mm; }
.intro { color: #4a5663; margin: 0 0 3mm; font-style: italic; }
table { width: 100%; border-collapse: collapse; }
thead th { text-align: left; font-size: 7.5pt; text-transform: uppercase; letter-spacing: .08em; color: #5c3a21; border-bottom: 1px solid #c9d3dd; padding: 1mm 1.5mm; }
td { vertical-align: top; padding: 1.6mm 1.5mm; border-bottom: 1px solid #e6e9ee; }
tr { page-break-inside: avoid; }
td.ch { width: 36%; font-weight: bold; color: #0b1f33; font-size: 9.6pt; }
td.sw { width: 32%; }
td.en { width: 32%; color: #4a5663; }
.reply, .yn { font-size: 8pt; color: #4a5663; margin-top: 1mm; }
.yee, .ote { display: inline-block; font-size: 6.8pt; padding: 0 1.2mm; border-radius: 2px; color: #fff; }
.yee { background: #0b1f33; } .ote { background: #5c3a21; }
.pron { list-style: none; padding: 0; } .pron li { margin: 1.5mm 0; } .big { font-size: 14pt; color: #0b1f33; margin-right: 2mm; }
.tip { background: #f3f0e6; border-left: 3px solid #e07a2f; padding: 2mm 3mm; margin-top: 4mm; }
.grid .gcard { page-break-inside: avoid; margin-bottom: 4mm; }
.gcard p { margin: 0 0 1.5mm; color: #4a5663; }
table.g td { padding: 0.8mm 1.5mm; border: 0; } table.g td.ch { width: 55%; font-size: 9pt; }
.conv .line { page-break-inside: avoid; padding: 2mm 2.5mm; margin-bottom: 1.5mm; border-radius: 2mm; }
.conv .line:nth-child(odd) { background: #f3f0e6; } .conv .line:nth-child(even) { background: #eef2f6; }
.conv p { margin: 0; } .conv .ch { font-weight: bold; color: #0b1f33; } .conv .sw { font-size: 8.5pt; } .conv .en { font-size: 8pt; color: #4a5663; }
.text .ch { font-size: 11pt; margin: 1.5mm 0; }
.back { text-align: center; padding-top: 10mm; } .back img { width: 50mm; } .back .small { font-size: 7.5pt; color: #4a5663; } .back .foot { font-family: "DejaVu Serif"; letter-spacing: .15em; font-size: 8pt; margin-top: 10mm; }
'''
doc = f'<!doctype html><html lang="sw"><head><meta charset="utf-8"><title>Jifunze Kivunjo</title><style>{css}</style></head><body>{"".join(parts)}</body></html>'
open('/tmp/kivunjo.html', 'w').write(doc)
print('html ok', len(doc))
