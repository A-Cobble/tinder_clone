import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View>
      <Text>{`Hello ${user.name}! Welcom to the Tinder_Clone`}</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")}/>
    </View>
  )
}

export default HomeScreen