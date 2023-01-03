import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from "twrnc"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  console.log(user)
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   })
  // },[])

  return (
    <SafeAreaView>

      {/* Header */}
      <View /*style={tw`items-center relative`}*/ style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout} /*style={tw`absolute left-5 top-3`}*/>
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={tw`h-14 w-12`} source={require("../images/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("Chat")}/*style={tw`absolute right-5 top-3`}*/>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* End */}
      {/* <Text>{`Hello and welcome to the Tinder_Clone`}</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")}/>

      <Button title='Logout' onPress={logout} /> */}
    </SafeAreaView>
  )
}

export default HomeScreen