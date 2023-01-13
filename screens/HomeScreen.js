import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import tw from "twrnc"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';


const DUMMY_DATA = [
  {
    firstName: "Alexander",
    lastName: "Cobble",
    job: "Software Developer",
    // photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    photoURL: "https://images.unsplash.com/photo-1664737061963-862d6a174a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    age: 32,
    id: 123,
  },
  {
    firstName: "Name1",
    lastName: "LastName1",
    job: "Software Developer",
    photoURL: "https://images.unsplash.com/photo-1670862386920-e5321e7b47c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    age: 40,
    id: 456,
  },
  {
    firstName: "Blah",
    lastName: "BlahSquared",
    job: "Software Developer",
    photoURL: "https://images.unsplash.com/photo-1671085957836-60848fafaf75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    age: 21,
    id: 789
  }
]

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null)
  // console.log(user)
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   })
  // },[])
  useLayoutEffect(() => 
    onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      if(!snapshot.exists()) {
        navigation.navigate("Modal")
      }
    }),
  []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      // const passes = getDocs(collection(db, 'users', user.uid, 'nopes')).then(
      //   (snapshot) => snapshot.docs.map((doc) => doc.id)
      // );
      const passes = (await getDocs(collection(db, 'users', user.uid, 'nopes'))).docs.map((doc) => doc.id)
      // const passes = snapshots.docs.map((doc) => doc.id)
      const passedUserIds = passes.length > 0 ? passes : ['test'];

      unsub = onSnapshot(
        query(
          collection(db, "users"), 
          where("id", "not-in", [...passedUserIds])
        ), 
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  },[]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped NOPE on ${userSwiped.displayName}`);

    setDoc(doc(db, 'users', user.uid, 'nopes', userSwiped.id), userSwiped)
  }

  const swipeRight = () => {

  }

  return (
    <SafeAreaView style={tw `flex-1`}>

      {/* Header */}
      <View /*style={tw`items-center relative`}*/ style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout} /*style={tw`absolute left-5 top-3`}*/>
          <Image style={tw`h-10 w-10 rounded-full`} source={{ uri: user.photoURL}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image style={tw`h-12.5 w-10.6`} source={require("../images/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("Chat")}/*style={tw`absolute right-5 top-3`}*/>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper 
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          cards={profiles}
          overlayLabels={{
            left: {
              title: "NOPE",
              style:{
                label:{
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style:{
                label:{
                  color: "#4DED30",
                },
              },
            }
          }} 
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe REJECTED")
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH")
            swipeRight(cardIndex)
          }}
          backgroundColor={"#4FD0E9"}
          renderCard={(card) => card? (
            <View key={card.id} style={tw `relative bg-white h-3/4 rounded-xl`}>
              <Image style={tw `absolute top-0 h-full w-full rounded-xl`} source={{ uri: card.photoURL}}/>
              
              <View style={[tw `absolute bottom-0 flex-row justify-between items-center bg-white w-full h-20 px-6 py-2 rounded-b-xl`, styles.cardShadow]}>
                <View>
                  <Text style={tw `text-xl font-bold`}>
                    {card.displayName}
                  </Text>
                  <Text>
                    {card.job}
                  </Text>
                </View>
                <Text style={tw `text-2xl font-bold`}>
                  {card.age}
                </Text>
              </View>
            </View>
            ) : (
              <View
                style={[tw `relative bg-white h-3/4 rounded-xl justify-center items-center`, styles.cardShadow]}
                >
                <Text style={tw `font-bold pb-5`}>
                  No more profiles
                </Text>
                <Image
                  style={tw `h-20 w-full`}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>

      <View style={tw `flex flex-row justify-evenly`}>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw `items-center justify-center rounded-full w-16 h-16 bg-red-200`}
            >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => swipeRef.current.swipeRight()}
            style={tw `items-center justify-center rounded-full w-16 h-16 bg-green-200`}
            >
            <AntDesign name="heart" size={24} color="green" />
          </TouchableOpacity>
      </View>


      {/* <Text>{`Hello and welcome to the Tinder_Clone`}</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")}/>

      <Button title='Logout' onPress={logout} /> */}
    </SafeAreaView>
  )
}

export default HomeScreen;


const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }
})