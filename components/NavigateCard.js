import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_APIKEY} from "@env"
import { useDispatch } from 'react-redux'
import { setDestination  } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'
const NavigateCard = () => {
    const dispatch=useDispatch();
    const navigation=useNavigation(); 
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl `}>Good Morning, Jatin</Text>
      <View style={tw`border-t border-gray-200 flex-shrink `}>
      <View style={tw`bg-white pb-2`}>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={40}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                loaction: details.geometry.location,
                                description: data.description
                            }));
                            navigation.navigate("RideOptionsCard");
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                    />
                </View>
                <NavFavourites/>
                <View style={tw`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}>
                    <TouchableOpacity
                        style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}
                    >
                        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                        <Text style={tw`text-black text-center pl-3`}>Eats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                        onPress={() => navigation.push('RideOptionsCard')}
                    >
                        <Icon name="car" type="font-awesome" color="white" size={16} />
                        <Text style={tw`text-white text-center pl-3`}>Rides</Text>
                    </TouchableOpacity>
                </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    textInput: {
        fontSize: 18,
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})