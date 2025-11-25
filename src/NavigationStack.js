import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from './DetailsScreen';
import WallDetailsScreen from './WallDetailsScreen';
import WallpaperView from './WallpaperView';
import SearchScreen from './SearchScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import ListScreen from './screens/ListScreen';
import NativeTry from './screens/NativeTry';


const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Detail" component={DetailsScreen} />
            <Stack.Screen name="WallDetailsScreen" component={WallDetailsScreen} />
            <Stack.Screen name="WallpaperView" component={WallpaperView} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="NativeTry" component={NativeTry} />


            {/* <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ListScreen" component={ListScreen} /> */}

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationStack

const styles = StyleSheet.create({})
