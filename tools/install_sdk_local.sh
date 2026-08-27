#!/bin/bash
set -e

SDK_DIR="/app/applet/android-sdk"
mkdir -p "$SDK_DIR/cmdline-tools"

if [ ! -d "$SDK_DIR/cmdline-tools/latest" ]; then
  echo "Downloading Android Commandline Tools..."
  curl -sL https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -o /tmp/cmdline-tools.zip
  unzip -q -o /tmp/cmdline-tools.zip -d /tmp/cmdline-tools
  mv /tmp/cmdline-tools/cmdline-tools "$SDK_DIR/cmdline-tools/latest"
  rm -f /tmp/cmdline-tools.zip
fi

export ANDROID_HOME="$SDK_DIR"
export ANDROID_SDK_ROOT="$SDK_DIR"
export PATH="$SDK_DIR/cmdline-tools/latest/bin:$SDK_DIR/platform-tools:$PATH"
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

echo "Accepting licenses..."
yes | "$SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --licenses || true

echo "Installing platforms;android-35 and build-tools;35.0.0..."
"$SDK_DIR/cmdline-tools/latest/bin/sdkmanager" --install "platforms;android-35" "build-tools;35.0.0" "platform-tools"

echo "=== Android SDK Installed in $SDK_DIR ==="
