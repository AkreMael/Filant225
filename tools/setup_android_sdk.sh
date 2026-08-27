#!/bin/bash
set -e

echo "=== 1. Setup Gradle Wrapper ==="
mkdir -p /opt/gradle
if [ ! -f /opt/gradle/gradle-8.11.1/bin/gradle ]; then
  echo "Downloading Gradle 8.11.1..."
  wget -q https://services.gradle.org/distributions/gradle-8.11.1-bin.zip -O /tmp/gradle.zip
  unzip -q -o /tmp/gradle.zip -d /opt/gradle/
  rm -f /tmp/gradle.zip
fi

export PATH=/opt/gradle/gradle-8.11.1/bin:$PATH
gradle -v

# Regenerate gradle wrapper jar
cd /app/applet/android
gradle wrapper --gradle-version 8.11.1

echo "=== 2. Setup Android SDK ==="
export ANDROID_HOME=/opt/android-sdk
export ANDROID_SDK_ROOT=/opt/android-sdk
mkdir -p $ANDROID_HOME/cmdline-tools

if [ ! -d "$ANDROID_HOME/cmdline-tools/latest" ]; then
  echo "Downloading Android Commandline Tools..."
  wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdline-tools.zip
  unzip -q -o /tmp/cmdline-tools.zip -d /tmp/cmdline-tools
  mv /tmp/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest
  rm -f /tmp/cmdline-tools.zip
fi

export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH

echo "Accepting Android SDK licenses and installing packages..."
yes | sdkmanager --licenses || true
sdkmanager --install "platforms;android-34" "platforms;android-35" "build-tools;34.0.0" "build-tools;35.0.0" "platform-tools"

echo "=== 3. Android SDK Setup Complete ==="
