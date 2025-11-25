import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useStore } from './zusStore';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5Icon';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ColorTone from './components/ColorTone';
import Categories from './components/Categories';
import BestOfTheMonth from './components/BestOfTheMonth';
import { SearchScreenStore } from './searchScreenStore';
import CustomTextJs from "./screens/CustomText.js.jsx";

const { width, height } = Dimensions.get('window');

const SeparatorComponent = () => <View style={{ height: 30 }} />

const SearchCompontent = ({navigation}) => {

    const {searchQuery, setSearchQuery} = SearchScreenStore();

    const onPress = () => {
        navigation.navigate("SearchScreen",{searchText: searchQuery});
    }

    console.log('SearchComponent Rendered');


    return (
        <View style={{ height: 60, borderRadius: 10, backgroundColor: "#eef3f5", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginTop: 80 }}>
        <TextInput
        placeholder='Find Wallpapers...'
        placeholderTextColor="#c7cacf"
        style={{ flex: 1, color: '#333' }}
        value={searchQuery}
        onSubmitEditing={() => {
            navigation.navigate("SearchScreen",{searchText: searchQuery});
        }}
        onChangeText={(e) => {
            setSearchQuery(e);
        }}
        />
        <Feather name="search" size={30} color="#33333370" onPress={onPress} />
    </View>
    )
}


const DetailsScreen = ({navigation}) => {

    // const count = useStore((state) => state.count);
    // const increment = useStore((state) => state.increment);
    // const decrement = useStore((state) => state.decrement);

    console.log("DetailsScreen rendered");

    return (
        <LinearGradient
            colors={['#d7eded', '#dce7f0', '#f6eaeb', '#e5e9ed']} // Colors for the gradient
            start={{ x: 0, y: 0 }} // Start at the top-left corner
            end={{ x: 1, y: 1 }} // End at the bottom-right corner
            style={{
                flex: 1, padding: 22,            }}>


            <ScrollView style={{ flex: 1, padding: 10 }} showsVerticalScrollIndicator={false}>

                <Button title='NativeTry' onPress={() => navigation.navigate("NativeTry")} />
                {/* Header Component */}
                <SearchCompontent navigation={navigation} />

                <CustomTextJs text={"Pradeep"} />

                <SeparatorComponent />

                {/* The Best of Month */}

                <BestOfTheMonth navigation={navigation}/>

                <SeparatorComponent />

                {/* The Color Tone */}

                <ColorTone navigation={navigation}/>

                <SeparatorComponent />

                {/* Categories */}

                <Categories navigation={navigation} />


            </ScrollView>


        </LinearGradient>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})
