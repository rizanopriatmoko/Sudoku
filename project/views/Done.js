import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function DoneScreen({route, navigation}) {
    const { name } = route.params
    return(
        <View style={styles.container}>
            <Text>Congrats {name} you have cleared the SuGoku!</Text>
            <View style={{marginVertical: 20}}>
               <Button title="New Game" onPress={()=>{
                navigation.navigate('Home')
            }}></Button> 
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