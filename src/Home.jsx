import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'


const Header = React.memo( () => {

    console.log("Header Rendered");
    

    return (
        <View style={{ height: 56, paddingHorizontal: 18 }}>
            <Text>Header</Text>
        </View>
    )
}
)


const SmallUI = () => {
    const [counter, setCounter] = useState(0);



    const incrementCallback = () => {
        console.log("hello");
        
        setCounter(prev => prev +1);
    }
    console.log("SmallUI Rendered");
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Counter Value is {counter}</Text>

            <Button title='Increase' onPress={incrementCallback} />
        </View>
    )
}



const AnotherUI = () => {
    const [on, setOn] = useState(false);
    const toggleOn = useCallback(() => {
        setOn(prev => !prev);
    },[]);

    console.log("Anonther UI is rendered ",on);

    return (
        <View style={{borderWidth: 2, borderRadius: 8, padding: 14}}>
            <Text>Another UI is {on+""}</Text>
            <Button title='Toggle' onPress={toggleOn} />
        </View>
    )
}

const Home = () => {



    console.log("Home Rendered");
    

    return (
        <View style={styles.baseView}>
            <Header />
            <Text>Home</Text>
            <AnotherUI />
            <SmallUI />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    baseView: { flex: 1 }
})