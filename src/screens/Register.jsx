import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header';



const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');


    const onBackPress = () => {
        navigation.goBack()
    }
    const onRegisterPress = () => {
        navigation.navigate("Dashboard")
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}
            <Header title={"Register"} />

            {/* inner container */}
            <View style={{ flex: 1, padding: 16 }}>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    keyboardType="default"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    keyboardType="default"
                />


            </View>


            {/* bottom part */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, height: 40, marginBottom: 6 }}>
                <TouchableOpacity onPress={onBackPress} style={styles.buttonStyle}>
                    <Text style={styles.btnText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRegisterPress} style={styles.buttonStyle}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 42,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        fontSize: 12
    },
    buttonStyle: {
        flex: 1, backgroundColor: "#87b1f5", justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginHorizontal: 4
    },
    btnText: {
        color: '#fff'
    }
}
)