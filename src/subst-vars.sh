#!/usr/bin/env bash
set -e

# Input directory
SRC_DIR="$1"

# Output directory
OUT_DIR="$2"

# Clean or create output directory
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# Find all files
find "$SRC_DIR" -type f | while read -r src_file; do
  # Compute relative path
  rel_path="${src_file#$SRC_DIR/}"
  
  # Compute output file path
  out_file="$OUT_DIR/$rel_path"
  
  # Create output directory
  mkdir -p "$(dirname "$out_file")"
  
  # Check file extension
  if [[ "$src_file" == *.js || "$src_file" == *.css || "$src_file" == *.html ]]; then
    # Process with envsubst
    envsubst '$MDQ_URL,$PERSISTENCE_URL,$COMPONENT_URL,$WHITELIST,$DEFAULT_CONTEXT,$BASE_URL' < "$src_file" > "$out_file"
    echo "Processed with envsubst: $rel_path"
  else
    # Copy as-is
    cp "$src_file" "$out_file"
    echo "Copied: $rel_path"
  fi
done
