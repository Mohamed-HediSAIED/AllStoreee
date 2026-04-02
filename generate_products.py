import json, os

products = {}
def add(pid, brand, name, color, cat, price, img):
    products[pid] = {'brand':brand,'name':name,'color':color,'cat':cat,'price':price,'img':img}

# PRADA CUP - 34 colorways
for cid,cn in [('noir','Noir'),('noir_blanc','Noir/Blanc'),('bleu_marine','Bleu Marine'),('bleu_royal','Bleu Royal'),('bleu_cobalt','Bleu Cobalt'),('bleu_clair','Bleu Clair'),('bleu_ciel','Bleu Ciel'),('vert_menthe','Vert Menthe'),('vert_emeraude','Vert Emeraude'),('gris','Gris'),('blanc','Blanc'),('blanc_pur','Blanc Pur'),('rouge','Rouge'),('rouge_blanc','Rouge/Blanc'),('rouge_noir','Rouge/Noir'),('vert_fluo','Vert Fluo'),('vert_foret','Vert Foret'),('jaune','Jaune'),('orange','Orange'),('rose','Rose'),('rose_vif','Rose Vif'),('violet_blanc','Violet/Blanc'),('violet_noir','Violet/Noir'),('lavande','Lavande'),('argent_rouge','Argent/Rouge'),('noir_rouge','Noir/Rouge'),('marine_rouge','Marine/Rouge'),('noir_argent','Noir/Argent'),('bleu_blanc','Bleu/Blanc'),('bordeaux','Bordeaux'),('navy','Navy'),('olive','Olive'),('grey','Grey'),('black','Black')]:
    add(f'prada-cup-{cid}','Prada',"America's Cup",cn,'chaussures','105',f'prada_cup_{cid}_1.jpg')

# ALO YOGA - 16 colorways
for cid,cn in [('black','Black'),('brown','Brown'),('charcoal','Charcoal'),('dustypink','Dusty Pink'),('espresso','Espresso'),('gravel','Gravel'),('green','Green'),('grey','Grey'),('ivory','Ivory'),('navy','Navy'),('nude','Nude'),('oatmeal','Oatmeal'),('pink','Pink'),('purple','Purple'),('steel','Steel'),('white','White')]:
    add(f'alo-{cid}','Alo Yoga','Accolade Crew Neck',cn,'vetements','75',f'alo_{cid}.jpg')

# GERARD DAREL - 6 colorways
for cid,cn in [('noir','Noir'),('bordeaux','Bordeaux'),('kaki','Kaki'),('marine','Bleu Marine'),('anthracite','Anthracite'),('bronze','Bronze')]:
    add(f'gd24h-{cid}','Gerard Darel','Sac 24H',cn,'sacs','0',f'gd24h_{cid}.webp')

# BURBERRY - 3 colorways
for cid,cn in [('gris','Gris'),('noir','Noir'),('marine','Marine')]:
    add(f'burberry-{cid}','Burberry','Letter Graphic Zip Hoodie',cn,'vetements','65',f'burberry_hoodie_{cid}.jpg')

# ISABEL MARANT - 5 colorways
for cid,cn in [('noir','Noir'),('ecru','Ecru'),('taupe','Taupe'),('leopard','Leopard'),('chalk','Chalk')]:
    add(f'im-beckett-{cid}','Isabel Marant','Beckett',cn,'chaussures','125',f'im_beckett_{cid}.jpg')

# BAPE - 6 colorways
for cid,cn in [('noir_vert','Noir/Vert'),('blanc_vert','Blanc/Vert'),('noir_rose','Noir/Rose'),('blanc_rose','Blanc/Rose'),('noir_bleu','Noir/Bleu'),('blanc_bleu','Blanc/Bleu')]:
    add(f'bape-{cid}','A Bathing Ape','Camo Big Ape Head Tee',cn,'vetements','43',f'bape_{cid}.jpg')

# PRADA SLINGBACK - 4 colorways
for cid,cn in [('noir','Noir'),('blanc','Blanc'),('rouge','Rouge'),('rose','Rose')]:
    add(f'prada-sling-{cid}','Prada','Escarpins Slingback',cn,'chaussures','0',f'prada_sling_{cid}.jpg')

# STONE ISLAND - 2 colorways
for cid,cn in [('noir','Noir'),('blanc','Blanc')]:
    add(f'si-pull-{cid}','Stone Island','Crewneck Sweatshirt',cn,'vetements','65',f'si_pull_{cid}.jpg')

# LORO PIANA CASQUETTE - 18 colorways
for cid,cn in [('noir','Noir'),('blanc','Blanc'),('creme','Creme'),('sable','Sable'),('beige','Beige'),('camel','Camel'),('cognac','Cognac'),('taupe','Taupe'),('marron','Marron'),('brun','Brun'),('brique','Brique'),('bordeaux','Bordeaux'),('olive','Olive'),('vert_foret','Vert Foret'),('bleu_marine','Bleu Marine'),('bleu_gris','Bleu Gris'),('bleu_ciel','Bleu Ciel'),('anthracite','Anthracite')]:
    add(f'lp-casquette-{cid}','Loro Piana','Casquette Baseball',cn,'accessoires','45',f'lp_casquette_{cid}.jpg')

