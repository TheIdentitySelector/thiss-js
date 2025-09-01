#!/bin/bash

# Script to replicate directory structure and process files with envsubst
# Usage: ./script.sh src_dir dst_dir

set -euo pipefail

# Check if correct number of arguments provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <src_dir> <dst_dir>"
    echo "Example: $0 /path/to/source /path/to/destination"
    exit 1
fi

SRC_DIR="$1"
DST_DIR="$2"

# Validate source directory exists
if [ ! -d "$SRC_DIR" ]; then
    echo "Error: Source directory '$SRC_DIR' does not exist"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DST_DIR"

echo "Replicating directory structure from '$SRC_DIR' to '$DST_DIR'"

# Function to process a single file
process_file() {
    local src_file="$1"
    local dst_file="$2"

    # Check file extension and process accordingly
    case "$src_file" in
        *.js|*.html|*.css)
            echo "  Processing $src_file -> $dst_file"
            envsubst '$MDQ_URL,$PERSISTENCE_URL,$SEARCH_URL,$STORAGE_DOMAIN,$LOGLEVEL,$COMPONENT_URL,$WHITELIST,$DEFAULT_CONTEXT,$BASE_URL,$MIN_SEARCH_LENGTH,$SAA_COMPLIANT_BROWSERS' < "$src_file" > "$dst_file"
            ;;
        *)
            echo "  Copying $src_file -> $dst_file"
            cp "$src_file" "$dst_file"
            ;;
    esac
}

process_version() {
    local version="$1"
    local src_dir="$SRC_DIR/$version"

    find "$src_dir" -type f | while read -r src_file; do
        # Calculate relative path from SRC_DIR directory
        rel_path="${src_file#$src_dir/}"

        dst_file="$DST_DIR/$rel_path"

        # Create destination directory if needed
        dst_file_dir=$(dirname "$dst_file")
        mkdir -p "$dst_file_dir"

        # Process the file
        process_file "$src_file" "$dst_file"
    done
}


if [[ "$PRE_RELEASE" == 'true' ]]; then
    process_version "$VERSION"
    process_version "$OLD_VERSION"
else
    process_version "$OLD_VERSION"
    process_version "$VERSION"
fi

echo "Sources copy completed successfully!"
