import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View, Picker } from "react-native"

const Login = () => {
    const navigation = useNavigation()

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: "700", letterSpacing: 0.7, color: '#00000090' }}>Login Screen</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input }
            />

            <TextInput
                placeholder="Password"
                value={pass}
                secureTextEntry
                onChangeText={(text) => setPass(text)}
                style={styles.input }
            />


            <Button title="Login" onPress={() => {
                console.log("hello");
                navigation.navigate("Register")
                // navigation.navigate("Dashboard")
            }} />

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input: { borderColor: '#ccc', borderWidth: 2, borderRadius: 8, marginBottom: 12, paddingHorizontal: 12 }
})