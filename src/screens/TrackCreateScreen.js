import '../_mockLocation';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';

 const TrackCreateScreen = () => {
   const { addLocation } = useContext(LocationContext);
   const [err, setErr] = useState(null);

   const startWatching = async () => {
      try {
         const { granted } = await requestForegroundPermissionsAsync();
         await watchPositionAsync(
            {
               accuracy: Accuracy.BestForNavigation,
               timeInterval: 1000,
               distanceInterval: 10
            }, 
            location => {
               addLocation(location);
            }
         );
         if (!granted) {
            throw new Error('Location permission not granted');
         }
      } catch (e) {
         setErr(e);
      }
   };

   useEffect(() => {
      startWatching();
   }, []);

   return (
      <SafeAreaView forceInset={{ top: 'always' }}>
         <Text h2>Create a track</Text>
         <Map/>
         {err && <Text>Please enable location services</Text>}
      </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({});

 export default TrackCreateScreen;