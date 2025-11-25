import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Spacer = ({ height }) => {
    return <View style={{ height: height }} />
}

const SmallInfo = ({ label }) => {
    return (
        <View style={{ height: 100, flex: 1, backgroundColor: '#8d6cab', borderRadius: 12, marginHorizontal: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 11 }}>{label ? label : ""}</Text>
        </View>
    )
}

const Dashboard = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <Header title={"Dashboard"} />

            {/* inner container */}
            <View style={{ flex: 1, padding: 16 }}>

                <View style={{ height: 140, backgroundColor: "#cea8f0", borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>Dashboard Details</Text>
                </View>


                {/* small container */}
                <View style={{ flex: 1, paddingVertical: 24, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SmallInfo label={"4 + Internation Projects"} />
                        <SmallInfo label={"Over 10 Awards Received"} />
                    </View>

                    <Spacer height={20} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SmallInfo label={"Over 100 Employees"} />
                        <SmallInfo label={"20 + Projects Completed"} />
                    </View>

                    <Spacer height={20} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SmallInfo label={"20 + Projects Completed"} />
                        <SmallInfo label={"20 + Projects Completed"} />

                    </View>


                </View>


                {/* bottom part */}
                <View>
                    <Button title='List Screen' onPress={() => {
                        navigation.navigate("ListScreen")
                    }} />
                </View>


            </View>


        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})