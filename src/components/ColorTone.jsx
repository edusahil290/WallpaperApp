import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ColorTone = ({navigation}) => {
  return (
    <View>
      <Text style={{ color: "#333", fontSize: 20, fontWeight: "bold", marginBottom: 14 }}>The Color Tone</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("WallDetailsScreen", {topic: "green"});
        }} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'green' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "yellow"});
        }} key={"yellow"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'yellow' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "white"});
        }} key={"white"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'white' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "black"});
        }} key={"black"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'black' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "red"});
        }} key={"red"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'red' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "blue"});
        }} key={"blue"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'blue' }} />
        <TouchableOpacity onPress={() => {
           navigation.navigate("WallDetailsScreen", {topic: "grey"});
        }} key={"grey"} style={{ height: 50, width: 50, marginRight: 15, borderRadius: 8, backgroundColor: 'grey' }} />
      </ScrollView>
    </View>
  )
}

export default ColorTone

const styles = StyleSheet.create({})