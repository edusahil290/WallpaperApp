import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const API_KEY = "wMDDAL2Ap1GGTBcQopb9vwBBsX4MGneXL9BV4sLt85oMGhkE0BV8Uppd";

const BASE_URL = "https://api.pexels.com/v1/";
const PER_PAGE = 10;

const getImageFromPexelsApi = (query = "Best of the month", pageNumber = 1) => {

    return fetch(`${BASE_URL}search?query=${query}&page=${pageNumber}&per_page=${PER_PAGE}`, {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    })
        .then(response => {
            // console.log("ressss",response);
            if(!response.ok){
                throw new Error("status is not ok in BestOfTheMonth "+response.statusText);
            }
            return response.json()
        })
        .then(data => {

                return data;
        })
        ;
}

const BestOfTheMonth = ({navigation}) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        const  fetchImages = async () => {
            const response = await getImageFromPexelsApi("Best+of+the+month", 1);
            // console.log("ressspons",response);
            
            setData(response.photos);
        }
        fetchImages();

        return () => {
            console.log('clean up function');
            setData([]);
        }
    },[]);

    


  return (
    <View>
                    <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold", marginBottom: 14 }}>Best of the month</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {data.length >= 1 && data.map((item, index) => {
                            // console.log('Ties',item);
                            return(
                                <Pressable key={`BOTM${item.src.portrait}`} onPress = {() => {
                                    navigation.navigate("WallpaperView", item);
                                }}>

                             <Image
                            //  source={require("../WallPaperAppTheme.png")}
                            source={{ uri: item.src.portrait }}
                             key={item.src.portrait}

                             style={{ height: height * 0.25, width: width * 0.33, marginRight: 15, borderRadius: 12 }}
                         />
                                </Pressable>

                       
                        )})}


                    </ScrollView>
                </View>
  )
}

export default BestOfTheMonth

const styles = StyleSheet.create({})