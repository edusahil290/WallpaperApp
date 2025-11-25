import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const Categories = ({navigation}) => {
    return (
        <View>
            <Text style={{color: "#333", fontSize: 20, fontWeight: "bold", marginBottom: 14 }}>Categories</Text>
            {/* Row */}
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Abstract"})} style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ color: "green", fontSize: 14 }}>Abstract</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Nature"})} style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'pink', justifyContent: 'center', alignItems: "center", marginLeft: 8 }}>
                    <Text style={{ color: "#000", fontSize: 14 }}>Nature</Text>
                </TouchableOpacity>
            </View>
            {/* Row */}
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Sport"})} style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ color: "green", fontSize: 14 }}>Sport</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Rivers"})} style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'pink', justifyContent: 'center', alignItems: "center", marginLeft: 8 }}>
                    <Text style={{ color: "#000", fontSize: 14 }}>Rivers</Text>
                </TouchableOpacity>
            </View>
            {/* Row */}
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Computer"})}  style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                    <Text style={{ color: "green", fontSize: 14 }}>Computer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("WallDetailsScreen", {topic: "Hardware"})}  style={{ flex: 1, height: height * 0.1, borderRadius: 12, backgroundColor: 'pink', justifyContent: 'center', alignItems: "center", marginLeft: 8 }}>
                    <Text style={{ color: "#000", fontSize: 14 }}>Hardware</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({})