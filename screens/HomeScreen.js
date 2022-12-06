import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const HomeScreen = () => {
  const dispatch=useDispatch();
  return (
    <SafeAreaView>
      <View style={tw`p-5`}>
        <Image style={{
            width:100,
            height:100,
            resizeMode :'contain',
            
        }}
        source={{
            uri : "https://links.papareact.com/gzs"
        }}
        />
        <GooglePlacesAutocomplete
        placeholder='where from?'
        styles={{
            container :{
                flex : 0,
            },
            textInput :{
                fontSize :18,
            },
        }}
        onPress={(data,details=null) => {
          console.log("details", data);
          dispatch(
            setOrigin({
              location : details?.geometry.location,
              description : data.description,
            })
          ),
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        returnKeytype={"search"}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
            key : GOOGLE_MAPS_APIKEY,
            language : 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={40}
        />
        <NavOptions/> 
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text : {
        color :'blue',
    }
})