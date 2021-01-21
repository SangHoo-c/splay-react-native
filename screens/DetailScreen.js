import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const DetailScreen = ({navigation}) => {

    console.log("===this is detail screen===");

    return (
      <View style={styles.container}>
        <Text>Detail Screen</Text>
        <Button 
          title= "goto detail screen "
          onPress= {() => navigation.navigate("Details")}>
        </Button>
      </View>
    );
  }

  export default DetailScreen;

  const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }
  })
