#!/bin/bash

# Script to reproduce directory structure and apply prettier to JS files
# Usage: ./script.sh <source_directory> [destination_directory]

set -e

# Check if source directory is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 <source_directory> [destination_directory]"
    echo "Example: $0 ./src ./formatted-src"
    exit 1
fi

SOURCE_DIR="$1"
DEST_DIR="${2:-${SOURCE_DIR}_formatted}"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' does not exist"
    exit 1
fi

# Check if prettier is installed
if ! command -v prettier &> /dev/null; then
    echo "Error: prettier is not installed"
    echo "Install it with: npm install -g prettier"
    exit 1
fi

echo "Copying directory structure from '$SOURCE_DIR' to '$DEST_DIR'..."
cp -R "$SOURCE_DIR" "$DEST_DIR"

echo "Applying prettier to JavaScript files in '$DEST_DIR'..."
echo ""

# Find and format all JavaScript files in the destination directory
js_count=0

find "$DEST_DIR" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.html" -o -name "*.css" \) | while read -r file; do
    rel_path="${file#$DEST_DIR/}"
    echo "Formatting: $rel_path"
    prettier --write "$file"
    js_count=$((js_count + 1))
done

echo ""
echo "Done! Formatted JavaScript files in '$DEST_DIR'"
