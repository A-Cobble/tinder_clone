// import { View, Text } from 'react-native'
// import React, { createContext, useContext } from 'react'
// import * as Google from "expo-auth-session/providers/google"

// const AuthContext = createContext({});

// const config = {
//   androidClientId: "347959046486-c0vbabnvmd0fvqd0ctkuu6p1moeeiaup.apps.googleusercontent.com",
//   iosClientId: '347959046486-n5oteg6ig9eea9esfi1ugou0lg4pn6pl.apps.googleusercontent.com',
//   // androidClientId: process.env.ANDROID_CLIENT_ID,
//   // iosClientId: process.env.IOS_CLIENT_ID,
//   // scopes: ["profile", "email"],
//   // permissions: ["public_profile", "email", "gender", "location"],
// }

// export const AuthProvider = ({ children }) => {

//   const signInWithGoogle = () => {
//     Google.useAuthRequest(config).then((logInResult) => {
//       if(logInResult?.type === "success"){
//         //login...
//       }
//     });
//   }
// //consumer
//   return (
//     <AuthContext.Provider 
//       value={{
//         user: null,
//         signInWithGoogle
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default function useAuth() {
//   return useContext(AuthContext)
// }

import { View, Text } from 'react-native'
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Google from "expo-auth-session/providers/google";
import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import { auth } from "../firebase"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId: EXPO_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      // scopes: ["profile", "email"],
      // permissions: ["public_profile", "email", "gender", "location"],
    }
  )

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }else {
        //Not logged in...
        setUser(null);
      }
      setLoadingInitial(false)
    })
  },[])

  useEffect(() => {
    if(response?.type === "success"){
      //login...
      console.log(response);
      const credential = GoogleAuthProvider.credential(response.authentication.idToken, response.authentication.accessToken)
      signInWithCredential(auth, credential)
      // fetch("https://www.googleapis.com/userinfo/v2/me", {
      //   headers: { Authorization: `Bearer ${response.authentication.accessToken}` }
      // })
      // .then(res => res.json())
      // .then(data => {
      //   // console.log(data)
      //   setUserInfo(data)
      // })
    }
    setLoading(false)
  },[response])

  const signInWithGoogle = async () => {
    setLoading(true);
    promptAsync();
  };

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }

  return (
    <AuthContext.Provider 
      value={{
        // user: userInfo? userInfo : null,
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
      }}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}