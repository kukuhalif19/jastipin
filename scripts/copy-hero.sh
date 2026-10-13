#!/bin/bash
SRC="C:/Users/kukuh/AppData/Local/hermes/cache/scratch/catalog/img"
DST="D:/Project/jastip/jastipin/public/toko"
mkdir -p "$DST"

cp "$SRC/bolen_menu.png"   "$DST/toko-1-bolen-tjihapit.png"
cp "$SRC/mochi_1.jpg"      "$DST/toko-2-mochi-aifa.jpg"
cp "$SRC/tira_2.jpg"       "$DST/toko-3-tiramisusu.jpg"
cp "$SRC/makmur_1.webp"    "$DST/toko-4-makmur-jaya.webp"
cp "$SRC/tuku_bottle.jpg"  "$DST/toko-5-kopi-tuku.jpg"
cp "$SRC/cheese_bogel.png" "$DST/toko-6-cheesecuit.png"
cp "$SRC/rochi_menu.webp"  "$DST/toko-7-rochi.webp"
cp "$SRC/tj_cand_0.jpg"    "$DST/toko-8-tj-candu.jpg"

echo "DONE - copied hero images:"
ls -lh "$DST/"
