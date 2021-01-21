import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { VERSION_CHECK } from '../components/queries';


const HomeScreen = ({navigation}) => {

    

    // const { loading , error, data } = useQuery(VERSION_CHECK);

    // console.log("======");
    // console.log(loading);
    // console.log(error);
    // console.log(data);
    console.log("===this is home screen===");

    // if(loading) return <Text> loading ... </Text>
    // if(error) return <Text> error ... </Text>


    return (
      <View style= {styles.container}>
        {/* <Text> {data.appConfig.iOSVersion} / {data.appConfig.aOSVersion} </Text> */}
        <Text>Home Screen</Text>
        <Button 
          title= "goto detail screen "
          onPress= {() => navigation.navigate("Details")}>
        </Button>
      </View>
    );
  }

  export default HomeScreen;

  const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }
  })