# AIRPODS MAX - 5 colorways
for cid,cn in [('noir','Noir'),('starlight','Starlight'),('bleu_ciel','Bleu Ciel'),('rose','Rose'),('violet','Violet')]:
    add(f'airpods-max-{cid}','Apple','AirPods Max',cn,'tech','185',f'airpods_max_{cid}.jpg')

# MIHARA HANK - 8 colorways
for cid,cn in [('noir','Noir'),('blanc','Blanc'),('bleu','Bleu'),('rouge','Rouge'),('menthe','Menthe'),('rose','Rose'),('vert','Vert'),('violet','Violet')]:
    add(f'mihara-{cid}','Maison Mihara Yasuhiro','Hank OG Sole',cn,'chaussures','0',f'mihara_hank_{cid}.jpg')

# BALENCIAGA RUNNER - 12 colorways
for cid,cn,ext in [('noir_argent','Noir/Argent','jpg'),('noir_blanc','Noir/Blanc','jpg'),('gris','Gris','jpg'),('rouge','Rouge','webp'),('bleu_orange','Bleu/Orange','webp'),('bleu_gris','Bleu/Gris','webp'),('blanc','Blanc','webp'),('kaki','Kaki','webp'),('multicolore','Multicolore','jpg'),('rose_orange','Rose/Orange','jpg'),('vert_menthe','Vert Menthe','jpg'),('rainbow','Rainbow','jpg')]:
    add(f'bal-runner-{cid}','Balenciaga','Runner',cn,'chaussures','135',f'balenciaga_runner_{cid}.{ext}')

# MIU MIU CARTES - 11 colorways
for cid,cn in [('noir','Noir'),('bordeaux','Bordeaux'),('rouge','Rouge'),('rose','Rose'),('nude','Nude'),('camel','Camel'),('blanc','Blanc'),('lavande','Lavande'),('bleu_ciel','Bleu Ciel'),('sauge','Sauge'),('bleu_canard','Bleu Canard')]:
    add(f'miumiu-carte-{cid}','Miu Miu','Porte-Cartes',cn,'accessoires','36',f'miumiu_carte_{cid}.jpg')

# LUNETTES MIU MIU (single)
add('lunettes-miumiu','Miu Miu','Lunettes MU 09WS','Noir','lunettes','0','lunettes_miumiu_noir.jpg')

# BAL 3XL - 7 colorways
for img,cn in [('772774W3RMU1044_F.jpg','Gris'),('772774W3RMU1100_F.jpg','Blanc'),('772774W3RMU1340_F.jpg','Beige'),('772774W3RMU8123_F.jpg','Noir'),('772774W3RMU9010_F.jpg','Creme'),('772774W3RMU9756_F.jpg','Bleu Gris'),('772774W3RMU9934_F.jpg','Argent')]:
    cid = cn.lower().replace(' ','_')
    add(f'bal-3xl-{cid}','Balenciaga','3XL',cn,'chaussures','0',img)

print(f'Total: {len(products)} products')

# Now generate the HTML cards for boutique
cards_html = []
for pid, p in products.items():
    price_display = f'{p["price"]} €' if p['price'] != '0' else '— €'
    price_em = 'Réplique Premium' if p['price'] != '0' else 'Prix bientôt disponible'
    btn_text = 'Ajouter au panier' if p['price'] != '0' else 'Bientôt disponible'
    btn_disabled = '' if p['price'] != '0' else ' disabled style="opacity:.5;cursor:not-allowed"'
    full_name = f'{p["name"]} — {p["color"]}'

    card = f'''    <div class="b-card b-card--new" data-cat="{p['cat']}" id="prod-{pid}" style="cursor:pointer" onclick="if(!event.target.closest('.b-btn-cart,.b-btn-wl'))window.location.href='produit-detail.html?id={pid}'">
      <div class="b-img" style="background:#fff">
        <img loading="lazy" decoding="async" src="{p['img']}" alt="{p['brand']} {p['name']} {p['color']}" style="object-fit:contain" onerror="this.closest('.b-card').style.display='none'">
      </div>
      <div class="b-body">
        <span class="b-brand">{p['brand']}</span>
        <span class="b-name">{p['name']} — {p['color']}</span>
        <span class="b-price">{price_display} <em>{price_em}</em></span>
        <div class="b-actions">
          <button class="b-btn-cart" onclick="handleCart(this,'{pid}','{p["brand"]}','{full_name}','{p["img"]}','{price_display}')"{btn_disabled}>{btn_text}</button>
          <button class="b-btn-wl" onclick="handleWL(this,'{pid}','{p["brand"]}','{full_name}','{p["img"]}')">&#9825;</button>
        </div>
      </div>
    </div>'''
    cards_html.append(card)

# Save cards HTML
with open('allstore_cards.html', 'w', encoding='utf-8') as f:
    f.write('\n'.join(cards_html))

# Save products JSON for produit-detail.html
with open('allstore_products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f'Generated {len(cards_html)} cards')
print('Saved to allstore_cards.html and allstore_products.json')
