"""Refresh gallery data from the screen manifest without replacing the gallery UI."""
from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
items = []
for group, title, folder, state, query in json.loads((root / 'catalog-manifest.json').read_text()):
    image = f'{folder}/previews/{state}.png'
    if not (root / image).is_file():
        raise FileNotFoundError(image)
    items.append(dict(group=group, title=title, img=image, url=f'{folder}/index.html?{query}'))
items.append(dict(group='재화 에셋', title='골드 · 마법안료 — 확정 형태', img='currency-v1/preview.png', url='currency-v1/index.html'))
(root / 'catalog-data.js').write_text('const catalogItems=' + json.dumps(items, ensure_ascii=False) + ';')
print(f'{len(items)} gallery entries updated')
