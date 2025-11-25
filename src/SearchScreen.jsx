import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { SearchScreenStore } from './searchScreenStore';

const { width, height } = Dimensions.get('window');

const imgWidth = width - (22 + 22 + 44);
const imgHeight = height * 0.25;

const SearchComponent = () => {

    const { searchQuery, setSearchQuery, getImages } = SearchScreenStore();

    const onPress = () => {
        getImages(searchQuery);
    }


    return (
        <View style={{ height: 60, borderRadius: 10, backgroundColor: "#eef3f5", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginTop: 80 }}>
            <TextInput
                placeholder='Find Wallpapers...'
                placeholderTextColor="#c7cacf"
                style={{ flex: 1 }}
                value={searchQuery}
                onSubmitEditing={onPress}
                onChangeText={(e) => {
                    console.log('Search Bar Changed in search screen', e);
                    setSearchQuery(e);
                }}
            />
            <Feather name="search" size={30} color="#c7cacf30"
                onPress={onPress}
            />
        </View>
    );
}

const ListEmptyComponent = () => <Text>No Results Found Sorry !!!!!</Text>;

const ListItem = ({ navigation, item }) => {
    return <Pressable
        onPress={() => {
            navigation.navigate("WallpaperView", item);
        }}
    >
        <Image
            source={{ uri: item.src.portrait }}
            // source={item.imgSource}
            style={{ height: imgHeight, width: imgWidth / 2, borderRadius: 12 }} />
    </Pressable>
}

const SearchScreen = ({ navigation, route }) => {
    const {searchQuery, setSearchQuery, setAllStatesToDefault, data, isEndReached, loading, loadMoreLoader, error, getImages, getMoreImages} = SearchScreenStore();
    // console.log("route", route);

    useEffect(() => {
        const searchText = route.params?.searchText;
        getImages(searchText);

        () => {
            console.log("cleanup of Search Screen fired");
            setAllStatesToDefault();
        }


    },[]);

    if (error != null) {
        return <Text>got some error {JSON.stringify(error)}</Text>
    }



    if (loading) {
        return (<LinearGradient
            colors={['#d7eded', '#dce7f0', 'whitesmoke']} // Colors for the gradient
            start={{ x: 0, y: 0 }} // Start at the top-left corner
            end={{ x: 1, y: 1 }} // End at the bottom-right corner
            style={{
                flex: 1, padding: 22,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: "#dcebf1" 
            }}>
            <ActivityIndicator size="large" color='#f6eaeb' />
            {/* <Text>Loading...</Text> */}
        </LinearGradient>);

    }

    return (
        <LinearGradient
            colors={['#d7eded', '#dce7f0', 'whitesmoke']} // Colors for the gradient
            start={{ x: 0, y: 0 }} // Start at the top-left corner
            end={{ x: 1, y: 1 }} // End at the bottom-right corner
            style={{
                flex: 1, padding: 22,
                // backgroundColor: "#dcebf1" 
            }}>


            <SearchComponent />


            <FlatList
                data={data}
                // data={flatData}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-around', marginBottom: 22
                }}
                contentContainerStyle={{ paddingTop: 80 }}
                // ListHeaderComponent={ListHeaderComponent}
                // stickyHeaderHiddenOnScroll={true}
                // stickyHeaderIndices={[0]} 
                // StickyHeaderComponent={() => <ListHeaderComponent/>}
                stickyHeaderHiddenOnScroll={true}
                onEndReached={getMoreImages}
                onEndReachedThreshold={0.3}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={loadMoreLoader && !isEndReached ? <ActivityIndicator size="large" color="blue" /> : <Text>You  have reached the end of the list</Text>}
                keyExtractor={(item, index) => item.src.portrait}
                renderItem={({ item }) => {
                    // console.log("dataaaa", item);

                    return (
                        <ListItem navigation={navigation} item={item} />
                    )
                }}
            />







        </LinearGradient>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})