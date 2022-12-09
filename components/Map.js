import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import {useSelector} from 'react-redux';
import {selectDestination, selectOrigin ,setTravelTimeInformation} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions'; 
import {GOOGLE_MAP_APIKEY} from "@env"

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination=useSelector(selectDestination);
  const mapRef=useRef(null);
  
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
}, [origin, destination]);
    useEffect(() => {
        if(!origin || !destination) return;
       
       const getTravelTime = async () => {
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_APIKEY}`
        const data = await fetch(URL).then(response => response.json())
        if(data.status !== 'OK') return alert(data.error_message)
        dispatch(setTravelTimeInformation(data.rows[0].elements[0])) 
       }
       getTravelTime();
    }, [origin, destination, GOOGLE_MAP_APIKEY])
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
         {origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        lineDashPattern={[0]}
                        apikey={GOOGLE_MAP_APIKEY}
                        strokeWidth={3}
                        strokeColor="black"
                        onError={error => console.log("Directions error: ", error)}
                    />
                )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.loaction && (
                    <Marker
                        coordinate={{
                            latitude: destination?.loaction.lat,
                            longitude: destination?.loaction.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                    >
                         
                    </Marker>
                )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
