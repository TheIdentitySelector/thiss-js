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

# Copy entry points to /new/ path for upgrade testing
# This is called during PRE_RELEASE=true (step 1 deployment)
copy_entry_points_to_new() {
    local version="$1"
    local src_dir="$SRC_DIR/$version"

    # List of entry point directories to copy
    local entry_points=("cta" "ps" "ds" "result" "upgrade-test")

    for entry in "${entry_points[@]}"; do
        local src_entry="$src_dir/$entry/index.html"
        if [ -f "$src_entry" ]; then
            local dst_entry="$DST_DIR/new/$entry/index.html"
            mkdir -p "$(dirname "$dst_entry")"
            process_file "$src_entry" "$dst_entry"
            echo "  Copied entry point to /new/$entry/"
        fi
    done

    # Also copy the main index.html
    local src_index="$src_dir/index.html"
    if [ -f "$src_index" ]; then
        local dst_index="$DST_DIR/new/index.html"
        mkdir -p "$(dirname "$dst_index")"
        process_file "$src_index" "$dst_index"
        echo "  Copied entry point to /new/"
    fi

    # Copy thiss.js to /new/thiss.js for testing with new CTA
    # We need to modify COMPONENT_URL to point to /new/cta/ instead of /cta/
    local src_thiss="$src_dir/thiss.js"
    if [ -f "$src_thiss" ]; then
        local dst_thiss="$DST_DIR/new/thiss.js"
        mkdir -p "$(dirname "$dst_thiss")"
        # Process with modified COMPONENT_URL that points to /new/cta/
        local NEW_COMPONENT_URL="${BASE_URL}new/cta/"
        echo "  Processing $src_thiss -> $dst_thiss (with COMPONENT_URL=$NEW_COMPONENT_URL)"
        COMPONENT_URL="$NEW_COMPONENT_URL" envsubst '$MDQ_URL,$PERSISTENCE_URL,$SEARCH_URL,$STORAGE_DOMAIN,$LOGLEVEL,$COMPONENT_URL,$WHITELIST,$DEFAULT_CONTEXT,$BASE_URL,$MIN_SEARCH_LENGTH,$SAA_COMPLIANT_BROWSERS' < "$src_thiss" > "$dst_thiss"
        echo "  Copied thiss.js to /new/thiss.js"
    fi
}


if [[ "$PRE_RELEASE" == 'true' ]]; then
    # Step 1 deployment: VERSION assets + PREV_VERSION entry points
    # Also deploy VERSION entry points under /new/ for upgrade testing
    process_version "$VERSION"
    copy_entry_points_to_new "$VERSION"
    process_version "$PREV_VERSION"
    cp "$SRC_DIR/$VERSION/manifest.json" "$DST_DIR"
else
    # Step 2 deployment: Both versions assets + VERSION entry points
    process_version "$PREV_VERSION"
    process_version "$VERSION"
fi

echo "Sources copy completed successfully!"
