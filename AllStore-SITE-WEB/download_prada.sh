#!/bin/bash
# Download first image (HD) from each of the first 12 P21122 albums
# These are the thumbnail URLs converted to big format

DEST="/c/Users/Mohamed-Hedi/Desktop/TRAVAIL/AllStore/AllStore SITE WEB"

# Album thumbnails from the page - converting small to big for HD
# Index 0: Black
curl -sL "https://photo.yupoo.com/zws767978887/c90c1b38/big.jpeg" -o "$DEST/prada_cup_noir.jpg" &
# Index 1: Red/white  
curl -sL "https://photo.yupoo.com/zws767978887/67370f22/big.jpeg" -o "$DEST/prada_cup_rouge.jpg" &
# Index 2: Green/white
curl -sL "https://photo.yupoo.com/zws767978887/0504174e/big.jpeg" -o "$DEST/prada_cup_vert.jpg" &
# Index 3: Green darker
curl -sL "https://photo.yupoo.com/zws767978887/43051dd3/big.jpeg" -o "$DEST/prada_cup_vert2.jpg" &
# Index 4: Yellow
curl -sL "https://photo.yupoo.com/zws767978887/37f53bca/big.jpeg" -o "$DEST/prada_cup_jaune.jpg" &
# Index 5: Orange
curl -sL "https://photo.yupoo.com/zws767978887/e3f463bf/big.jpeg" -o "$DEST/prada_cup_orange.jpg" &
# Index 6: Pink
curl -sL "https://photo.yupoo.com/zws767978887/0c405740/big.jpeg" -o "$DEST/prada_cup_rose.jpg" &
# Index 7: Blue royal
curl -sL "https://photo.yupoo.com/zws767978887/8a4b61f8/big.jpeg" -o "$DEST/prada_cup_bleu.jpg" &
# Index 8: Light blue
curl -sL "https://photo.yupoo.com/zws767978887/c0eba390/big.jpeg" -o "$DEST/prada_cup_bleu_ciel.jpg" &
# Index 9: Grey
curl -sL "https://photo.yupoo.com/zws767978887/94d3920a/big.jpeg" -o "$DEST/prada_cup_gris.jpg" &
# Index 10: White
curl -sL "https://photo.yupoo.com/zws767978887/1ce78e31/big.jpeg" -o "$DEST/prada_cup_blanc.jpg" &
# Index 11: Navy/white (classic like user's photo)
curl -sL "https://photo.yupoo.com/zws767978887/c9b60f71/big.jpeg" -o "$DEST/prada_cup_marine.jpg" &

wait
echo "Done downloading 12 colorways"
ls -la "$DEST"/prada_cup_*.jpg 2>/dev/null | wc -l
