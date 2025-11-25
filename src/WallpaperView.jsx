import { ActivityIndicator, ImageBackground, NativeModules, Pressable, StyleSheet, Text, ToastAndroid, View, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import NativeLocalStorage from "../specs/NativeLocalStorage"

const toasty = (msg = "Fun Toasting") => {
    ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
}

const WallpaperView = ({ navigation, route }) => {
    // console.log("roeuteee", route.params);

    const translatePaintBtn = useRef(new Animated.Value(0)).current;
    const translateLoader = useRef(new Animated.Value(250)).current;
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [loading, setLoading] = useState(true);

    const WallpaperModule = NativeModules.WallpaperModule;

    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

    // console.log("translateX = > ", translateX);

    const loaderSlideIn = () => {
        return Animated.timing(translateLoader, {
            toValue: -40,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const loaderSlideOut = () => {
        Animated.timing(translateLoader, {
            toValue: 500,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            // paintBtnSlideInt();
        });
    }

    const paintBtnSlideOut = (callBack) => {
        return Animated.timing(translatePaintBtn, {
            toValue: -250,
            duration: 500,
            useNativeDriver: true,
        }).start((res) => {
            // console.log("in sate method",res);
            // callBack();
            // loaderSlideIn();
        });
    }

    const paintBtnSlideInt = () => {
        Animated.timing(translatePaintBtn, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start((res) => {
            // console.log("in sate method",res);
            // callBack();
            // loaderSlideOut();
        });
    }

    const wallSetterFun = async () => {
        try {
            if (isAlreadyApplied) {
                toasty("Wallpaper already applied");
                return;
            }
            // paintBtnSlideOut();
            //below is the new implementation
            let url = route.params.src.portrait;
            console.log("url", url);
            let result = await NativeLocalStorage?.setWallpaper(url);
            if (result === "Wallpaper set successfully") {
                // paintBtnSlideOut();
                toasty('Wallpaper set successfully')
                seqOut();
                setIsAlreadyApplied(true);
            }
            console.log("result", result);
        } catch (error) {
            console.error("wallSetterFun error", error);
        }






        //below is the old implementation
        // WallpaperModule.setWallpaper(route.params.src.portrait).then(res => {
        //     if (res = "Wallpaper set successfully") {
        //         // loaderSlideOut();
        //         toasty('Wallpaper set successfully')
        //         seqOut();
        //         setIsAlreadyApplied(true);

        //     } else {
        //         // loaderSlideOut();
        //         seqOut();
        //         toasty('Oooopppppps Something went wrong')
        //     }
        // })
        //     .catch(err => {
        //         ToastAndroid.showWithGravity("Wrong " + err, ToastAndroid.SHORT, ToastAndroid.CENTER);
        //     })
    }

    const seqIn = () => {
        Animated.sequence([
            Animated.timing(translatePaintBtn, {
                toValue: -250,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateLoader, {
                toValue: -40,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            wallSetterFun();
        });
        // Animated.sequence([paintBtnSlideOut, loaderSlideIn]).start((res) => {
        //     console.log("seqIn",res);
        // });
    }

    const seqOut = () => {
        Animated.sequence([Animated.timing(translateLoader, {
            toValue: 500,
            duration: 500,
            useNativeDriver: true,
        }), Animated.timing(translatePaintBtn, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        })]).start((res) => {
            console.log("seqOut", res);
        });
    }


    return (
        <ImageBackground
            source={{ uri: route.params.src.portrait }}
            style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}
        >
            <View>
                <Text style={{ color: '#fff', fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Photographer :</Text>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{route.params.photographer}</Text>
            </View>

            {/* bottom part  */}
            <View style={{ alignSelf: "center", flexDirection: 'row', position: 'relative', }}>
                <Animated.View style={{ height: 56, transform: [{ translateX: translatePaintBtn }] }}>
                    <Pressable
                        style={{
                            height: 56, width: 56, borderRadius: 14,
                            // backgroundColor: "#33333370",
                            backgroundColor: "#3f64f5",
                            justifyContent: 'center', alignItems: 'center',

                        }}
                        android_ripple={{
                            color: '#fff',
                            // borderless: false,
                            foreground: true,
                            radius: 34
                        }}
                        onPress={() => {
                            console.log('=hello');
                            // Animated.sequence([
                            //     Animated.timing(this.state.colorAnimation, {
                            //       toValue: 1,
                            //       duration: 500,
                            //     }),
                            //     Animated.timing(this.state.scaleAnimation, {
                            //       toValue: 2,
                            //       duration: 300,
                            //     }),
                            //   ]).start();

                            if (isAlreadyApplied) {
                                toasty("Wallpaper is already applied");
                                return;
                            }

                            seqIn();
                            return;






                        }}

                    >
                        <FontAwesome name="paint-brush" color="#fff" size={26} />
                    </Pressable>
                </Animated.View>

                <Animated.View style={{
                    flexDirection: 'row', position: 'absolute', backgroundColor: '#33333390', height: 56, borderRadius: 14, padding: 14, alignItems: 'center',
                    transform: [{ translateX: translateLoader }],

                }}>
                    <ActivityIndicator
                        size="small"
                        color="#fff"
                        style={{ marginRight: 8 }} />
                    <Text onPress={() => { loaderSlideOut() }} style={{ color: '#fff' }}>Working on it</Text>
                </Animated.View>
            </View>
        </ImageBackground>
    )
}

export default WallpaperView

const styles = StyleSheet.create({})