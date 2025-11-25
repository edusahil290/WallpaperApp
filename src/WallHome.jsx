import { FlatList, Image, ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator, NativeModules, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImageFromPexelsApiLocal, useGetDefaultImages } from './customHook';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HighlightColor = "#a68bf7";
const HighlightColor2 = "#6e658a";

const API_KEY = "wMDDAL2Ap1GGTBcQopb9vwBBsX4MGneXL9BV4sLt85oMGhkE0BV8Uppd";

const BASE_URL = "https://api.pexels.com/v1/";
const PER_PAGE = 4;


const ItemSeparatorComponent = () => <View style={{ height: 24 }} />

const getImageFromPexelsApi = (query) => {

    return fetch(`${BASE_URL}search?query=${query}&per_page=${PER_PAGE}`, {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            data.photos.forEach(element => {
                // console.log('ssss element ', element, " ::::", element.src);
            });
            if (data?.photos) return data.photos;
        })
        ;
}

const Header = () => {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.text}>Header</Text>
        </View>
    )
}

const ScrollableTopics = ({ setImages }) => {

    const [selectedTopic, setSelectedTopic] = useState("Home");

    useEffect(() => {
        // getImageFromPexelsApi();
    }, []);

    const getImages = (name) => {
        setSelectedTopic(name);
        getImageFromPexelsApi(name).then(data => {
            // console.log(data);

            setImages(data);
        })
    }

    return (
        <ScrollView horizontal style={{ maxHeight: 60, height: 60, width: '100%', }} contentContainerStyle={{ height: 60, alignItems: 'center' }} >
            <Text onPress={() => {
                setSelectedTopic("Home")
                getImageFromPexelsApiLocal().then(data => {
                    setImages(data);
                });
            }} style={"Home" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Home</Text>
            <Text onPress={() => getImages("Sport")} style={"Sport" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Sport</Text>
            <Text onPress={() => getImages("Love")} style={"Love" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Love</Text>
            <Text onPress={() => getImages("Moon")} style={"Moon" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Moon</Text>
            <Text onPress={() => getImages("Football")} style={"Football" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Football</Text>
            <Text onPress={() => getImages("Cricket")} style={"Cricket" == selectedTopic ? styles.highlightedText1 : styles.highlightedText2}>Cricket</Text>
        </ScrollView>
    )
}

const WallHome = () => {
    // const [imageData , setImageData] = useState([]);
    const [images, setImages, error, isLoaded] = useGetDefaultImages();
    // console.log("in WallHome ", images);
    // console.log("above is images log", images.length);

    const WallpaperModule = NativeModules.WallpaperModule;


    return (
        <View style={styles.container}>
            <Header />
            <ScrollableTopics setImages={setImages} />


            {/* Showing Images */}
            {isLoaded ? <FlatList
                data={images}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => (
                    // NativeModules 
                    <TouchableOpacity onPress={() => {
                        WallpaperModule.setWallpaper(item.src.portrait).then(res => {
                            if (res = "Wallpaper set successfully") {
                                ToastAndroid.showWithGravity(
                                    'Wallpaper set successfully',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER,
                                );
                            } else {
                                ToastAndroid.showWithGravity(
                                    'Oooopppppps Something went wrong',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER,
                                );
                            }
                        })
                        .catch(err => {
                            ToastAndroid.showWithGravity("Wrong "+err,ToastAndroid.SHORT,ToastAndroid.CENTER);
                        })

                    }}>
                        <Image source={{ uri: item.src.portrait }} style={styles.image} />

                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={ItemSeparatorComponent}
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>}

        </View>
    )
}

export default WallHome

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 14,
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    highlightedText1: {
        fontSize: 16, fontWeight: "700", paddingHorizontal: 14, color: HighlightColor
    },
    highlightedText2: {
        fontSize: 16, fontWeight: "400", paddingHorizontal: 14, color: HighlightColor2
    },
    image: {
        // height: 400,
        // width: 400,
        height: windowHeight * 0.35,
        width: windowWidth * 0.9,
        resizeMode: 'contain',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: HighlightColor2
    }


})