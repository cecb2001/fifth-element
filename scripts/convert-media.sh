#!/bin/bash
# Convert legacy media (SWF + DAT) to MP4
# Requires: ffmpeg (install with: brew install ffmpeg)
# Optional: ruffle (for complex SWFs: https://ruffle.rs/)

set -e
cd "$(dirname "$0")/.."

mkdir -p public/video

echo "=== Converting DAT files (VCD/MPEG-1) to MP4 ==="

# These are Windows Media / VCD format videos
if [ -f "Source/AVI/sakufinal.DAT" ]; then
  echo "Converting sakufinal.DAT -> masala.mp4"
  ffmpeg -y -i "Source/AVI/sakufinal.DAT" -c:v libx264 -c:a aac -crf 23 \
    -movflags +faststart public/video/masala.mp4
else
  echo "SKIP: Source/AVI/sakufinal.DAT not found"
fi

if [ -f "Source/AVI/sarang.DAT" ]; then
  echo "Converting sarang.DAT -> dance.mp4"
  ffmpeg -y -i "Source/AVI/sarang.DAT" -c:v libx264 -c:a aac -crf 23 \
    -movflags +faststart public/video/dance.mp4
else
  echo "SKIP: Source/AVI/sarang.DAT not found"
fi

echo ""
echo "=== Converting SWF files to MP4 ==="
echo "NOTE: SWF conversion requires ffmpeg SWF demuxer support."
echo "If ffmpeg fails, use Ruffle (https://ruffle.rs/) to screen-record each SWF."
echo ""

# SWF + MP3 pairs: tour slideshows and fun stuff
declare -A SWF_MAP=(
  ["S31"]="s31"
  ["S32"]="s32"
  ["S33"]="s33"
  ["S51"]="s51"
  ["s52"]="s52"
  ["S53"]="s53"
  ["S54"]="s54"
  ["S71"]="s71"
  ["S72"]="s72"
  ["S73"]="s73"
  ["fun1"]="fun1"
  ["fun2"]="fun2"
  ["fun3"]="fun3"
)

for swf_base in "${!SWF_MAP[@]}"; do
  out_name="${SWF_MAP[$swf_base]}"
  swf_file="Source/AVI/${swf_base}.swf"
  mp3_file="Source/AVI/${out_name}.mp3"
  out_file="public/video/${out_name}.mp4"

  if [ ! -f "$swf_file" ]; then
    echo "SKIP: $swf_file not found"
    continue
  fi

  echo "Converting $swf_file -> $out_file"

  # Try direct ffmpeg conversion first
  if ffmpeg -y -i "$swf_file" -c:v libx264 -pix_fmt yuv420p -crf 23 \
    -movflags +faststart "$out_file" 2>/dev/null; then

    # If we have a paired MP3, mux it in
    if [ -f "$mp3_file" ]; then
      echo "  Muxing audio from $mp3_file"
      mv "$out_file" "${out_file}.tmp"
      ffmpeg -y -i "${out_file}.tmp" -i "$mp3_file" \
        -c:v copy -c:a aac -shortest -movflags +faststart "$out_file" 2>/dev/null
      rm -f "${out_file}.tmp"
    fi
  else
    echo "  FAILED: ffmpeg cannot decode $swf_file"
    echo "  MANUAL: Open $swf_file in Ruffle and screen-capture to $out_file"

    # If we at least have the MP3, create a video from it with a static image
    if [ -f "$mp3_file" ]; then
      echo "  Creating audio-only MP4 from $mp3_file as placeholder"
      ffmpeg -y -f lavfi -i "color=c=black:s=640x480:d=1" -i "$mp3_file" \
        -c:v libx264 -tune stillimage -c:a aac -shortest \
        -movflags +faststart "$out_file" 2>/dev/null || true
    fi
  fi
done

echo ""
echo "=== Done ==="
echo "Converted files in public/video/:"
ls -lh public/video/ 2>/dev/null || echo "(empty)"
