import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'


const DATA_LIST = [
    {name: "Sahil", position: "React Native Developer", salary: "70,000"},
    {name: "Rohit", position: "React Native Developer", salary: "70,000"},
    {name: "Amol", position: "React Native Developer", salary: "70,000"},
    {name: "Shailesh", position: "React Native Developer", salary: "70,000"},
    {name: "Shaahid", position: "React Native Developer", salary: "70,000"},
    {name: "Umesh", position: "React Native Developer", salary: "70,000"},
    {name: "John", position: "React Native Developer", salary: "70,000"},
    {name: "John2", position: "React Native Developer", salary: "70,000"},
    {name: "John3", position: "React Native Developer", salary: "70,000"},
    {name: "John4", position: "React Native Developer", salary: "70,000"},
    {name: "John5", position: "React Native Developer", salary: "70,000"},
    {name: "John 6", position: "React Native Developer", salary: "70,000"},
    {name: "John 7", position: "React Native Developer", salary: "70,000"},
]

const  DATA_LIST_2 = DATA_LIST.reverse();

const ItemSeparator = () => {
    return (<View style={{height:20}}/>)
}

const ListScreen = () => {
  return (
    <View style={{flex: 1}}>
        <Header title={"List"} />



        <View style={{flex: 1, padding: 16}}>
            <FlatList
            data={DATA_LIST_2}
            ItemSeparatorComponent={ItemSeparator}
            showsVerticalScrollIndicator={false}
            inverted
            renderItem={({item}) => {

                return (
                    <View style={{borderRadius: 12, borderWidth: 1.5, borderColor: '#ccc', padding: 12}}>
                        <Text style={styles.textSty}>{item.name}</Text>
                        <Text style={styles.textSty}>{item.position}</Text>
                        <Text >{item.salary}</Text>
                    </View>
                )
            }}
            />
        </View>


    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
    textSty: {
        marginBottom: 6
    }
})