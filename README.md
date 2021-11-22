# How to run

There are two steps you need to do before being able to run detox tests:

## Setup you Android SDK directory

Edit the file `android\local.properties` and add the statement `sdk.dir=<path to your sdk>` indicating where your Android SDK is located

## Install applesimutils

You need to install `applesimutils` to be able to run tests from the simulator, you can find the tooling [here](https://github.com/wix/AppleSimulatorUtils)

## Make sure you have the correct simulator / emulator

Ensure you have the following simulators available:

- iPhone 11

Ensure you have the following emulators available:

- Pixel 2 API 29

You can freely change this configuration in package.json to adapt to your existing setup.

## ANDROID_SDK_ROOT

Make sure to define `ANDROID_SDK_ROOT` in your env (or add it to vscode). Detox does only support absolute paths, otherwise it will complain that the path doesn't exist.

# Expanding this project

Here are a bunch of proposals for expanding this project futher:

- Create an adapter for Detox and cucumber
- The tests in Tests.feature should be implemented
- A testing CI pipeline should be implemented, consisting of:
  - Full run of the unit tests on every commit on CI
  - Full run of the e2e tests on every commit on CI on emulator(s)/simulator(s). Parallelise if necessary.
  - Nightly / on release branch run of the e2e tests using a mobile farm service (browserstack, saucelabs, bitbar, etc)
- Screenshot testing should be implemented for nightly / release branch tests, using Applitools / Percy or similar. These tools allow for the comparison of actual implementations against designs (based on different device formats)
- An allure/spoon report should be generated per run and reports pushed to slack/company messaging system on every execution. This allows the PO/PMs/etc to see the detailed execution of the flows, alongside with matching videos and screenshots.
