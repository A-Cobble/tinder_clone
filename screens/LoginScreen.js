import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import tw from "twrnc"

const LoginScreen = () => {
  // const { promptAsync } = useAuth();
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  },[])
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
    <View style={tw`flex-1`}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={{ uri: "https://tinder.com/static/tinder.png" }} 
      >
        <TouchableOpacity 
          style={[tw`absolute bottom-40 w-52 p-4 bg-white rounded-2xl`, { marginHorizontal: "25%"}]}
          onPress={() => signInWithGoogle()}
        >
          <Text style={tw`font-semibold text-center`}>
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* <Text>{loading ? 'loading ...' : "Login to the app" }</Text>
      <Button title="login" onPress={() => signInWithGoogle()} /> */}
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