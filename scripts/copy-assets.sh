#!/bin/bash
# Asset normalization script
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/Source"
PUBLIC="$ROOT/public"

tolower() {
  echo "$1" | tr '[:upper:]' '[:lower:]'
}

echo "=== Passport photos ==="
count=0
for src in "$SOURCE/pass_photo/"*.jpg "$SOURCE/pass_photo/"*.JPG; do
  [ -f "$src" ] || continue
  fname=$(basename "$src")
  [ "$fname" = "Thumbs.db" ] && continue
  dest=$(tolower "$fname" | sed 's/ copy//g' | sed 's/1copy//g' | sed 's/ /-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-\./\./')
  cp "$src" "$PUBLIC/photos/passport/$dest"
  count=$((count + 1))
done
echo "  Copied $count files"

echo "=== Portrait photos ==="
count=0
for fname in ajile.jpg amritha.jpg amy.jpg anaz.jpg aneesh.jpg anu.jpg arunk.jpg arunv.jpg betty.jpg bijith.jpg divya.jpg jerry.jpg jithu.jpg jojo.jpg kiran.jpg manu.jpg merley.jpg mithun.jpg neda.jpg neetha.jpg nishanth.jpg priyaK.jpg priyat.jpg ratheesh.jpg rengitha.jpg reshma.jpg robin.jpg roji.jpg sabeena.jpg saira.jpg saji.jpg shalini.jpg shilpa.jpg silvya.jpg smitha.jpg surajith.jpg susy.jpg vibi.jpg vinod.jpg; do
  src="$SOURCE/Images/$fname"
  if [ -f "$src" ]; then
    dest=$(tolower "$fname")
    cp "$src" "$PUBLIC/photos/portraits/$dest"
    count=$((count + 1))
  else
    echo "  WARNING: $fname not found"
  fi
done
echo "  Copied $count files"

echo "=== Gallery photos ==="
for section in S3 S5 S7 Misc; do
  lower=$(tolower "$section")
  count=0
  for src in "$SOURCE/Images/$section/"*; do
    [ -f "$src" ] || continue
    fname=$(basename "$src")
    case "$fname" in
      TN_*|Thumbs.db|*.htm|*.HTM) continue ;;
    esac
    case "$fname" in
      *.jpg|*.JPG|*.jpeg|*.JPEG) ;;
      *) continue ;;
    esac
    dest=$(tolower "$fname")
    cp "$src" "$PUBLIC/photos/$lower/$dest"
    count=$((count + 1))
  done
  echo "  $section: $count files"
done

echo "=== Makers photos ==="
count=0
for src in "$SOURCE/Images/Makers/"*; do
  [ -f "$src" ] || continue
  fname=$(basename "$src")
  [ "$fname" = "Thumbs.db" ] && continue
  dest=$(tolower "$fname")
  cp "$src" "$PUBLIC/photos/makers/$dest"
  count=$((count + 1))
done
echo "  Copied $count files"

echo "=== UI images ==="
count=0
for fname in main.jpg class.jpg click.jpg mainbg.jpg enter1.jpg enter2.jpg gallery.jpg fun.jpg masala.jpg poetry.jpg Blazers.jpg Bandits.jpg beyondthelimits.jpg compus.gif spiral.gif; do
  src="$SOURCE/Images/$fname"
  if [ -f "$src" ]; then
    dest=$(tolower "$fname")
    cp "$src" "$PUBLIC/photos/ui/$dest"
    count=$((count + 1))
  fi
done
# Special: "the class.jpg" -> "the-class.jpg"
if [ -f "$SOURCE/Images/the class.jpg" ]; then
  cp "$SOURCE/Images/the class.jpg" "$PUBLIC/photos/ui/the-class.jpg"
  count=$((count + 1))
fi
echo "  Copied $count files"

echo "=== Audio files ==="
count=0
for src in "$SOURCE/AVI/"*.mp3 "$SOURCE/AVI/"*.MP3 "$SOURCE/AVI/"*.wav "$SOURCE/AVI/"*.WAV; do
  [ -f "$src" ] || continue
  fname=$(basename "$src")
  dest=$(tolower "$fname" | sed 's/ /-/g')
  cp "$src" "$PUBLIC/audio/$dest"
  count=$((count + 1))
done
echo "  Copied $count files"

echo ""
echo "Done!"
