import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Register Title</Text>
      <View style={{flex: 1}}>

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
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8
}}
)