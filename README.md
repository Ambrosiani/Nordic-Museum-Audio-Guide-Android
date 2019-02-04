# Nordic Museum Audio Guide Android

This is an Android version of the [Nordic Museum Audio Guide](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide). Features are not completely aligned.





# Audio Guide
Android minimum SDK version 16  
react-native: 0.55.4

The app contains some old versions of dependencies that might not work with all computer operating systems (mac). To make the app compatible try updating dependencies (especially realm) or try changing realm for AsyncStorage.

### Building and Running
#### Getting started with React Native:
1. Install all React Native dependencies  
[React Native getting started guide](https://facebook.github.io/react-native/docs/getting-started.html)
2. Choose 'Building Project with Native Code'.
3. Choose Development OS and Target OS.

#### Running the app: 
1. Download or clone the git project.
2. Open project in a terminal.
3. Install project dependencies  
  ```
  npm i
  ```  
4. Download [Android Studio](https://developer.android.com/studio/).
5. Open android folder in Android Studio.
6. Create and open an android simulator.
7. Build project.
8. Switch to the UpdatedPackages branch
9. Run the following in a terminal
  ```
  react-native run-android
  ```

### Generate APK
#### Generate APK for a new app (not an update):   
[React Native Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html)

#### If the APK is an update for Google Play:
Do this before generating the APK. 
1. Open android/app/build.gradle in a text editor.
2. Find
  ```
  android {
    ...
    defaultConfig {
       ...
        versionCode 2
        versionName "2.0"
        ...
    }
    ...
  }
  ```
3. Change versionCode and versionName.

#### Generate APK:
1. Open project in a terminal.
2. Run the following
  ```
  cd android
  ./gradlew assembleRelease
  ```
3. The generated APK can be found under android/app/build/outputs/apk/release/app-release.apk and is ready to be distributed. 

### Publish a new version of the app on Google Play
1. Generate an APK of the new version.
2. Log in to [Google Play Console](https://play.google.com/apps/publish/?hl=sv).
3. Click on the app that should be updated.
4. Next, click on 'Release Management', then 'App Releases'.
5. To upload a new .APK file, click on 'Manage Production', then 'Create Release'.
6. Drag and drop the new .APK file into the 'APKs to add' section. 
7. Under "What's new in the release?" write what has been updated.
8. Click 'Save', then 'Review' to proceed.
9. Finally, review the release information on the next screen. Then scroll down to the bottom and click 'Start Rollout to Production'.
