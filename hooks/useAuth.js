import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as AuthSession from "expo-auth-session"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  const signInWithGoogle = async() => {
    // await AuthSession.
  }

  return (
    <AuthContext.Provider 
      value={{
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}