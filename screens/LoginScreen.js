// import { View, Text, Button } from 'react-native'
// import React from 'react'
// import useAuth from '../hooks/useAuth'

// const LoginScreen = () => {
//   const { signInWithGoogle } = useAuth();
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//       <Button title="login" onPress={signInWithGoogle} />
//     </View>
//   )
// }

// export default LoginScreen

import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
// import useAuth from '../hooks/useAuth'
import * as Google from "expo-auth-session/providers/google"


const LoginScreen = () => {
  // const { signInWithGoogle } = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: "347959046486-c0vbabnvmd0fvqd0ctkuu6p1moeeiaup.apps.googleusercontent.com",
      iosClientId: '347959046486-n5oteg6ig9eea9esfi1ugou0lg4pn6pl.apps.googleusercontent.com',
      expoClientId: '347959046486-5eoq3cnii2g07j38lss140jnd6fsgiia.apps.googleusercontent.com',
      // androidClientId: process.env.ANDROID_CLIENT_ID,
      // iosClientId: process.env.IOS_CLIENT_ID,
      // scopes: ["profile", "email"],
      // permissions: ["public_profile", "email", "gender", "location"],
    }
  )

  useEffect(() => {
    if(response?.type === "success"){
      setAccessToken(response.authentication.accessToken)
    }
  },[response])

  const getUserData = () => {

  }

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title={accessToken? "Get User Data" : "Login"} /*onPress={signInWithGoogle}*/
        onPress={accessToken? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })} />
    </View>
  )
}

export default LoginScreen