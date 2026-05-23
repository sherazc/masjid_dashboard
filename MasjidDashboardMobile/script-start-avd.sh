#!/bin/bash

# set ANDROID_HOME in bash startup .bash_profile
# export ANDROID_HOME=/Users/sheraz/Library/Android/sdk
# $ANDROID_HOME/emulator/emulator -list-avds


# I was unable to visually resize avd with skin. To fix it
# Android Studio -> Device Manager -> click 3 dots next to device
# -> Additional settings tab -> Device skin -> [None]

# $ANDROID_HOME/emulator/emulator -avd Pixel_10_Pro_XL_android_17
# $ANDROID_HOME/emulator/emulator -avd avd_17_37
$ANDROID_HOME/emulator/emulator -avd pixel_10_17_37
