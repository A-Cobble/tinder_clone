import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
  const { promptAsync } = useAuth();
  // const { accessToken, promptAsync, setUserInfo, userInfo } = useAuth();

  // function getUserData() {
  //   fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   })

  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     setUserInfo(data)
  //   })
  // }

  return (
    <View>
      <Text>LoginScreen</Text>
      {/* <Button title="login" onPress={accessToken? () => getUserData() : () => promptAsync({ useProxy: true, showInRecents: true })} /> */}
      <Button title="login" onPress={() => promptAsync({ useProxy: true, showInRecents: true })} />
    </View>
  )
}

export default LoginScreen

// import { View, Text, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// // import useAuth from '../hooks/useAuth'
// import * as Google from "expo-auth-session/providers/google"
// import { EXPO_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env"


// const LoginScreen = () => {
//   // const { signInWithGoogle } = useAuth();
//   const [accessToken, setAccessToken] = useState();
//   const [request, response, promptAsync] = Google.useAuthRequest(
//     {
//       // androidClientId: ANDROID_CLIENT_ID,
//       // iosClientId: IOS_CLIENT_ID,
//       // expoClientId: EXPO_CLIENT_ID,
//       // scopes: ["profile", "email"],
//       // permissions: ["public_profile", "email", "gender", "location"],
//     }
//   )

//   useEffect(() => {
//     if(response?.type === "success"){
//       setAccessToken(response.authentication.accessToken)
//     }
//   },[response])

//   const getUserData = () => {

//   }

//   return (
//     <View>
//       <Text>LoginScreen</Text>
//       <Button title={accessToken? "Get User Data" : "Login"} /*onPress={signInWithGoogle}*/
//         onPress={accessToken? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })} />
//     </View>
//   )
// }

// export default LoginScreen