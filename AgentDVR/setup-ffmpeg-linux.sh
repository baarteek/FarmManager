#!/bin/bash

# Check if a folder name is provided as an input parameter
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <folder-name>"
  exit 1
fi

FN=$1

SCRIPT_DIR="$(dirname "$0")"
# Change to the script directory
cd "$SCRIPT_DIR"

# Extract ffmpeg.tar.xz to the specified folder
tar -xvf ffmpeg.tar.xz --strip-components=1 -C "${FN}"

echo "ffmpeg has been installed to ${FN}."
