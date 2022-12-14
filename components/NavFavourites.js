import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: '3423',
        icon: 'home',
        location: 'Home',
        destination: "Code street, London, UK"
    },
    {
        id: '36567',
        icon: 'briefcase',
        location: 'Work',
        destination: "Londone Eye, London, UK"
    },
    {
        id: '36567',
        icon: 'briefcase',
        location: 'party',
        destination: "Londone Eye, London, UK"
    },
]
const NavFavourites = () => {
  return (
    <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw`flex-row items-center p-5 `}
                    //onPress={handlePress}
                >
                    <Icon 
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={item.icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-bold text-lg`}>{item.location}</Text>
                        <Text style={tw`text-gray-500`}>{item.destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <View
                    style={[tw`bg-gray-200`, { height: 0.5 }]}
                />
            )}
      />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})