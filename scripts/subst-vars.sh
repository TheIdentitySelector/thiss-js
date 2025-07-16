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

ORIG_BASE_URL="$BASE_URL"

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
    local api_version="$3"

    # Set api_version-specific variables
    if [[ "$api_version" == 'v1' ]]; then
      export BASE_URL="${ORIG_BASE_URL}"
    else
      export BASE_URL="${ORIG_BASE_URL}${api_version}/"
    fi

    export PERSISTENCE_URL="${BASE_URL}ps/"
    export COMPONENT_URL="${BASE_URL}cta/"

    # Check file extension and process accordingly
    case "$src_file" in
        *.js|*.html|*.css)
            echo "  Processing $src_file -> $dst_file (api_version: $api_version)"
            envsubst '$MDQ_URL,$PERSISTENCE_URL,$SEARCH_URL,$STORAGE_DOMAIN,$LOGLEVEL,$COMPONENT_URL,$WHITELIST,$DEFAULT_CONTEXT,$BASE_URL,$MIN_SEARCH_LENGTH,$SAA_COMPLIANT_BROWSERS' < "$src_file" > "$dst_file"
            ;;
        *)
            echo "  Copying $src_file -> $dst_file"
            cp "$src_file" "$dst_file"
            ;;
    esac
}

# Find all api_version directories (v0, v1, v2, etc.)
find "$SRC_DIR" -maxdepth 1 -type d -name "v*" | sort -V | while read -r api_version_dir; do
    api_version=$(basename "$api_version_dir")

    # Skip if not matching api_version pattern
    if [[ ! "$api_version" =~ ^v[0-9]+$ ]]; then
        continue
    fi

    echo "Processing api_version directory: $api_version"

    find "$api_version_dir" -maxdepth 1 -type d | sort -V | while read -r version_dir; do

        # Create corresponding directory in destination
        dst_version_dir="$DST_DIR/$api_version"
        mkdir -p "$dst_version_dir"

        # Process all files and subdirectories recursively
        find "$version_dir" -type f | while read -r src_file; do
            # Calculate relative path from api_version directory
            rel_path="${src_file#$version_dir/}"

            if [[ "$api_version" == 'v1' ]]; then
                dst_file="$DST_DIR/$rel_path"
            else
                dst_file="$dst_version_dir/$rel_path"
            fi

            # Create destination directory if needed
            dst_file_dir=$(dirname "$dst_file")
            mkdir -p "$dst_file_dir"

            # Process the file
            process_file "$src_file" "$dst_file" "$api_version"
        done
    done
done

if [[ "$API_VERSION" == "$PREV_API_VERSION" && "$PRE_RELEASE" == 'true' ]]; then
    find "$SRC_DIR/v$API_VERSION/$OLD_VERSION" -type f | while read -r src_file; do
        # Calculate relative path from api_version directory
        rel_path="${src_file#$api_version_dir/}"
        dst_file="$DST_DIR/v$API_VERSION/$rel_path"

        # Create destination directory if needed
        dst_file_dir=$(dirname "$dst_file")
        mkdir -p "$dst_file_dir"

        # Process the file
        process_file "$src_file" "$dst_file" "v$API_VERSION"
    done
fi

echo "Directory structure replication completed successfully!"
