import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { WallDetailsScreenStore } from './wallDetailsScreenStore';
import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
// import Reactotron from 'reactotron-react-native'

const { width, height } = Dimensions.get('window');

const imgWidth = width - (22 + 22 + 44);
const imgHeight = height * 0.25;

const flatData = [
    { imgSource: require("./WallPaperAppTheme.png"), no: "1" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "2" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "3" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "4" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "5" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "6" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "7" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "8" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "9" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "10" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "11" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "12" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "13" },
    { imgSource: require("./WallPaperAppTheme.png"), no: "14" },
];

const ListEmptyComponent = () => <Text style={{color: "#333",}}>No Results Found Sorry !!!!!</Text>

const ListHeaderComponent = () => {
    const { totalResults } = WallDetailsScreenStore();
    const route = useRoute();
    // console.log("rout",route);



    return (
        <View style={{ marginBottom: 22 }}>
            <Text style={{color: "#333", fontSize: 22, fontWeight: "700", letterSpacing: 0.4, marginBottom: 14 }}>{route?.params?.topic}</Text>
            <Text style={{color: "#333", fontSize: 14, fontWeight: "400" }}>{totalResults} wallpapers available</Text>
        </View>
    )
}

const ListItem = ({ navigation, item }) => {
    return <Pressable
    style={{marginBottom: 22}}
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

const WallDetailsScreen = ({ navigation, route }) => {

    console.log("WallDetailsScreen");
    // Reactotron.log({ data: [1,2,3] })
    // console.log("Sahil",{name: "Sahil Shaikh", job: "Mobile App Development"});


    const { data, totalResults, loading, error, loadMoreLoader, pageNumber, getImages, getMoreImages, resetState } = WallDetailsScreenStore();

    useEffect(() => {
        let topic = route.params.topic;
        console.log("topic in WallDetails use Effect ", topic);

        getImages(topic);

        return () => {
            console.log("WallDetailsScreen Unmounted CleanUp Function gets called");
            resetState();
        }
    }, []);



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
                
            <ActivityIndicator size="large" color='#a7816370' />
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

            {/* <Text>{data ? data.length : "}}}}}}"} is length of data array</Text>
            <Text>{pageNumber ? pageNumber : "(((("} is pageNumber</Text> */}


            {/* {loadMoreLoader ? <Text>loadMoreLoader is working</Text> : null} */}

            {/* <FlatList */}
            <FlashList
                data={data}
                estimatedItemSize={imgHeight+22}
                // data={flatData}
                numColumns={2}
                // columnWrapperStyle={{
                //     justifyContent: 'space-around', marginBottom: 22
                // }}
                contentContainerStyle={{ paddingTop: 80 }}
                ListHeaderComponent={ListHeaderComponent}
                // stickyHeaderHiddenOnScroll={true}
                // stickyHeaderIndices={[0]} // Make the header sticky
                // StickyHeaderComponent={() => <ListHeaderComponent/>}
                // stickyHeaderHiddenOnScroll={true}
                onEndReached={getMoreImages}
                onEndReachedThreshold={0.3}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={loadMoreLoader ? <ActivityIndicator size="large" color="blue" /> : <Text>You  have reached the end of the list</Text>}
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

export default WallDetailsScreen

const styles = StyleSheet.create({})