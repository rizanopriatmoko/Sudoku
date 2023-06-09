import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'

export default function HomeScreen({ navigation }) {
    const [input, setInput] = useState('easy')
    const [name, setName] = useState('')
    // console.log(name, input);

    const showAlert = () =>
        Alert.alert(
            "Can't Start",
            "Please enter your name",
            [
                { text: "OK"}
            ],
        )

    return (
        <View style={styles.container}>
            <View style={{marginVertical: 20}}>
                <Text>Welcome to SuGOku!</Text>
            </View>
            <Text>please enter your name </Text>
            <Text>and select difficulty down below.</Text>
            <View style={{
                height: 30,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                placeholder: "insert you name here",
                marginVertical: 20
            }}>
                <TextInput onChangeText={setName} value={name}></TextInput>
            </View>
            <Picker
                selectedValue={input}
                style={{ height: 50, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onValueChange={(itemValue, itemIndex) =>
                    setInput(itemValue)
                }>
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>
            <View style={{ marginVertical:20}}>
                <Button title="Start" onPress={
                name ==='' ? showAlert : () => {
                    navigation.navigate('Game', { difficulty: input, name: name }) 
            }} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // box: {
    //   borderColor: '#000000',
    //   borderWidth: 2,
    //   borderRadius: 2
    // },
});