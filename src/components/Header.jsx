import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({ title }) => {

    return (
        <View style={{ height: 56, backgroundColor: '#5693f5', padding: 12, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '600', letterSpacing: 0.5 }}>{title ? title : ""}</Text>
        </View>
    )
}


export default Header

const styles = StyleSheet.create({})