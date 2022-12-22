import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from "expo-auth-session/providers/google"

const AuthContext = createContext({});

const config = {
  androidClientId: "347959046486-c0vbabnvmd0fvqd0ctkuu6p1moeeiaup.apps.googleusercontent.com",
  iosClientId: '347959046486-n5oteg6ig9eea9esfi1ugou0lg4pn6pl.apps.googleusercontent.com',
  // androidClientId: process.env.ANDROID_CLIENT_ID,
  // iosClientId: process.env.IOS_CLIENT_ID,
  // scopes: ["profile", "email"],
  // permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

  const signInWithGoogle = () => {
    Google.useAuthRequest(config).then((logInResult) => {
      if(logInResult?.type === "success"){
        //login...
      }
    });
  }

  return (
    <AuthContext.Provider 
      value={{
        user: null,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}