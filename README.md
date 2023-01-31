# Tinder_Clone

Tinder_Clone is an Expo React Native project based off the popular dating app. Features include Google authentication, styling using Tailwind CSS, swipeable cards, react navigation to allow for multiple pages, a matching algorithm, and upon successful matching between two users, one to one real time messaging which is powered by Firebase's Firestore database.
 

 ### Technologies
- React Native - [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- Expo - [https://docs.expo.dev/](https://docs.expo.dev/)
- Tailwind CSS - [https://github.com/jaredh159/tailwind-react-native-classnames](https://github.com/jaredh159/tailwind-react-native-classnames)
- React Navigation - [https://reactnavigation.org/docs/getting-started](https://reactnavigation.org/docs/getting-started)
- Firebase version 9 with Firebase Firestore - [https://firebase.google.com/docs](https://firebase.google.com/docs)

<br />

## Getting Started
`This project is not designed for production use. Some refactoring will be required if used for production.`
<br />
<br />

First, install and log into the Expo CLI:

```bash
npx expo register

# or

npx expo login
```
Then, install and log into the Firebase CLI:
```
curl -sL https://firebase.tools | bash
```
```
firebase login
```

Next, install the dependencies:
```bash
npm install
# or
yarn install
```

<br>
<br>

## Environmental Variables and Sensored Information

Some inormation will be unique to the user for this project and is not to be shared publicly such as Android Client IDs, IOS Client IDs, Expo Client IDs, as well as the google-services.json file, and the GoogleService-Info.plist file.

<br />

Create the `.env` file in root directory of your project.

<br />

I have included a template (`.env.template`) to help you get started.

<br />

To allow the Google Authentication to work the  `google-services.json` and `GoogleService-Info.plist` files are requried to be added to the root directory. These can be obtained from Google Cloud -> Credentials once authentication has been set up. Learn more about authentication with expo-auth-session here: https://docs.expo.dev/versions/latest/sdk/auth-session/ 

<br>

## Acknowledgments

This project was inspired by Sonny Sangha's Tinder clone. If you have any questions check out his YouTube video here: https://www.youtube.com/watch?v=AkEnidfZnCU.

(The google authentication used in the YouTube video has since been depricated. I used expo-auth-session instead.)